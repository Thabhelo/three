import { useEffect, useRef, type PointerEvent } from "react";
import createGlobe from "cobe";
import { ArrowRight } from "lucide-react";
import { profile, uses } from "@/content/site";

type TechItem = {
  label: string;
  icon?: string;
};

const techRows: TechItem[][] = [
  [
    { label: "CSS" },
    { label: "Motion.dev" },
    { label: "Sanity CMS" },
    { label: "Figma", icon: uses.find((item) => item.name === "Figma")?.icon },
    { label: "Notion" },
    { label: "GROQ" },
  ],
  [
    { label: "PostHog" },
    { label: "pnpm" },
    { label: "Bun" },
    { label: "PostgreSQL" },
    { label: "Vercel" },
    { label: "Docker", icon: uses.find((item) => item.name === "Docker")?.icon },
  ],
  [
    { label: "AWS" },
    { label: "Cloudflare" },
    { label: "Python" },
    { label: "Node.js", icon: uses.find((item) => item.name === "Node.js")?.icon },
    { label: "TypeScript", icon: uses.find((item) => item.name === "TypeScript")?.icon },
  ],
];

function TechPill({ item }: { item: TechItem }) {
  return (
    <span className="inline-flex h-7 min-w-max items-center gap-2 rounded-md border border-white/[0.08] bg-zinc-950 px-3 font-mono text-[11px] text-zinc-400 shadow-border">
      {item.icon ? <img src={item.icon} alt="" className="size-3.5" /> : <span className="size-1.5 rounded-full bg-zinc-500" />}
      {item.label}
    </span>
  );
}

function MarqueeRow({ items, reverse = false }: { items: TechItem[]; reverse?: boolean }) {
  return (
    <div className={`flex w-max gap-2 ${reverse ? "tech-row-left" : "tech-row-right"}`}>
      {[...items, ...items, ...items, ...items].map((item, index) => (
        <TechPill key={`${item.label}-${index}`} item={item} />
      ))}
    </div>
  );
}

function TechRowsLayer() {
  return (
    <div className="grid gap-3">
      {techRows.map((row, index) => (
        <MarqueeRow key={index} items={row} reverse={index === 1} />
      ))}
    </div>
  );
}

function MagnifierLens() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-[61%] z-20 size-[104px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[7px] border-[#dbe6f2] bg-black/20 shadow-[0_0_36px_rgba(219,230,242,0.22)]">
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute left-1/2 top-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 scale-[1.24]">
          <TechRowsLayer />
        </div>
      </div>
      <span className="absolute -bottom-8 -right-4 h-12 w-3 rotate-[-42deg] rounded-full bg-[#dbe6f2] shadow-[0_0_20px_rgba(219,230,242,0.2)]" />
    </div>
  );
}

function BuildTogetherCard() {
  const people = ["AM", "EK", "TN", "MR", "NS"];
  const positions = [
    "left-[12%] top-[15%]",
    "left-[28%] top-[4%]",
    "right-[16%] top-[13%]",
    "left-[28%] bottom-[26%]",
    "right-[22%] bottom-[24%]",
  ];

  return (
    <a href="/contact" className="group relative min-h-[260px] overflow-hidden rounded-[14px] border border-[#25262a] bg-[#08090a] p-6 lg:col-span-2">
      <div className="pointer-events-none absolute left-[-6%] right-[-6%] top-5 flex justify-center opacity-80">
        {[0, 1, 2, 3, 4].map((item) => (
          <span key={item} className="-ml-10 h-28 w-[25%] rounded-full border border-white/[0.065]" />
        ))}
      </div>
      {people.map((person, index) => (
        <span
          key={person}
          className={`absolute z-10 grid size-11 scale-75 place-items-center rounded-full border border-white/15 bg-zinc-900 text-xs text-zinc-200 opacity-0 shadow-border transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 ${positions[index]}`}
          style={{ transitionDelay: `${index * 60}ms` }}
        >
          {person}
        </span>
      ))}
      <div className="relative z-10 grid h-full place-items-center text-center">
        <div>
          <div className="mx-auto mb-5 grid size-24 place-items-center rounded-full border border-white/15 bg-zinc-950 shadow-[0_0_50px_rgba(255,255,255,0.08)]">
            <img src={profile.portrait} alt="" className="size-20 rounded-full object-cover" />
          </div>
          <p className="font-label">Let&apos;s build together</p>
          <h2 className="mx-auto mt-3 max-w-lg font-editorial text-xl text-zinc-100">Clear communication, fast iterations, no surprises</h2>
        </div>
      </div>
      <span className="absolute right-5 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/[0.055] text-zinc-300 transition-colors group-hover:bg-white/[0.10] group-hover:text-white">
        <ArrowRight className="size-4" />
      </span>
    </a>
  );
}

function TechStackCard() {
  return (
    <div className="relative min-h-[260px] overflow-hidden rounded-[14px] border border-[#25262a] bg-[#08090a] p-6">
      <p className="text-center font-label">Tech stack</p>
      <h2 className="mx-auto mt-3 max-w-xs text-center font-editorial text-xl text-zinc-100">The stack behind everything I ship</h2>
      <div className="relative mt-8 grid gap-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]">
        <TechRowsLayer />
      </div>
      <MagnifierLens />
    </div>
  );
}

function TimezoneGlobeCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef({ phi: 0, theta: 0.34 });
  const dragRef = useRef({ active: false, x: 0, y: 0 });

  useEffect(() => {
    let frame = 0;
    let globe: { destroy: () => void; update: (state: { phi?: number; theta?: number }) => void } | undefined;

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 420,
        height: 420,
        phi: 0,
        theta: 0.34,
        dark: 1,
        diffuse: 1.1,
        mapSamples: 12000,
        mapBrightness: 5,
        baseColor: [0.9, 0.9, 0.9],
        markerColor: [0.85, 0.85, 0.85],
        glowColor: [0.75, 0.75, 0.75],
        markers: [
          { location: [33.5186, -86.8104], size: 0.04 },
          { location: [40.7128, -74.006], size: 0.04 },
          { location: [37.7749, -122.4194], size: 0.04 },
          { location: [25.7617, -80.1918], size: 0.04 },
        ],
      });

      const animate = () => {
        if (!dragRef.current.active) rotationRef.current.phi += 0.002;
        globe?.update(rotationRef.current);
        frame = requestAnimationFrame(animate);
      };
      animate();
    }

    return () => {
      cancelAnimationFrame(frame);
      globe?.destroy();
    };
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragRef.current = { active: true, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const dx = event.clientX - dragRef.current.x;
    const dy = event.clientY - dragRef.current.y;
    rotationRef.current.phi += dx * 0.006;
    rotationRef.current.theta = Math.max(-0.55, Math.min(0.8, rotationRef.current.theta + dy * 0.004));
    dragRef.current.x = event.clientX;
    dragRef.current.y = event.clientY;
  };

  const handlePointerUp = () => {
    dragRef.current.active = false;
  };

  const labels = ["BIRMINGHAM, AL", "NEW YORK CITY, NY", "SAN FRANCISCO, CA", "MIAMI, FL"];

  return (
    <div
      className="relative min-h-[260px] overflow-hidden rounded-[14px] border border-[#25262a] bg-[#08090a] p-6 lg:col-span-2"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <p className="font-label">Flexible with timezones</p>
      <h2 className="mt-3 max-w-sm font-editorial text-xl text-zinc-100">Based in San Francisco, CA, available globally</h2>
 
      <canvas ref={canvasRef} width={420} height={420} className="absolute bottom-[-210px] left-1/2 size-[420px] -translate-x-1/2 cursor-grab opacity-90 active:cursor-grabbing" />
      {labels.map((label, index) => (
        <span key={label} className="absolute z-10 rounded bg-white px-2 py-1 font-mono text-[9px] text-zinc-950" style={{ left: `${8 + index * 21}%`, top: `${42 + (index % 2) * 18}%` }}>
          {label}
        </span>
      ))}
    </div>
  );
}

function UsesCard() {
  const tools = uses.slice(0, 7);

  return (
    <div className="relative min-h-[260px] overflow-hidden rounded-[14px] border border-[#25262a] bg-[#08090a] p-6">
      <div className="absolute inset-x-0 top-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="tech-row-left flex w-max gap-3">
          {[...tools, ...tools, ...tools].map((tool, index) => (
            <span key={`${tool.name}-${index}`} className="grid size-20 place-items-center rounded-[1.25rem] border border-white/10 bg-zinc-950 transition-all duration-300 hover:scale-110 hover:border-white/30 hover:bg-white/[0.10]">
              <img src={tool.icon} alt="" className="size-9" />
            </span>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-6 bottom-7 text-center">
        <p className="font-label">Stack</p>
        <h2 className="mt-3 font-editorial text-xl text-zinc-100">Tools I use</h2>
      </div>
    </div>
  );
}

export default function BentoSection() {
  return (
    <section className="section-frame py-16">
      <div className="relative grid gap-2.5 overflow-hidden rounded-[18px] border border-dashed border-white/[0.06] bg-[#050505] p-2.5 shadow-border before:absolute before:inset-y-0 before:left-0 before:w-20 before:bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.035)_0_1px,transparent_1px_7px)] after:absolute after:inset-y-0 after:right-0 after:w-20 after:bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.035)_0_1px,transparent_1px_7px)] lg:grid-cols-3">
        <BuildTogetherCard />
        <TechStackCard />
        <TimezoneGlobeCard />
        <UsesCard />
      </div>
    </section>
  );
}
