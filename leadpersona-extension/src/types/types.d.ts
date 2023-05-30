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

export type Screen = 'AUTH' | 'QUESTIONAIRE' | 'MAIN'

export type SignInProps = {
  onSignIn: (email: string, password: string) => void
  onScreenChange: () => void
  title: string
  helpText?: string
  error?: string
}

export type Data =
  | {
      user: User | null
      session: Session | null
    }
  | {
      user: null
      session: null
    }

export type DataError = AuthError | null

type Message =
  | {
      action: 'getSession' | 'signOut' | 'signInAuth'
      value: null
    }
  | {
      action: 'signIn' | 'signUp'
      value: {
        email: string
        password: string
      }
    }

type ResponseCallback = (data: any) => void
