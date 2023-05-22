import React, { ReactElement, useEffect, useState } from 'react'
import { APP_COLLAPSE_WIDTH, APP_EXTEND_WIDTH } from './const'
import { Screen } from './types/types'
import classNames from 'classnames'
import Button from './components/Button'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './screens/Login'
import Questionaire from './screens/Questionaire'
import Main from './screens/Main'

export default function Panel({
  onWidthChange,
  initialEnabled,
}: {
  onWidthChange: (value: number) => void
  initialEnabled: boolean
}): ReactElement {
  const [enabled, setEnabled] = useState(initialEnabled)
  const [sidePanelWidth, setSidePanelWidth] = useState(enabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH)
  const [screen, setScreen] = useState<Screen>('LOGIN')
  const Logo = require('../public/img/icon-48.png')

  function handleOnToggle(enabled: boolean) {
    const value = enabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH
    setSidePanelWidth(value)
    onWidthChange(value)

    window['chrome'].storage?.local.set({ enabled })
  }

  function openPanel(force?: boolean) {
    const newValue = force || !enabled
    setEnabled(newValue)
    handleOnToggle(newValue)
  }

  useEffect(() => {
    let messageOverlay: HTMLElement | null = null
    window.addEventListener('load', () => {
      let messageOverlay: HTMLElement | null = document.querySelector('div.application-outlet aside#msg-overlay')
      if (messageOverlay) {
        messageOverlay.style.right = '90px'
        messageOverlay.style.transition = 'all 0.3 ease'
      } else null
    })
  }, [])

  return (
    <div
      style={{
        width: sidePanelWidth - 5,
      }}
      className="z-max bg-gradient-to-b from-green-from to-green-to absolute top-0 bottom-0 right-0 w-auto h-full overflow-hidden duration-300 ease-in-out"
    >
      <div className="absolute z-10 flex justify-center items-center ease-linear w-[60px] h-auto aspect-square p-1">
        <Button onClick={() => openPanel()}>
          <img src={Logo} alt="logo" style={{ width: '2.5rem', height: '2.5rem' }} />
        </Button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-[60px] h-auto aspect-square z-10 flex justify-center items-center p-1">
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
          'absolute w-full h-full grid grid-rows-[60px_1fr_60px] grid-cols-1 place-items-center transition-opacity overflow-y-hidden duration-200 delay-500',
          {
            'opacity-0 -z-10 pointer-events-none !delay-0 !duration-0': !enabled,
          }
        )}
      >
        <Header />
        {screen === 'LOGIN' && <Login />}
        {screen === 'QUESTIONAIRE' && <Questionaire />}
        {screen === 'MAIN' && <Main />}
        <Footer />
      </div>
    </div>
  )
}
