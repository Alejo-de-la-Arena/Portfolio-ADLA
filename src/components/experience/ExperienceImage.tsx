import { ImageOff } from 'lucide-react'
import { useState } from 'react'
import type { Screenshot } from '@/data/experiences'

type ExperienceImageProps = { image: Screenshot; onOpen: () => void; className?: string; label?: string }

export function ExperienceImage({ image, onOpen, className = '', label }: ExperienceImageProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return <ExperiencePlaceholder label={image.alt} className={className} />
  return <button type="button" onClick={onOpen} className={`group block w-full overflow-hidden text-left focus-visible:rounded-2xl ${className}`} aria-label={label ?? `Ampliar ${image.alt}`}><img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" onError={() => setFailed(true)} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" /></button>
}

export function ExperiencePlaceholder({ label, className = '' }: { label: string; className?: string }) {
  return <div className={`relative flex aspect-[16/10] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-background-tertiary p-6 text-center shadow-[0_18px_40px_-28px_rgba(124,92,255,0.55)] ${className}`} role="img" aria-label={label}><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(45deg,transparent_48%,rgb(var(--border))_49%,rgb(var(--border))_51%,transparent_52%)] [background-size:18px_18px]" /><ImageOff className="relative h-6 w-6 text-accent" aria-hidden="true" /><p className="relative mt-3 max-w-sm text-sm font-medium text-foreground">{label}</p><p className="relative mt-1 text-xs text-foreground-tertiary">Captura pendiente</p></div>
}
