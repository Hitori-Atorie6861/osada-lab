"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type NetworkNode = {
  base: THREE.Vector3;
  position: THREE.Vector3;
  phase: number;
  speed: number;
  scale: number;
  hub: boolean;
};

export default function DataWave() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.5),
    );
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    renderer.domElement.style.cssText =
      "display:block;width:100%;height:100%";

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      1,
      0.1,
      100,
    );

    const network = new THREE.Group();
    scene.add(network);

    let seed = 83;

    function random() {
      seed =
        (seed * 1664525 + 1013904223) >>> 0;

      return seed / 4294967296;
    }

    // Layered clusters create depth and vertical spread.
    const clusters = [
      new THREE.Vector3(-6.4, -1.3, -1),
      new THREE.Vector3(-2.5, 2.5, 1.2),
      new THREE.Vector3(2.4, -1.8, 2),
      new THREE.Vector3(6, 1.7, -1.6),
    ];

    const nodes: NetworkNode[] = [];
    const nodesPerCluster = 22;

    clusters.forEach((center, clusterIndex) => {
      for (let index = 0; index < nodesPerCluster; index++) {
        const hub = index === 0;

        const direction = new THREE.Vector3(
          random() * 2 - 1,
          random() * 2 - 1,
          random() * 2 - 1,
        ).normalize();

        const radius = hub
          ? 0
          : Math.cbrt(random()) * 3.6;

        const base = center
          .clone()
          .add(
            direction.multiply(
              new THREE.Vector3(
                radius,
                radius * 0.85,
                radius * 0.9,
              ),
            ),
          );

        nodes.push({
          base,
          position: base.clone(),
          phase: random() * Math.PI * 2,
          speed: 0.12 + random() * 0.1,
          scale: hub
            ? 2.4
            : 0.55 + random() * 0.85,
          hub,
        });
      }

      // Slightly offset the major nodes for an irregular silhouette.
      nodes[clusterIndex * nodesPerCluster].base.y +=
        clusterIndex % 2 === 0 ? 0.6 : -0.4;
    });

    const count = nodes.length;

    // Build a sparse local network.
    const edges: [number, number][] = [];
    const edgeKeys = new Set<string>();

    function addEdge(a: number, b: number) {
      const first = Math.min(a, b);
      const second = Math.max(a, b);
      const key = `${first}:${second}`;

      if (first === second || edgeKeys.has(key)) return;

      edgeKeys.add(key);
      edges.push([first, second]);
    }

    nodes.forEach((node, index) => {
      const nearest = nodes
        .map((other, otherIndex) => ({
          index: otherIndex,
          distance: node.base.distanceTo(other.base),
        }))
        .filter((item) => item.index !== index)
        .sort((a, b) => a.distance - b.distance);

      nearest
        .slice(0, node.hub ? 7 : 3)
        .forEach((item) => {
          if (item.distance < 5.8) {
            addEdge(index, item.index);
          }
        });
    });

    // Connect clusters through their major nodes.
    for (let index = 0; index < clusters.length - 1; index++) {
      addEdge(
        index * nodesPerCluster,
        (index + 1) * nodesPerCluster,
      );
    }

    // Selected closed triangles become translucent surfaces.
    const triangles: [number, number, number][] = [];

    for (let a = 0; a < count; a++) {
      const neighbors = edges
        .filter(([first, second]) => first === a || second === a)
        .map(([first, second]) => (first === a ? second : first))
        .filter((index) => index > a);

      for (let i = 0; i < neighbors.length; i++) {
        for (let j = i + 1; j < neighbors.length; j++) {
          const b = Math.min(neighbors[i], neighbors[j]);
          const c = Math.max(neighbors[i], neighbors[j]);

          if (
            edgeKeys.has(`${b}:${c}`) &&
            random() > 0.48 &&
            triangles.length < 40
          ) {
            triangles.push([a, b, c]);
          }
        }
      }
    }

    // Nodes
    const sphereGeometry = new THREE.SphereGeometry(
      0.085,
      14,
      10,
    );

    const sphereMaterial = new THREE.MeshBasicMaterial();

    const spheres = new THREE.InstancedMesh(
      sphereGeometry,
      sphereMaterial,
      count,
    );

    spheres.instanceMatrix.setUsage(
      THREE.DynamicDrawUsage,
    );
    spheres.frustumCulled = false;

    const forest = new THREE.Color("#235b4d");
    const teal = new THREE.Color("#458f94");
    const sage = new THREE.Color("#9ab8aa");
    const gold = new THREE.Color("#bd9650");
    const color = new THREE.Color();

    nodes.forEach((node, index) => {
      if (node.hub) {
        color.copy(index === nodesPerCluster ? gold : forest);
      } else {
        color
          .copy(teal)
          .lerp(sage, random() * 0.75);
      }

      spheres.setColorAt(index, color);
    });

    if (spheres.instanceColor) {
      spheres.instanceColor.needsUpdate = true;
    }

    network.add(spheres);

    // Lines
    const linePositions = new Float32Array(
      edges.length * 6,
    );
    const lineColors = new Float32Array(
      edges.length * 6,
    );

    const lineGeometry = new THREE.BufferGeometry();
    const lineAttribute = new THREE.BufferAttribute(
      linePositions,
      3,
    );

    lineAttribute.setUsage(THREE.DynamicDrawUsage);

    lineGeometry.setAttribute("position", lineAttribute);

    const lineForest = new THREE.Color("#528d7d");
    const linePale = new THREE.Color("#bbcfc6");
    const lineGold = new THREE.Color("#baa378");

    edges.forEach(([a, b], index) => {
      const depth = (nodes[a].base.z + nodes[b].base.z) / 2;
      const distant = THREE.MathUtils.clamp(
        (2 - depth) / 7,
        0,
        1,
      );

      color
        .copy(lineForest)
        .lerp(linePale, distant * 0.8);

      if (
        (a === nodesPerCluster || b === nodesPerCluster) &&
        index % 3 === 0
      ) {
        color.lerp(lineGold, 0.65);
      }

      color.toArray(lineColors, index * 6);
      color.toArray(lineColors, index * 6 + 3);
    });

    lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3),
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(
      lineGeometry,
      lineMaterial,
    );

    lines.frustumCulled = false;
    network.add(lines);

    // Individual translucent faces sort independently.
    const faceGeometry = new THREE.BufferGeometry();

    faceGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
        3,
      ),
    );

    const faceMaterials = [
      new THREE.MeshBasicMaterial({
        color: "#6dafa1",
        transparent: true,
        opacity: 0.11,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      new THREE.MeshBasicMaterial({
        color: "#669cae",
        transparent: true,
        opacity: 0.09,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      new THREE.MeshBasicMaterial({
        color: "#cfb77e",
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    ];

    const faceMeshes = triangles.map((_, index) => {
      const face = new THREE.Mesh(
        faceGeometry,
        faceMaterials[index % faceMaterials.length],
      );

      face.matrixAutoUpdate = false;
      face.frustumCulled = false;
      network.add(face);

      return face;
    });

    // Small traveling points
    const travelerCount = 7;

    const travelerGeometry = new THREE.SphereGeometry(
      0.055,
      10,
      8,
    );

    const travelerMaterial = new THREE.MeshBasicMaterial({
      color: "#b79654",
    });

    const travelers = new THREE.InstancedMesh(
      travelerGeometry,
      travelerMaterial,
      travelerCount,
    );

    travelers.instanceMatrix.setUsage(
      THREE.DynamicDrawUsage,
    );
    travelers.frustumCulled = false;
    network.add(travelers);

    const travelerEdges = Array.from(
      { length: travelerCount },
      () => Math.floor(random() * edges.length),
    );

    const dummy = new THREE.Object3D();
    const travelerPosition = new THREE.Vector3();
    const axisX = new THREE.Vector3();
    const axisY = new THREE.Vector3();
    const axisZ = new THREE.Vector3();

    function draw(time: number) {
      nodes.forEach((node, index) => {
        const t = time * node.speed;

        node.position.set(
          node.base.x + Math.sin(t + node.phase) * 0.25,
          node.base.y + Math.sin(t * 1.1 + node.phase) * 0.4,
          node.base.z + Math.cos(t + node.phase) * 0.3,
        );

        dummy.position.copy(node.position);
        dummy.scale.setScalar(node.scale);
        dummy.updateMatrix();

        spheres.setMatrixAt(index, dummy.matrix);
      });

      edges.forEach(([a, b], index) => {
        nodes[a].position.toArray(linePositions, index * 6);
        nodes[b].position.toArray(linePositions, index * 6 + 3);
      });

      triangles.forEach(([a, b, c], index) => {
        const origin = nodes[a].position;

        axisX.subVectors(nodes[b].position, origin);
        axisY.subVectors(nodes[c].position, origin);
        axisZ.crossVectors(axisX, axisY).normalize();

        faceMeshes[index].matrix.makeBasis(
          axisX,
          axisY,
          axisZ,
        );

        faceMeshes[index].matrix.setPosition(origin);
        faceMeshes[index].matrixWorldNeedsUpdate = true;
      });

      for (let index = 0; index < travelerCount; index++) {
        const progress =
          (time * 0.045 + index / travelerCount) % 1;

        const [a, b] = edges[travelerEdges[index]];

        travelerPosition.lerpVectors(
          nodes[a].position,
          nodes[b].position,
          progress,
        );

        dummy.position.copy(travelerPosition);
        dummy.scale.setScalar(
          Math.sin(progress * Math.PI),
        );
        dummy.updateMatrix();

        travelers.setMatrixAt(index, dummy.matrix);
      }

      // Barely perceptible movement of the whole structure.
      network.rotation.y = Math.sin(time * 0.035) * 0.065;
      network.rotation.z = Math.sin(time * 0.028) * 0.025;

      spheres.instanceMatrix.needsUpdate = true;
      travelers.instanceMatrix.needsUpdate = true;
      lineAttribute.needsUpdate = true;

      renderer.render(scene, camera);
    }

    const motion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let frame = 0;
    let visible = true;
    let elapsed = 0;
    let previousTime = 0;
    let sized = false;

    function animate(now: number) {
      frame = 0;

      if (!visible || document.hidden || motion.matches) {
        return;
      }

      if (previousTime) {
        elapsed += Math.min(
          (now - previousTime) / 1000,
          0.05,
        );
      }

      previousTime = now;

      if (sized) draw(elapsed);

      frame = requestAnimationFrame(animate);
    }

    function syncAnimation() {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;

      if (visible && !document.hidden) {
        if (sized) draw(elapsed);

        if (!motion.matches) {
          frame = requestAnimationFrame(animate);
        }
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } =
        container.getBoundingClientRect();

      if (!width || !height) return;

      renderer.setSize(width, height, false);

      const aspect = width / height;
      camera.aspect = aspect;

      const halfFov = THREE.MathUtils.degToRad(
        camera.fov / 2,
      );

      const distance =
        Math.max(
          6.3 / Math.tan(halfFov),
          11.5 / (Math.tan(halfFov) * aspect),
        ) + 4;

      camera.position.set(0, 0.8, distance);
      camera.lookAt(0, 0.3, 0);
      camera.updateProjectionMatrix();

      sized = true;
      draw(elapsed);
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncAnimation();
      },
    );

    intersectionObserver.observe(container);

    motion.addEventListener("change", syncAnimation);
    document.addEventListener(
      "visibilitychange",
      syncAnimation,
    );

    syncAnimation();

    return () => {
      cancelAnimationFrame(frame);

      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      motion.removeEventListener("change", syncAnimation);
      document.removeEventListener(
        "visibilitychange",
        syncAnimation,
      );

      sphereGeometry.dispose();
      sphereMaterial.dispose();
      spheres.dispose();

      lineGeometry.dispose();
      lineMaterial.dispose();

      faceGeometry.dispose();
      faceMaterials.forEach((material) => material.dispose());

      travelerGeometry.dispose();
      travelerMaterial.dispose();
      travelers.dispose();

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#FAFAF8]">
      <div
        ref={containerRef}
        aria-hidden="true"
        className="absolute inset-0"
      />
    </div>
  );
}