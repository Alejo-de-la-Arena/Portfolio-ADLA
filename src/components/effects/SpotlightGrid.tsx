/** Static texture: no background-position animation or pointer repaint. */
export function SpotlightGrid() {
  return <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-70"
    style={{
      backgroundImage: 'radial-gradient(circle at 50% 35%, rgba(139,92,246,0.20), transparent 28%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      backgroundSize: '100% 100%, 40px 40px, 40px 40px',
      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent 80%)',
    }} />
}
