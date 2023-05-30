import React from 'react'

type Props = {
  onSignOut: () => void
}

const Main = ({ onSignOut }: Props) => {
  return (
    <div className="w-full h-60 border border-white rounded-xl flex flex-col justify-end">
      <button
        className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-red-500 rounded-lg h-[60px]"
        onClick={() => onSignOut()}
      >
        Sign Out
      </button>
    </div>
  )
}

export default Main
