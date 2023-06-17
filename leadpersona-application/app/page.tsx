import Button from '@/components/ui/Button'
import React from 'react'

type Props = {}

const Homepage = (props: Props) => {
  return (
    <section>
      <div className="container flex flex-col w-full h-full py-20">
        <h1 className="font-bold">
          LeadPeronsa | <span className="text-accent">Your AI Leader</span>
        </h1>
        <div className="flex flex-col items-start justify-center w-full h-auto max-w-2xl gap-8">
          <h2 className="font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
            tenetur?
          </h2>
          <h4 className="font-thin">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
            ipsa.
          </h4>
          <div className="flex items-center justify-start w-full gap-8">
            <Button variant="filled">Demo</Button>
            <Button variant="outline">Signup</Button>
          </div>
        </div>
        <img src="/home_1.png" alt="aileader" className="w-[400px] h-[800px]" />
      </div>
    </section>
  )
}

export default Homepage
