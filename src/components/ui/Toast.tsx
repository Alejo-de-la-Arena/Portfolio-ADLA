import { Toaster as SonnerToaster } from 'sonner'

export function Toast() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: 'bg-background-secondary border-border',
          title: 'text-foreground',
          description: 'text-foreground-secondary',
          actionButton: 'bg-accent text-white',
          cancelButton: 'bg-background-tertiary text-foreground-secondary',
        },
      }}
    />
  )
}
