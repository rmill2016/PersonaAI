import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Button from '../src/components/Button'
import Main from '../src/components/Main'
import { APP_COLLAPSE_WIDTH, APP_EXTEND_WIDTH } from '../src/const'
// @ts-ignore
import Logo from '../src/icon-48.png'
import supabase from '../src/supabase_client'
import { Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Screen, Data, DataError, AppProps } from '../src/types/types'

const App = ({
  onWidthChange,
  initialEnabled,
}: AppProps): React.ReactElement => {
  const [session, setSession] = useState<Session | null>(null)
  const [screen, setScreen] = useState<Screen>('AUTH')
  const [view, setView] = useState<'sign_in' | 'sign_up'>('sign_in')
  const [error, setError] = useState('')
  const [enabled, setEnabled] = useState(initialEnabled)
  const [sidePanelWidth, setSidePanelWidth] = useState(
    enabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH
  )

  // toggle panel
  function handleOnToggle(enabled: boolean) {
    const value = enabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH
    setSidePanelWidth(value)
    onWidthChange(value)

    window['chrome'].storage?.local.set({ enabled })
  }

  // opens panel
  function openPanel(force?: boolean) {
    const newValue = force || !enabled
    setEnabled(newValue)
    handleOnToggle(newValue)
  }

  // handle signup of Supabase
  async function handleSignUp(email: string, password: string) {
    await chrome.runtime.sendMessage({
      action: 'signUp',
      value: { email, password },
    })
    setView('sign_in')
  }

  // handle signin of Supabase
  async function handleSignInPassword(email: string, password: string) {
    try {
      const { data, error }: { data: Data; error: DataError } =
        await chrome.runtime.sendMessage({
          action: 'signIn',
          value: { email, password },
        })
      if (error) return setError(error.message)

      if (!data || !data.session) {
        return setError('Incorrect username or password')
      }

      chrome.storage.local.set({ session: data.session })
      setSession(data.session)
      setView('sign_in')
    } catch (error) {
      return setError(error.message)
    }
  }

  // handle signin with Google OAuth
  async function signInWithGoogle() {
    const { data, error }: { data: Data; error: DataError } =
      await chrome.runtime.sendMessage({
        action: 'signInAuth',
      })
    if (error) return setError(error.message)
  }

  // handle signout of Supabase
  async function handleSignOut() {
    const signOutResult = await chrome.runtime.sendMessage({
      action: 'signOut',
    })
    setView('sign_in')
    setSession(signOutResult.data)
  }

  // initially moves message container on LinkedIn
  useEffect(() => {
    window.addEventListener('load', () => {
      let messageOverlay: HTMLElement | null = document.querySelector(
        'div.application-outlet aside#msg-overlay'
      )
      if (messageOverlay) {
        messageOverlay.style.right = '90px'
        messageOverlay.style.transition = 'all 0.3 ease'
      } else null
    })
  }, [])

  // get current session
  async function getSession() {
    try {
      const {
        data: { session },
      } = await chrome.runtime.sendMessage({ action: 'getSession' })

      if (session) {
        setSession(session)
      } else setSession(null)
    } catch (error) {
      setError(error)
    }
  }

  // get current session and if authenticated set user session
  useEffect(() => {
    getSession()
    setError('')

    /* const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe() */
  }, [])

  // conditionally render screen
  function renderScreen() {
    if (!session) {
      return (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google']}
          view={view}
        />
      )
    } else {
      return <Main onSignOut={handleSignOut} />
    }
  }

  return (
    <div
      style={{
        width: sidePanelWidth - 5,
      }}
      className="z-max bg-gradient-to-b from-green-from to-green-to absolute top-0 bottom-0 right-0 w-auto h-full overflow-hidden duration-300 ease-in-out"
    >
      <div
        className={classNames(
          'absolute z-10 flex justify-center items-center ease-linear w-[60px] h-auto aspect-square p-1',
          enabled && 'hidden pointer-events-none'
        )}
      >
        <Button onClick={() => openPanel()}>
          <img
            src={Logo}
            alt="logo"
            style={{ width: '2.5rem', height: '2.5rem' }}
          />
        </Button>
      </div>
      <div
        className={classNames(
          'absolute bottom-0 left-0 right-0 w-[60px] h-auto aspect-square z-10 flex justify-center items-center p-1',
          enabled && 'bottom-20'
        )}
      >
        <Button active={enabled} onClick={() => openPanel()}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: '2.5rem', height: '2.5rem' }}
              className="text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  enabled
                    ? 'M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25'
                    : 'M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
                }
              />
            </svg>
          </span>
        </Button>
      </div>
      <div
        id="screen"
        className={classNames(
          'absolute w-full h-full grid grid-rows-[60px_1fr_60px] grid-cols-1 place-items-center transition-opacity overflow-y-hidden duration-200 delay-500 p-4',
          {
            'opacity-0 -z-10 pointer-events-none !delay-0 !duration-0':
              !enabled,
          }
        )}
      >
        <Header
          screen={screen}
          setScreen={setScreen}
          view={view}
          setView={setView}
          onWidthChange={onWidthChange}
          setEnabled={setEnabled}
          setSidePanelWidth={setSidePanelWidth}
        />
        {renderScreen()}
        <Footer />
      </div>
    </div>
  )
}
export default App
