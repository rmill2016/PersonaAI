'use client'

import Button from '@/components/ui/Button'
import { Database } from '@/types_db'
import { postData } from '@/utils/helpers'
import { getStripe } from '@/utils/stripe-client'
import { Session, User } from '@supabase/supabase-js'
import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import PricingCard from './PricingCard/PricingCard'

type Subscription = Database['public']['Tables']['subscriptions']['Row']
type Product = Database['public']['Tables']['products']['Row']
type Price = Database['public']['Tables']['prices']['Row']
interface ProductWithPrices extends Product {
  prices: Price[]
}
interface PriceWithProduct extends Price {
  products: Product | null
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null
}

interface Props {
  session: Session | null
  user: User | null | undefined
  products: ProductWithPrices[]
  subscription: SubscriptionWithProduct | null
}

type BillingInterval = 'year' | 'month'

export default function Pricing({
  session,
  user,
  products,
  subscription
}: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  )
  const router = useRouter()
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month')
  const [priceIdLoading, setPriceIdLoading] = useState<string>()

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id)
    if (!user) {
      return router.push('/signin')
    }
    if (price.product_id === subscription?.prices?.products?.id) {
      return router.push('/account')
    }
    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      })

      const stripe = await getStripe()
      stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      return alert((error as Error)?.message)
    } finally {
      setPriceIdLoading(undefined)
    }
  }

  return (
    <section className="bg-base pt-20">
      <div className="sm:py-24 sm:px-6 lg:px-8 max-w-6xl px-4 py-8 mx-auto">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-center">LeadPersona Pricing</h1>
          <p className="mt-4 text-center text-white">
            We offer monthly and yearly plans for our services
          </p>
          {/* <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 ">
            {intervals.includes('month') && (
              <button
                onClick={() => setBillingInterval('month')}
                type="button"
                className={`${
                  billingInterval === 'month'
                    ? 'relative w-1/2 bg-accent shadow-sm text-white'
                    : 'ml-0.5 relative w-1/2 border border-transparent text-white'
                } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap  focus:z-10 sm:w-auto sm:px-8`}
              >
                Monthly billing
              </button>
            )}
            {intervals.includes('year') && (
              <button
                onClick={() => setBillingInterval('year')}
                type="button"
                className={`${
                  billingInterval === 'year'
                    ? 'relative w-1/2 bg-accent shadow-sm text-white'
                    : 'ml-0.5 relative w-1/2 border border-transparent text-white'
                } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap  focus:z-10 sm:w-auto sm:px-8`}
              >
                Yearly billing
              </button>
            )}
          </div> */}
        </div>
        <div className="sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3 mt-12 space-y-4">
          {products &&
            products.map((product) => <PricingCard title={product.name!} />)}
        </div>
        {/* <div className="md:flex-row md:flex-wrap lg:flex-1 flex flex-col items-center w-full h-auto gap-6">
            {intervals.map((interval) => (
              <PricingCard key={interval} />
            ))}
          </div> */}
      </div>
    </section>
  )
}
