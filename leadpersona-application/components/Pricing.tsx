'use client'

import Button from '@/components/ui/Button'
import { Database } from '@/types_db'
import { postData } from '@/utils/helpers'
import { getStripe } from '@/utils/stripe-client'
import { Session, User } from '@supabase/supabase-js'
import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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

  /* if (!products.length)
    return (
      <section className="bg-base">
        <div className="sm:py-24 sm:px-6 lg:px-8 max-w-6xl px-4 py-8 mx-auto">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="sm:text-center sm:text-6xl text-4xl font-extrabold text-white">
            No subscription pricing plans found. Create them in your{' '}
            <a
              className="text-secondary underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    ) */

  if (products.length === 1)
    return (
      <section className="bg-base">
        <div className="sm:py-24 sm:px-6 lg:px-8 max-w-6xl px-4 py-8 mx-auto">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="sm:text-center sm:text-6xl text-4xl font-extrabold text-white">
              Pricing Plans
            </h1>
            <p className="text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto mt-5 text-xl">
              Start building for free, then add a site plan to go live. Account
              plans unlock additional features.
            </p>
            <div className="bg-zinc-900 border-zinc-800 relative flex self-center mt-12 border rounded-lg">
              <div className="border-secondary bg-zinc-900 divide-zinc-600 border border-opacity-50 divide-y rounded-lg shadow-sm">
                <div className="border-zinc-800 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8 p-6 py-2 m-1 text-2xl font-medium text-white rounded-md shadow-sm">
                  {products[0].name}
                </div>
              </div>
            </div>
            <div className="sm:mt-12 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3 mt-6 space-y-4">
              {products[0].prices?.map((price) => {
                const priceString =
                  price.unit_amount &&
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: price.currency!,
                    minimumFractionDigits: 0
                  }).format(price.unit_amount / 100)

                return (
                  <div
                    key={price.interval}
                    className="divide-zinc-600 bg-zinc-900 divide-y rounded-lg shadow-sm"
                  >
                    <div className="p-6">
                      <p>
                        <span className="white text-5xl font-extrabold">
                          {priceString}
                        </span>
                        <span className="text-zinc-100 text-base font-medium">
                          /{price.interval}
                        </span>
                      </p>
                      <p className="text-zinc-300 mt-4">{price.description}</p>
                      <Button
                        variant="filled"
                        type="button"
                        disabled={false}
                        loading={priceIdLoading === price.id}
                        onClick={() => handleCheckout(price)}
                        className="hover:bg-zinc-900 block w-full py-2 mt-12 text-sm font-semibold text-center text-white rounded-md"
                      >
                        {products[0].name ===
                        subscription?.prices?.products?.name
                          ? 'Manage'
                          : 'Subscribe'}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )

  return (
    <section className="bg-base">
      <div className="sm:py-24 sm:px-6 lg:px-8 max-w-6xl px-4 py-8 mx-auto">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-center">LeadPersona Pricing</h1>
          <p className="mt-4 text-center text-white">
            We offer monthly and yearly plans for our services
          </p>
          <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 ">
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
          </div>
        </div>
        <div className="sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3 mt-12 space-y-4">
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            )
            if (!price) return null
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency!,
              minimumFractionDigits: 0
            }).format((price?.unit_amount || 0) / 100)
            return (
              <div
                key={product.id}
                className={cn('rounded-lg shadow-sm bg-zinc-900', {
                  'border border-secondary': subscription
                    ? product.name === subscription?.prices?.products?.name
                    : product.name === 'Freelancer'
                })}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 text-white">
                    {product.name}
                  </h2>
                  <p className="text-zinc-300 mt-4">{product.description}</p>
                  <p className="mt-8">
                    <span className="text-5xl font-extrabold text-white">
                      {priceString}
                    </span>
                    <span className="text-zinc-100 text-base font-medium">
                      /{billingInterval}
                    </span>
                  </p>
                  <Button
                    variant="filled"
                    type="button"
                    disabled={!session}
                    loading={priceIdLoading === price.id}
                    onClick={() => handleCheckout(price)}
                    className="bg-accent  mt-8 text-white"
                  >
                    {product.name === subscription?.prices?.products?.name
                      ? 'Manage'
                      : 'Subscribe'}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
