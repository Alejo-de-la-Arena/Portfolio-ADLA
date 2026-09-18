import { motionTransition } from '@/lib/motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { useEffect, useState } from 'react'
import { ModalSurface } from '../ui/ModalSurface'
import { Command } from 'cmdk'
import { 
  X,
  Search, 
  User, 
  Briefcase, 
  FolderGit2, 
  Code2, 
  Mail, 
  Github, 
  Linkedin, 
  MessageCircle 
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCommandPalette } from '@/hooks/useCommandPalette'
import { scrollToSection } from '@/lib/utils'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

export function CommandPalette() {
  const reduceMotion = useReducedMotionPreference()
  const { open, setOpen } = useCommandPalette()
  const { sectionLinks, socialLinks, ui } = useLocalizedContent()
  const [search, setSearch] = useState('')

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const navigationIcons: Record<string, typeof User> = { cases: FolderGit2, about: User, experience: Briefcase, projects: FolderGit2, skills: Code2, contact: Mail }
  const navigationCommands = sectionLinks.map(link => ({
    icon: navigationIcons[link.id] ?? FolderGit2, label: link.label,
    action: () => pathname === '/' ? scrollToSection(link.id) : navigate(`/#${link.id}`),
  }))

  const socialCommands = [
    { icon: Github, label: ui.command.openGithub, action: () => window.open(socialLinks.github, '_blank') },
    { icon: Linkedin, label: ui.command.openLinkedin, action: () => window.open(socialLinks.linkedin, '_blank') },
    { icon: MessageCircle, label: ui.command.openWhatsapp, action: () => window.open(socialLinks.whatsapp, '_blank') },
  ]

  useEffect(() => {
    if (open) {
      setSearch('')
    }
  }, [open])

  const handleSelect = (action: () => void) => {
    action()
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <ModalSurface onClose={() => setOpen(false)} label={ui.command.title}>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4" onClick={event => { if (event.target === event.currentTarget) setOpen(false) }}>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.95, y: -20 }}
              transition={motionTransition(reduceMotion)}
              className="w-full max-w-2xl"
            >
              <Command 
                className="rounded-xl border border-border bg-background-secondary shadow-2xl overflow-hidden"
                label={ui.command.title}
              >
                <div className="flex items-center border-b border-border px-4">
                  <Search className="w-5 h-5 text-foreground-secondary mr-2" />
                  <Command.Input
                    data-dialog-initial-focus
                    value={search}
                    onValueChange={setSearch}
                    placeholder={ui.command.placeholder}
                    className="flex-1 bg-transparent py-4 outline-none text-foreground placeholder:text-foreground-tertiary"
                  />
                  <button type="button" onClick={() => setOpen(false)} aria-label={ui.modal.close} className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg"><span className="hidden sm:inline">ESC</span><X className="h-4 w-4" /></button>
                </div>

                <Command.List className="max-h-96 overflow-y-auto p-2">
                  <Command.Empty className="py-8 text-center text-foreground-secondary text-sm">
                    {ui.command.empty}
                  </Command.Empty>

                  <Command.Group heading={ui.command.navigation} className="text-foreground-secondary text-xs font-semibold px-2 pt-2 pb-1">
                    {navigationCommands.map((cmd) => (
                      <Command.Item
                        key={cmd.label}
                        onSelect={() => handleSelect(cmd.action)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer data-[selected=true]:bg-accent/10 data-[selected=true]:text-accent transition-none mb-1"
                      >
                        <cmd.icon className="w-4 h-4" />
                        <span>{cmd.label}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Separator className="h-px bg-border my-2" />

                  <Command.Group heading={ui.command.social} className="text-foreground-secondary text-xs font-semibold px-2 pt-2 pb-1">
                    {socialCommands.map((cmd) => (
                      <Command.Item
                        key={cmd.label}
                        onSelect={() => handleSelect(cmd.action)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer data-[selected=true]:bg-accent/10 data-[selected=true]:text-accent transition-none mb-1"
                      >
                        <cmd.icon className="w-4 h-4" />
                        <span>{cmd.label}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>

                <div className="border-t border-border px-4 py-2 text-xs text-foreground-tertiary flex items-center justify-between">
                  <span>{ui.command.tip}</span>
                  <div className="flex gap-2">
                    <kbd className="px-1.5 py-0.5 rounded border border-border bg-background-tertiary">↑↓</kbd>
                    <span>{ui.command.navigate}</span>
                    <kbd className="px-1.5 py-0.5 rounded border border-border bg-background-tertiary">↵</kbd>
                    <span>{ui.command.select}</span>
                  </div>
                </div>
              </Command>
            </motion.div>
          </div>
        </ModalSurface>
      )}
    </AnimatePresence>
  )
}
