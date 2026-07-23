/**
 * Shared hero background: soft light rays (top) + perspective floor grid +
 * horizon glow (bottom). All in the brand orange.
 *
 * Usage: place inside a wrapper that is `relative isolate overflow-hidden`,
 * and keep the actual content above it with `relative z-10`.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* light rays from top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-conic-gradient(from 90deg at 50% -12%, rgba(255,107,53,0.10) 0deg 5deg, transparent 5deg 15deg)",
          maskImage: "linear-gradient(to bottom, #000 5%, transparent 65%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 5%, transparent 65%)",
        }}
      />
      {/* perspective floor grid */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,107,53,0.35) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,107,53,0.35) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          transform: "perspective(320px) rotateX(62deg)",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(to top, #000 5%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to top, #000 5%, transparent 85%)",
        }}
      />
      {/* horizon glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 100%, rgba(255,107,53,0.22), transparent 70%)",
        }}
      />
    </div>
  );
}
