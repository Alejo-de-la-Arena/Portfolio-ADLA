import type { LocalizedProjectMedia } from '@/data/experiences'
import { ExperienceImage } from './ExperienceImage'

type DeviceShowcaseProps = { media: LocalizedProjectMedia; onOpen: () => void; className?: string; openLabel: string }
export function DeviceShowcase({ media, onOpen, className = '', openLabel }: DeviceShowcaseProps) {
  return <ExperienceImage desktop={media.desktop} mobile={media.mobile} onOpen={onOpen} openLabel={openLabel} className={`mx-auto aspect-[1/2] max-w-[420px] rounded-[1.35rem] border-4 border-background-tertiary shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)] lg:max-w-none lg:rounded-2xl lg:border lg:border-border lg:shadow-[0_18px_40px_-28px_rgba(124,92,255,0.55)] lg:aspect-[16/10] ${className}`} />
}
