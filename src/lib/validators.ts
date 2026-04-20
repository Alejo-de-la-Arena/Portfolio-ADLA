import { z } from 'zod'
import type { Locale } from '@/context/LocaleContext'

export function getContactFormSchema(locale: Locale) {
  const copy = locale === 'es'
    ? {
        nameMin: 'El nombre debe tener al menos 2 caracteres',
        nameMax: 'El nombre no puede exceder 50 caracteres',
        emailValid: 'Ingresá un email válido',
        emailRequired: 'El email es requerido',
        messageMin: 'El mensaje debe tener al menos 10 caracteres',
        messageMax: 'El mensaje no puede exceder 1000 caracteres',
      }
    : {
        nameMin: 'Name must have at least 2 characters',
        nameMax: 'Name cannot exceed 50 characters',
        emailValid: 'Please enter a valid email',
        emailRequired: 'Email is required',
        messageMin: 'Message must have at least 10 characters',
        messageMax: 'Message cannot exceed 1000 characters',
      }

  return z.object({
    name: z
      .string()
      .min(2, copy.nameMin)
      .max(50, copy.nameMax),
    email: z
      .string()
      .email(copy.emailValid)
      .min(1, copy.emailRequired),
    message: z
      .string()
      .min(10, copy.messageMin)
      .max(1000, copy.messageMax),
  })
}

export const contactFormSchema = getContactFormSchema('es')

export type ContactFormSchema = z.infer<typeof contactFormSchema>
