export type Screen = {
  screen: 'Login' | 'Questionaire' | 'Main'
}

export type ButtonProps = {
  children?: ReactNode
  active?: boolean
  onClick?: () => void
  label?: string
  className?: string
}
