const areas = [
  { number: "01", label: "BANKING", x: 50, y: 17 },
  { number: "02", label: "POLICY", x: 84, y: 39 },
  { number: "03", label: "MARKETS", x: 71, y: 79 },
  { number: "04", label: "NETWORKS", x: 29, y: 79 },
  { number: "05", label: "GOVERNANCE", x: 16, y: 39 },
];

export default function ResearchAreasDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {areas.map((area) => (
        <div
          key={area.number}
          className="absolute flex aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#1F4D3A] bg-white"
          style={{
            left: `${area.x}%`,
            top: `${area.y}%`,
          }}
        >
          <div className="text-center">
            <p className="text-sm font-medium tracking-[0.2em] text-[#1F4D3A]">
              {area.number}
            </p>

            <p className="mt-2 text-xs tracking-[0.12em] text-text-primary">
              {area.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

