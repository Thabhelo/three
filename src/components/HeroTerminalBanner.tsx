export default function HeroTerminalBanner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 220"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="THABHELO terminal banner"
      className={className}
    >
      <defs>
        <filter id="hero-terminal-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <pattern id="hero-terminal-scanlines" x="0" y="0" width="600" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="2" width="600" height="1" fill="#000" opacity="0.5" />
        </pattern>
      </defs>

      <rect width="600" height="220" fill="#0D1117" rx="12" />
      <rect width="600" height="220" fill="url(#hero-terminal-scanlines)" rx="12" />

      <text
        x="34"
        y="48"
        textAnchor="start"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
        fontSize="13"
        fill="#39FF14"
        filter="url(#hero-terminal-glow)"
        xmlSpace="preserve"
      >
        <tspan x="34" dy="0">
          {"  _______  _   _      _      ____   _   _  _____  _       ____  "}
        </tspan>
        <tspan x="34" dy="1.25em">
          {" |__   __|| | | |    / \\    |  _ \\ | | | || ____|| |     / __ \\ "}
        </tspan>
        <tspan x="34" dy="1.25em">
          {"    | |   | |_| |   / _ \\   | |_) || |_| || |__  | |    | |  | |"}
        </tspan>
        <tspan x="34" dy="1.25em">
          {"    | |   |  _  |  / ___ \\  |  _ < |  _  ||  __| | |    | |  | |"}
        </tspan>
        <tspan x="34" dy="1.25em">
          {"    | |   | | | | / /   \\ \\ | |_) || | | || |___ | |____| |__| |"}
        </tspan>
        <tspan x="34" dy="1.25em">
          {"    |_|   |_| |_|/_/     \\_\\|____/ |_| |_||_____||______|\\____/ "}
        </tspan>
      </text>

      <text
        x="300"
        y="190"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
        fontSize="14"
        fill="#39FF14"
        opacity="0.8"
      >
        root@thabhelo: ~ $ ./init_profile.sh
      </text>
    </svg>
  );
}
