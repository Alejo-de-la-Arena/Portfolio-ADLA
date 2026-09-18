/** Keep the ambient accent without animating layout or a large blurred layer. */
export function SpotlightCursor() {
  return <div aria-hidden className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />
}
