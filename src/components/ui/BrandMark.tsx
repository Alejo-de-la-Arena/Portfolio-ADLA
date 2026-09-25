export function BrandMark({ footer = false }: { footer?: boolean }) {
  return <span aria-hidden="true" className={`brand-mark inline-flex font-display font-extrabold leading-none tracking-[-0.09em] ${footer ? 'brand-mark--footer text-5xl' : 'text-3xl'}`}>
    ADLA
  </span>
}
