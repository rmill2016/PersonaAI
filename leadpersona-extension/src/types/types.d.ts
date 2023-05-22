export type Screen = 'LOGIN' | 'QUESTIONAIRE' | 'MAIN'

export type ButtonProps = {
  children?: ReactNode
  active?: boolean
  onClick?: () => void
  label?: string
  className?: string
}
