export type ButtonProps = {
  children?: ReactNode
  active?: boolean
  onClick?: () => void
  label?: string
  className?: string
}

export type AppProps = {
  onWidthChange: (value: number) => void
  initialEnabled: boolean
}
