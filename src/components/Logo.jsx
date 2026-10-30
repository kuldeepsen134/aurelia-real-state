export function Logo({ light = false, className = "" }) {
  const ink = light ? "#F5F3EE" : "#202020";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="2" fill="#202020" />
        <path d="M32 10 L54 54 H45.5 L32 24.5 L18.5 54 H10 Z" fill="#B08D57" />
        <rect x="24" y="41" width="16" height="4" fill="#B08D57" />
      </svg>
      <span className="leading-none" style={{ color: ink }}>
        <span className="block font-display text-[17px] font-medium tracking-wide">AURELIA</span>
        <span className="block text-[9px] uppercase tracking-[0.42em] text-bronze">& Stone</span>
      </span>
    </span>
  );
}