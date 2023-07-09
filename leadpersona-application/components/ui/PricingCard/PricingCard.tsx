import React from 'react'

type Props = {
  title?: string
  apiCalls?: string
  price?: string
  options?: Array<string>
  button?: string
}

const PricingCard = ({ title, apiCalls, price, options, button }: Props) => {
  return (
    <div className="w-full h-auto min-h-[520px] max-w-xs rounded-lg bg-white p-2">
      <div className="bg-accent flex flex-col gap-4">
        <h4 className="text-center">{title}</h4>
        <p>{apiCalls}</p>
      </div>
      <h2>{price}</h2>
      <hr className="bg-gray w-full h-px" />
      <ul>
        {options &&
          options.map((option, index) => <li key={index}>{option}</li>)}
      </ul>
    </div>
  )
}

export default PricingCard
