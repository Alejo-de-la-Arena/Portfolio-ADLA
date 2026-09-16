import 'react'

declare module 'react' {
  // Declaration merging requires React's original type parameter.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    // React 18 forwards this HTML boolean attribute as an empty string.
    inert?: '' | undefined
  }
}
