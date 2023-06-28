'use client'

import React from 'react'
import Button from '@/components/ui/Button'
import { Accordion } from 'flowbite-react'

type Props = {
  question: string
  answer: string
}

const DropdownComponent = ({ question, answer }: Props) => {
  return (
    <Accordion
      collapseAll
      className="hover:ring hover:ring-accent-darken focus:ring focus:ring-accent-darken border-none"
    >
      <Accordion.Panel>
        <Accordion.Title>
          <h4>{question}</h4>
        </Accordion.Title>
        <Accordion.Content>
          <p className="text-white">{answer}</p>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  )
}

export default DropdownComponent
