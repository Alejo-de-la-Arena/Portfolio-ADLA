import { useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, Mail, Github, Linkedin, MessageCircle, Copy, Check } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { getContactFormSchema, type ContactFormSchema } from '@/lib/validators'
import { copyToClipboard } from '@/lib/utils'
import { emailConfig } from '@/data/content'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'
import { useLocale } from '@/context/LocaleContext'

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { locale } = useLocale()
  const { personalInfo, socialLinks, ui } = useLocalizedContent()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  const contactMethods = [
    { icon: Mail, label: 'Email', value: personalInfo.email, action: 'copy' },
    { icon: Github, label: 'GitHub', value: ui.contact.openProfile, href: socialLinks.github },
    { icon: Linkedin, label: 'LinkedIn', value: ui.contact.openProfile, href: socialLinks.linkedin },
    { icon: MessageCircle, label: 'WhatsApp', value: ui.contact.sendWhatsApp, href: socialLinks.whatsapp },
  ]

  const schema = useMemo(() => getContactFormSchema(locale), [locale])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: ContactFormSchema) => {
    setIsSubmitting(true)
    
    try {
      // Configurar EmailJS en emailjs.com y actualizar content.ts
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        },
        emailConfig.publicKey
      )
      
      toast.success(ui.contact.sentOk)
      reset()
    } catch (error) {
      toast.error(ui.contact.sentError)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(personalInfo.email)
    if (success) {
      setEmailCopied(true)
      toast.success(ui.contact.copied)
      setTimeout(() => setEmailCopied(false), 2000)
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-center">
            {ui.contact.titleStart} <span className="text-accent">{ui.contact.titleAccent}</span>
          </h2>
          <p className="text-foreground-secondary mb-12 text-center max-w-2xl mx-auto">
            {ui.contact.intro}
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <h3 className="text-xl font-semibold mb-6">{ui.contact.sendMessage}</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {ui.contact.name}
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg bg-background-tertiary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                    placeholder={ui.contact.namePlaceholder}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {ui.contact.email}
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg bg-background-tertiary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {ui.contact.message}
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg bg-background-tertiary border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                    placeholder={ui.contact.messagePlaceholder}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>{ui.contact.sending}</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {ui.contact.sendMessage}
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Contact Methods */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-6">{ui.contact.otherWays}</h3>
              {contactMethods.map((method, idx) => (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <Card
                    hover
                    className="cursor-pointer"
                    onClick={() => {
                      if (method.action === 'copy') {
                        handleCopyEmail()
                      } else if (method.href) {
                        window.open(method.href, '_blank')
                      }
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <method.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{method.label}</p>
                        <p className="text-sm text-foreground-secondary">{method.value}</p>
                      </div>
                      {method.action === 'copy' && (
                        <div className="text-accent">
                          {emailCopied ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
