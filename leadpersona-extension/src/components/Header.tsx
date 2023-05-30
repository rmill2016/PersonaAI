import React, { Dispatch, SetStateAction } from 'react'
import { Screen } from '../types/types'
import Logo from '../icon-48.png'
import { APP_COLLAPSE_WIDTH, APP_EXTEND_WIDTH } from '../const'
import { FiUser } from 'react-icons/fi'
import { VscWholeWord } from 'react-icons/vsc'
import { GrAnnounce } from 'react-icons/gr'
import { RiUserVoiceFill } from 'react-icons/ri'

type Props = {
  screen: Screen
  setScreen: Dispatch<SetStateAction<Screen>>
  setEnabled: Dispatch<SetStateAction<boolean>>
  view: 'sign_in' | 'sign_up'
  setView: Dispatch<SetStateAction<'sign_in' | 'sign_up'>>
  setSidePanelWidth: Dispatch<SetStateAction<number>>
  onWidthChange: (value: number) => void
}

function renderHeader({
  screen,
  setScreen,
  view,
  setView,
  setSidePanelWidth,
  setEnabled,
  onWidthChange,
}: Props) {
  switch (screen) {
    case 'AUTH':
      return (
        <header className="flex w-full h-full items-center justify-between">
          <img
            onClick={(e) => {
              setEnabled(!e)
              setSidePanelWidth(e ? APP_COLLAPSE_WIDTH : APP_EXTEND_WIDTH)
              onWidthChange(e ? APP_COLLAPSE_WIDTH : APP_EXTEND_WIDTH)
            }}
            src={Logo}
            alt="Logo"
            className="w-10 h-auto cursor-pointer relative pointer-events-auto"
          />
          <button
            onClick={() => setView('sign_up')}
            className="text-white font-medium border border-white rounded-full px-4 py-2 w-auto h-auto hover:shadow-lg"
          >
            Start Free Trial
          </button>
        </header>
      )

    case 'QUESTIONAIRE':
      return null

    case 'MAIN':
      return (
        <header className="flex flex-col w-full h-full">
          <nav className="grid grid-cols-3 place-items-center">
            <img
              onClick={(e) => {
                setEnabled(!e)
                setSidePanelWidth(e ? APP_COLLAPSE_WIDTH : APP_EXTEND_WIDTH)
                onWidthChange(e ? APP_COLLAPSE_WIDTH : APP_EXTEND_WIDTH)
              }}
              src={Logo}
              alt="Logo"
              className="w-10 h-auto cursor-pointer relative pointer-events-auto"
            />
            <h2 className="text-center text-white">
              LeadPersona |{' '}
              <span className="text-green-accent">Your AI Leader</span>
            </h2>
            <FiUser className="fill-green-accent w-6 h-auto" />
          </nav>
          <nav className="grid grid-cols-4 place-items-center">
            <FiUser className="fill-green-accent w-6 h-auto hover-underline" />
            <VscWholeWord className="fill-text-accent w-6 h-auto hover-underline" />
            <RiUserVoiceFill className="fill-text-accent w-6 h-auto hover-underline" />
            <GrAnnounce className="fill-text-accent w-6 h-auto hover-underline" />
          </nav>
        </header>
      )
  }
}

const Header = ({
  screen,
  setScreen,
  view,
  setView,
  setEnabled,
  onWidthChange,
  setSidePanelWidth,
}: Props) => {
  return renderHeader({
    screen,
    setScreen,
    view,
    setView,
    setEnabled,
    onWidthChange,
    setSidePanelWidth,
  })
}

export default Header
