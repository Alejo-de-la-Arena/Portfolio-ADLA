import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { 
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
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette()
  const { sectionLinks, socialLinks, ui } = useLocalizedContent()
  const [search, setSearch] = useState('')

  const navigationCommands = [
    { icon: User, label: sectionLinks[0]?.label ?? '', action: () => scrollToSection(sectionLinks[0]?.id ?? '') },
    { icon: Briefcase, label: sectionLinks[1]?.label ?? '', action: () => scrollToSection(sectionLinks[1]?.id ?? '') },
    { icon: FolderGit2, label: sectionLinks[2]?.label ?? '', action: () => scrollToSection(sectionLinks[2]?.id ?? '') },
    { icon: Code2, label: sectionLinks[3]?.label ?? '', action: () => scrollToSection(sectionLinks[3]?.id ?? '') },
    { icon: Mail, label: sectionLinks[4]?.label ?? '', action: () => scrollToSection(sectionLinks[4]?.id ?? '') },
  ]

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
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl"
            >
              <Command 
                className="rounded-xl border border-border bg-background-secondary shadow-2xl overflow-hidden"
                label={ui.command.title}
              >
                <div className="flex items-center border-b border-border px-4">
                  <Search className="w-5 h-5 text-foreground-secondary mr-2" />
                  <Command.Input
                    value={search}
                    onValueChange={setSearch}
                    placeholder={ui.command.placeholder}
                    className="flex-1 bg-transparent py-4 outline-none text-foreground placeholder:text-foreground-tertiary"
                  />
                  <kbd className="hidden sm:inline-flex h-6 px-2 items-center gap-1 rounded border border-border bg-background-tertiary text-xs text-foreground-secondary">
                    ESC
                  </kbd>
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
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer data-[selected=true]:bg-accent/10 data-[selected=true]:text-accent transition-colors mb-1"
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
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer data-[selected=true]:bg-accent/10 data-[selected=true]:text-accent transition-colors mb-1"
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
        </>
      )}
    </AnimatePresence>
  )
}
