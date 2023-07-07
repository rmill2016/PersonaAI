'use client'

import React from 'react'
import { Accordion } from 'flowbite-react'

type Props = {
  panel: {
    title: string
    content: string
    id: number
  }[]
}

const DropdownComponent = ({ panel }: Props) => {
  return (
    <Accordion
      collapseAll
      className="md:gap-8 lg:gap-12 flex flex-col w-full h-auto max-w-screen-md gap-4 my-auto border-none divide-y-0 outline-none"
    >
      {panel.map((accordion) => (
        <Accordion.Panel
          key={accordion.id}
          collapseAll
          className="flex flex-col gap-2"
        >
          <Accordion.Title>
            <h4>{accordion.title}</h4>
          </Accordion.Title>
          <Accordion.Content>
            <p>{accordion.content}</p>
          </Accordion.Content>
        </Accordion.Panel>
      ))}
    </Accordion>
  )
}

export default DropdownComponent
