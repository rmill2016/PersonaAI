'use client'

import Button from '@/components/ui/Button'
import { postData } from '@/utils/helpers'

import { Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

interface Props {
  session: Session
}

export default function ManageSubscriptionButton({ session }: Props) {
  const router = useRouter()
  const redirectToCustomerPortal = async () => {
    try {
      const { url } = await postData({
        url: '/api/create-portal-link'
      })
      router.push(url)
    } catch (error) {
      if (error) return alert((error as Error).message)
    }
  }

  return (
    <div className="sm:flex-row sm:items-center flex flex-col items-start justify-between">
      <p className="sm:pb-0 pb-4">Manage your subscription on Stripe.</p>
      <Button
        variant="filled"
        disabled={!session}
        onClick={redirectToCustomerPortal}
        className="bg-accent text-white"
      >
        Open customer portal
      </Button>
    </div>
  )
}
