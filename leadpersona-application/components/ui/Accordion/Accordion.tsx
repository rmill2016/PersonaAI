'use client'

import React from 'react'
import { Accordion } from 'flowbite-react'

type Props = {
  panel: {
    title: string
    content: string
  }[]
}

const DropdownComponent = ({ panel }: Props) => {
  return (
    <Accordion
      collapseAll
      className="md:gap-20 lg:gap-24 flex flex-col w-full h-auto max-w-screen-md gap-10 my-auto border-none divide-y-0 outline-none"
    >
      {panel.map((accordion) => (
        <Accordion.Panel collapseAll>
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
