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
    <div className="border-secondary w-full max-w-3xl m-auto my-8 border-2 rounded-md">
      <div className="px-5 py-4">
        <h3 className="mb-1 text-2xl font-medium">{title}</h3>
        <p className="text-zinc-300">{description}</p>
        {children}
      </div>
      <div className="rounded-b-md bg-zinc-900 text-zinc-500 border-secondary p-4 border-t">
        {footer}
      </div>
    </div>
  )
}
