import React from 'react'
import Button from '@/components/ui/Button/Button'
import { Json } from '@/types_db'
import { FaCheck } from 'react-icons/fa'

type Props = {
  title?: string | null
  apiCalls?: string | null
  price?: string[] | null
  options?: Json | undefined
  button?: Json | undefined
}

const PricingCard = ({ title, apiCalls, price, options, button }: Props) => {
  return (
    <div className="w-full h-full min-h-[550px] max-w-xs p-2 rounded-lg flex flex-col">
      <div className="bg-accent flex flex-col h-20 gap-2 p-2 rounded-t-lg">
        <h3 className="text-center">{title}</h3>
        <p className="text-center">{apiCalls}</p>
      </div>
      <div className="flex flex-col justify-between flex-grow h-full p-4 bg-white rounded-b-lg">
        <h2 className="md:text-5xl lg:text-6xl flex-grow text-4xl font-bold text-center text-black">
          {price}
        </h2>
        <div className="bg-gray w-full h-px"></div>
        <ul className=" flex flex-col justify-between flex-grow w-full h-full">
          {options &&
            Object.entries(options).map(([key, value]) => {
              if (['1', '2', '3', '4', '5', '6'].includes(key)) {
                return (
                  <li key={key} className="flex items-center gap-4 text-black">
                    <FaCheck className="fill-accent" />
                    {value}
                  </li>
                )
              } else {
                return null
              }
            })}
        </ul>
        <Button
          variant="filled"
          className="bg-accent self-end w-auto text-white"
        >
          {options &&
            Object.entries(options).map(([key, value]) => {
              if (['button'].includes(key)) {
                return <li key={key}>{value}</li>
              } else {
                return null
              }
            })}
        </Button>
      </div>
    </div>
  )
}

export default PricingCard
