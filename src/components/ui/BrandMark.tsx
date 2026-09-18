export function BrandMark({ footer = false }: { footer?: boolean }) {
  return <span aria-hidden="true" className={"motion-button inline-flex font-display font-extrabold leading-none tracking-[-0.09em] " + (footer ? "text-5xl" : "text-3xl")}>
    <span className={footer ? "text-foreground" : "text-accent"}>AD</span><span className={footer ? "text-accent" : "text-foreground"}>LA</span>
  </span>
}
