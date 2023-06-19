'use client'

import React, { ReactNode } from 'react'

interface Props {
  title: string
  description?: string
  footer?: ReactNode
  children?: ReactNode
}

export default function Card({ title, description, footer, children }: Props) {
  return (
    <div className="first-of-type:mt-0 first-of-type:mb-8 w-full max-w-3xl my-8 border-2 border-white rounded-md">
      <div className="px-5 py-4">
        <h3 className="mb-1">{title}</h3>
        <p className="text-zinc-300">{description}</p>
        {children}
      </div>
      <div className="rounded-b-md bg-zinc-900 p-4 text-white border-t border-white">
        {footer}
      </div>
    </div>
  )
}
