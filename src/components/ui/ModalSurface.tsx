import { useLayoutEffect, useRef, type ReactNode } from 'react'

type ModalSurfaceProps = {
  children: ReactNode
  onClose: () => void
  label?: string
  labelledBy?: string
}

let scrollLocks = 0
let previousOverflow = ''

export function ModalSurface({ children, onClose, label, labelledBy }: ModalSurfaceProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useLayoutEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const trigger = document.activeElement
    if (scrollLocks++ === 0) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    // showModal makes the rest of the document inert and moves focus inside.
    dialog.showModal()
    const initial = dialog.querySelector<HTMLElement>('[data-dialog-initial-focus]')
    initial?.focus({ preventScroll: true })

    return () => {
      dialog.close()
      if (--scrollLocks === 0) document.body.style.overflow = previousOverflow
      if (trigger instanceof HTMLElement && trigger.isConnected) {
        trigger.focus({ preventScroll: true })
      }
    }
  }, [])

  return (
    <dialog
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-labelledby={labelledBy}
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none overflow-hidden border-0 bg-transparent p-0 text-foreground backdrop:bg-transparent"
      onCancel={event => { event.preventDefault(); onClose() }}
      onKeyDown={event => {
        if (event.key !== 'Tab') return
        const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          'a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex="0"]'
        )).filter(item => item.getClientRects().length > 0 && !item.closest('[inert]'))
        const first = items[0]
        const last = items[items.length - 1]
        if (!first) { event.preventDefault(); return }
        const active = document.activeElement
        if (event.shiftKey && (active === first || !items.some(item => item === active))) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && (active === last || !items.some(item => item === active))) {
          event.preventDefault()
          first.focus()
        }
      }}
    >
      {children}
    </dialog>
  )
}
