import { Label, TextInput, Textarea } from 'flowbite-react'
import Button from '@/components/ui/Button/Button'
import React from 'react'
import { NextResponse } from 'next/server'

export default function ContactForm() {
  async function fetchContact() {
    const res = await fetch('/api/contact', {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json()

    return NextResponse.json({ data })
  }

  return (
    <form
      className="flex flex-col w-full h-auto max-w-screen-sm gap-6"
      action={fetchContact}
    >
      <div className=" flex flex-col items-start w-full gap-2">
        <Label className="text-accent">Name</Label>
        <TextInput
          placeholder="John Doe"
          className="focus-within:ring focus-within:ring-accent focus-within:rounded-lg w-full text-black"
        />
      </div>
      <div className=" flex flex-col items-start w-full gap-2">
        <Label className="text-accent">Position</Label>
        <TextInput
          placeholder="BCR"
          className="focus-within:ring focus-within:ring-accent focus-within:rounded-lg w-full text-black"
        />
      </div>
      <div className=" flex flex-col items-start w-full gap-2">
        <Label className="text-accent">Company</Label>
        <TextInput
          placeholder="Google"
          className="focus-within:ring focus-within:ring-accent focus-within:rounded-lg w-full text-black"
        />
      </div>
      <div className=" flex flex-col items-start gap-2">
        <Label className="text-accent">Message</Label>
        <Textarea
          placeholder="Dear ..."
          className="focus-within:ring focus-within:!ring-accent focus-within:rounded-lg h-auto min-h-[120px] max-h-48 overflow-y-auto text-black"
        />
      </div>
      <Button
        variant="outline"
        className="border-accent text-accent flex self-end"
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}
