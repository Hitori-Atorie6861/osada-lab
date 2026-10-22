"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

type TerrainBackgroundProps = {
  animated?: boolean;
};

type FiberData = {
  points: THREE.Vector3[];
  phase: number;
  speed: number;
  glow: boolean;
};

export default function TerrainBackground({
  animated = true,
}: TerrainBackgroundProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container =
      containerRef.current;

    if (!container) return;

    // =========================================================
    // Basic settings
    // =========================================================

    const width =
      container.clientWidth;

    const height =
      container.clientHeight;

    const isMobile =
      window.innerWidth < 768;

    /*
     * PCではかなり密度を出す。
     * モバイルでは少し減らす。
     */
    const fiberCount =
      isMobile ? 80 : 160;

    const glowCount =
      isMobile ? 55 : 120;

    // =========================================================
    // Scene
    // =========================================================

    const scene =
      new THREE.Scene();

    /*
     * 背景色はSceneではなくCSS側でも設定する。
     *
     * Three.js側を透明にしておくことで、
     * Bloomによる白飛びを抑える。
     */
    scene.background = null;

    // =========================================================
    // Camera
    // =========================================================

    const camera =
      new THREE.PerspectiveCamera(
        45,
        width / height,
        0.1,
        200
      );

    camera.position.set(
      0,
      2,
      42
    );

    camera.lookAt(
      0,
      0,
      0
    );

    // =========================================================
    // Renderer
    // =========================================================

    const renderer =
      new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference:
          "high-performance",
      });

    renderer.setSize(
      width,
      height
    );

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        isMobile ? 1.5 : 2
      )
    );

    renderer.outputColorSpace =
      THREE.SRGBColorSpace;

    /*
     * ACES Tone Mappingは使わない。
     *
     * 今回は淡い緑をそのまま出すことを優先。
     */
    renderer.toneMapping =
      THREE.NoToneMapping;

    renderer.toneMappingExposure = 1;

    container.appendChild(
      renderer.domElement
    );

    // =========================================================
    // Post Processing
    // =========================================================

    const composer =
      new EffectComposer(
        renderer
      );

    const renderPass =
      new RenderPass(
        scene,
        camera
      );

    composer.addPass(
      renderPass
    );

    /*
     * Bloomはかなり弱くする。
     *
     * 発光点だけ少し滲む程度。
     */
    const bloomPass =
      new UnrealBloomPass(
        new THREE.Vector2(
          width,
          height
        ),
        isMobile ? 0.16 : 0.24,
        0.55,
        0.82
      );

    composer.addPass(
      bloomPass
    );

    // =========================================================
    // Fiber data
    // =========================================================

    const fibers: FiberData[] =
      [];

    /*
     * 参考画像の構図。
     *
     * 左下から右上へ
     * 大量の細い線が伸びる。
     */
    for (
      let i = 0;
      i < fiberCount;
      i++
    ) {
      const points: THREE.Vector3[] =
        [];

      /*
       * 奥行き。
       *
       * -13 = 手前
       * +13 = 奥
       */
      const depth =
        Math.pow(
          Math.random(),
          1.7
        ) *
          26 -
        13;

      /*
       * 左下側。
       */
      const startX =
        -34 +
        Math.random() * 22;

      const startY =
        -17 +
        Math.random() * 13;

      /*
       * 長さ。
       */
      const length =
        34 +
        Math.random() * 38;

      /*
       * 右上方向への傾き。
       */
      const slope =
        0.48 +
        Math.random() * 0.42;

      /*
       * 曲がり具合。
       */
      const curve =
        (Math.random() - 0.5) *
        3.2;

      /*
       * ファイバーによって
       * 少しだけカーブを変える。
       */
      const segments =
        isMobile ? 8 : 12;

      for (
        let j = 0;
        j <= segments;
        j++
      ) {
        const t =
          j / segments;

        const x =
          startX +
          t * length;

        const y =
          startY +
          t *
            length *
            slope +
          Math.sin(
            t * Math.PI
          ) *
            curve;

        const z =
          depth +
          Math.sin(
            t * Math.PI
          ) *
            (Math.random() -
              0.5) *
            1.2;

        points.push(
          new THREE.Vector3(
            x,
            y,
            z
          )
        );
      }

      fibers.push({
        points,

        phase:
          Math.random() *
          Math.PI *
          2,

        speed:
          0.25 +
          Math.random() *
            0.65,

        /*
         * 一部の線だけ発光。
         */
        glow:
          Math.random() <
          0.18,
      });
    }

    // =========================================================
    // Fiber group
    // =========================================================

    const fiberGroup =
      new THREE.Group();

    scene.add(
      fiberGroup
    );

    // =========================================================
    // Fiber lines
    // =========================================================

    fibers.forEach(
      (fiber) => {
        const geometry =
          new THREE.BufferGeometry().setFromPoints(
            fiber.points
          );

        /*
         * ファイバーの平均深度。
         */
        const averageZ =
          fiber.points.reduce(
            (
              sum,
              point
            ) =>
              sum + point.z,
            0
          ) /
          fiber.points.length;

        /*
         * 手前ほど1、
         * 奥ほど0に近くする。
         */
        const depth =
          THREE.MathUtils.clamp(
            1 -
              (averageZ +
                13) /
                26,
            0.08,
            1
          );

        let color: THREE.Color;

        if (fiber.glow) {
          /*
           * 発光する線。
           */
          color =
            new THREE.Color(
              0x72c96a
            );
        } else {
          /*
           * 通常のファイバー。
           */
          color =
            new THREE.Color(
              0x39785e
            );
        }

        const material =
          new THREE.LineBasicMaterial({
            color,

            transparent: true,

            /*
             * 手前ほど濃い。
             */
            opacity:
              fiber.glow
                ? 0.16 +
                  depth * 0.30
                : 0.12 +
                  depth * 0.30,

            blending:
              fiber.glow
                ? THREE.AdditiveBlending
                : THREE.NormalBlending,

            depthWrite: false,
          });

        const line =
          new THREE.Line(
            geometry,
            material
          );

        line.userData.phase =
          fiber.phase;

        line.userData.speed =
          fiber.speed;

        line.userData.depth =
          depth;

        line.userData.glow =
          fiber.glow;

        fiberGroup.add(
          line
        );
      }
    );

    // =========================================================
    // Dark nodes
    // =========================================================

    const nodeGeometry =
      new THREE.SphereGeometry(
        0.115,
        8,
        8
      );

    const nodeMaterial =
      new THREE.MeshBasicMaterial({
        color:
          0x16372c,

        transparent: true,

        opacity: 0.92,
      });

    const nodeGroup =
      new THREE.Group();

    scene.add(
      nodeGroup
    );

    fibers.forEach(
      (fiber) => {
        /*
         * すべてにノードを置かず、
         * 一部だけ。
         */
        if (
          Math.random() >
          0.30
        ) {
          return;
        }

        const pointIndex =
          Math.floor(
            Math.random() *
              fiber.points
                .length
          );

        const point =
          fiber.points[
            pointIndex
          ];

        const node =
          new THREE.Mesh(
            nodeGeometry,
            nodeMaterial
          );

        node.position.copy(
          point
        );

        node.scale.setScalar(
          0.6 +
            Math.random() *
              1.4
        );

        nodeGroup.add(
          node
        );
      }
    );

    // =========================================================
    // Glow particles
    // =========================================================

    const glowPositions =
      new Float32Array(
        glowCount * 3
      );

    const glowSizes =
      new Float32Array(
        glowCount
      );

    const glowPhases =
      new Float32Array(
        glowCount
      );

    for (
      let i = 0;
      i < glowCount;
      i++
    ) {
      /*
       * ファイバーの近くに
       * 発光点を置く。
       */
      const fiber =
        fibers[
          Math.floor(
            Math.random() *
              fibers.length
          )
        ];

      const point =
        fiber.points[
          Math.floor(
            Math.random() *
              fiber.points
                .length
          )
        ];

      glowPositions[
        i * 3
      ] =
        point.x +
        (Math.random() -
          0.5) *
          0.55;

      glowPositions[
        i * 3 + 1
      ] =
        point.y +
        (Math.random() -
          0.5) *
          0.55;

      glowPositions[
        i * 3 + 2
      ] =
        point.z +
        (Math.random() -
          0.5) *
          0.55;

      /*
       * 発光点の大きさ。
       */
      glowSizes[i] =
        0.07 +
        Math.random() *
          0.20;

      glowPhases[i] =
        Math.random() *
        Math.PI *
        2;
    }

    const glowGeometry =
      new THREE.BufferGeometry();

    glowGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        glowPositions,
        3
      )
    );

    glowGeometry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(
        glowSizes,
        1
      )
    );

    glowGeometry.setAttribute(
      "aPhase",
      new THREE.BufferAttribute(
        glowPhases,
        1
      )
    );

    // =========================================================
    // Glow shader
    // =========================================================

    const glowMaterial =
      new THREE.ShaderMaterial({
        transparent: true,

        depthWrite: false,

        blending:
          THREE.AdditiveBlending,

        uniforms: {
          uTime: {
            value: 0,
          },
        },

        vertexShader: `
          attribute float aSize;
          attribute float aPhase;

          varying float vPulse;

          uniform float uTime;

          void main() {

            vec4 mvPosition =
              modelViewMatrix *
              vec4(position, 1.0);

            /*
             * ゆっくり明滅。
             */
            vPulse =
              0.78 +
              0.22 *
              sin(
                uTime * 1.6 +
                aPhase
              );

            gl_PointSize =
              (
                aSize *
                vPulse
              ) *
              (
                300.0 /
                -mvPosition.z
              );

            gl_Position =
              projectionMatrix *
              mvPosition;
          }
        `,

        fragmentShader: `
          varying float vPulse;

          void main() {

            vec2 uv =
              gl_PointCoord -
              vec2(0.5);

            float distance =
              length(uv);

            if (
              distance > 0.5
            ) {
              discard;
            }

            /*
             * 中心が明るく、
             * 外側に向かって透明。
             */
            float glow =
              1.0 -
              smoothstep(
                0.0,
                0.5,
                distance
              );

            /*
             * 黄緑 → 白緑。
             */
            vec3 color =
              mix(
                vec3(
                  0.30,
                  0.88,
                  0.24
                ),
                vec3(
                  0.78,
                  1.00,
                  0.82
                ),
                glow
              );

            gl_FragColor =
              vec4(
                color,
                glow *
                vPulse *
                0.85
              );
          }
        `,
      });

    const glowPoints =
      new THREE.Points(
        glowGeometry,
        glowMaterial
      );

    scene.add(
      glowPoints
    );

    // =========================================================
    // Soft foreground haze
    // =========================================================

    const hazeGeometry =
      new THREE.PlaneGeometry(
        100,
        70
      );

    const hazeMaterial =
      new THREE.MeshBasicMaterial({
        color:
          0xd6eee3,

        transparent: true,

        opacity: 0.045,

        depthWrite: false,
      });

    const haze =
      new THREE.Mesh(
        hazeGeometry,
        hazeMaterial
      );

    haze.position.set(
      0,
      0,
      10
    );

    scene.add(
      haze
    );

    // =========================================================
    // Mouse
    // =========================================================

    const mouse = {
      x: 0,
      y: 0,
    };

    const targetMouse = {
      x: 0,
      y: 0,
    };

    function handleMouseMove(
      event: MouseEvent
    ) {
      const rect =
        container!.getBoundingClientRect();

      targetMouse.x =
        (
          (event.clientX -
            rect.left) /
            rect.width
        ) *
          2 -
        1;

      targetMouse.y =
        (
          (event.clientY -
            rect.top) /
            rect.height
        ) *
          2 -
        1;
    }

    if (animated) {
      container.addEventListener(
        "mousemove",
        handleMouseMove
      );
    }

    // =========================================================
    // Animation
    // =========================================================

    let frameId = 0;

    let time = 0;

    function animate() {
      frameId =
        requestAnimationFrame(
          animate
        );

      if (animated) {
        /*
         * 非常にゆっくり動かす。
         */
        time += 0.0025;

        /*
         * マウスの動きを滑らかに。
         */
        mouse.x +=
          (
            targetMouse.x -
            mouse.x
          ) *
          0.025;

        mouse.y +=
          (
            targetMouse.y -
            mouse.y
          ) *
          0.025;

        // -----------------------------------------------
        // Fiber movement
        // -----------------------------------------------

        fiberGroup.rotation.z =
          Math.sin(
            time * 0.16
          ) *
          0.006;

        fiberGroup.rotation.y =
          Math.sin(
            time * 0.12
          ) *
          0.012;

        nodeGroup.rotation.copy(
          fiberGroup.rotation
        );

        glowPoints.rotation.copy(
          fiberGroup.rotation
        );

        // -----------------------------------------------
        // Camera parallax
        // -----------------------------------------------

        camera.position.x +=
          (
            mouse.x * 1.35 -
            camera.position.x
          ) *
          0.015;

        camera.position.y +=
          (
            2 +
            mouse.y * 0.8 -
            camera.position.y
          ) *
          0.015;

        camera.lookAt(
          0,
          0,
          0
        );
      }

      // -----------------------------------------------
      // Glow
      // -----------------------------------------------

      glowMaterial.uniforms.uTime.value =
        time;

      // -----------------------------------------------
      // Render
      // -----------------------------------------------

      composer.render();
    }

    animate();

    // =========================================================
    // Resize
    // =========================================================

    function handleResize() {
      if (!container) {
        return;
      }

      const w =
        container.clientWidth;

      const h =
        container.clientHeight;

      camera.aspect =
        w / h;

      camera.updateProjectionMatrix();

      renderer.setSize(
        w,
        h
      );

      composer.setSize(
        w,
        h
      );

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          isMobile ? 1.5 : 2
        )
      );
    }

    window.addEventListener(
      "resize",
      handleResize
    );

    // =========================================================
    // Cleanup
    // =========================================================

    return () => {
      cancelAnimationFrame(
        frameId
      );

      container.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      // -----------------------------------------------
      // Fiber cleanup
      // -----------------------------------------------

      fiberGroup.children.forEach(
        (child) => {
          const line =
            child as THREE.Line;

          line.geometry.dispose();

          const material =
            line.material as THREE.Material;

          material.dispose();
        }
      );

      // -----------------------------------------------
      // Other geometry
      // -----------------------------------------------

      nodeGeometry.dispose();
      nodeMaterial.dispose();

      glowGeometry.dispose();
      glowMaterial.dispose();

      hazeGeometry.dispose();
      hazeMaterial.dispose();

      // -----------------------------------------------
      // Renderer
      // -----------------------------------------------

      composer.dispose();

      renderer.dispose();

      if (
        container.contains(
          renderer.domElement
        )
      ) {
        container.removeChild(
          renderer.domElement
        );
      }
    };
  }, [animated]);

  return (
    <div
      ref={containerRef}
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
      "
      style={{
        /*
         * 参考画像の淡いミントグリーン。
         *
         * Three.jsのBloomで白飛びしないよう、
         * 背景はCSSで確実に表示する。
         */
        background:
          "linear-gradient(135deg, #d5eee2 0%, #c5e5d5 48%, #e0f2e9 100%)",
      }}
      aria-hidden="true"
    />
  );
}