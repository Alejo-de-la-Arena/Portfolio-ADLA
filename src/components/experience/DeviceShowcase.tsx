import type { ProjectMedia, Screenshot } from '@/data/experiences'
import { ExperienceImage } from './ExperienceImage'

type DeviceShowcaseProps = { media: ProjectMedia; mobileOnLeft: boolean; onOpen: (image: Screenshot) => void }

export function DeviceShowcase({ media, mobileOnLeft, onOpen }: DeviceShowcaseProps) {
  const mobilePosition = mobileOnLeft ? 'lg:left-4' : 'lg:right-4'
  return <div className="relative pb-4 lg:pb-10"><ExperienceImage image={media.desktop} onOpen={() => onOpen(media.desktop)} className="aspect-[16/10] rounded-2xl border border-border shadow-[0_18px_40px_-28px_rgba(124,92,255,0.55)]" />{media.mobile && <div className={`mx-auto mt-4 w-full max-w-[200px] overflow-hidden rounded-[1.35rem] border-4 border-background-tertiary shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)] lg:absolute lg:-bottom-2 lg:mt-0 lg:w-[24%] lg:max-w-none ${mobilePosition}`}><ExperienceImage image={media.mobile} onOpen={() => onOpen(media.mobile!)} label={`Ampliar ${media.mobile.alt}`} className="aspect-[9/19.5]" /></div>}</div>
}
