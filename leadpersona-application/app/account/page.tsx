import ManageSubscriptionButton from './ManageSubscriptionButton'
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server'
import Button from '@/components/ui/Button'
import { Database } from '@/types_db'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import Toast from '@/components/ui/Toast'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import SignOut from '@/components/ui/Navbar/SignOutButton'
import Card from '@/components/ui/Card'

export default async function Account() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ])

  const user = session?.user

  if (!session) {
    return redirect('/signin')
  }

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100)

  const updateName = async (formData: FormData) => {
    'use server'

    const newName = formData.get('name') as string
    const supabase = createServerActionClient<Database>({ cookies })
    const session = await getSession()
    const user = session?.user
    const { error } = await supabase
      .from('users')
      .update({ full_name: newName })
      .eq('id', user?.id)
    if (error) {
      console.log(error)
    }
    revalidatePath('/account')
    return <Toast type={'success'} message="Success!" />
  }

  const updateEmail = async (formData: FormData) => {
    'use server'

    const newEmail = formData.get('email') as string
    const supabase = createServerActionClient<Database>({ cookies })
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    if (error) {
      console.log(error)
    }
    revalidatePath('/account')
  }

  return (
    <section className="mb-32">
      <div className="sm:px-6 sm:pt-24 lg:px-8 max-w-6xl px-4 py-8 mx-auto">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="sm:text-center sm:text-6xl text-4xl font-extrabold text-white capitalize">
            your account
          </h1>
          <p className="sm:text-center sm:text-2xl max-w-2xl m-auto mt-5 text-xl text-white capitalize">
            manage your stripe customer portal here
          </p>
        </div>
      </div>
      <div className="p-4">
        <Card
          title="Your Plan"
          description={
            subscription
              ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
              : 'You are not currently subscribed to any plan.'
          }
          footer={<ManageSubscriptionButton session={session} />}
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            {subscription ? (
              `${subscriptionPrice}/${subscription?.prices?.interval}`
            ) : (
              <Link href="/">Choose your plan</Link>
            )}
          </div>
        </Card>
        <Card
          title="Your Name"
          description="Please enter your full name."
          footer={
            <div className="sm:flex-row sm:items-center flex flex-col items-start justify-between">
              <p className="sm:pb-0 pb-4">64 characters maximum</p>
              <Button variant="slim" type="submit" form="nameForm">
                Update Name
              </Button>
            </div>
          }
        >
          <form id="nameForm" action={updateName} className="mt-2">
            <input
              type="text"
              name="name"
              defaultValue={userDetails?.full_name ?? ''}
              placeholder="Your name"
              maxLength={64}
              className="bg-zinc-900 focus:border-secondary focus:ring-secondary w-full text-white border border-white rounded-md"
            />
          </form>
        </Card>
        <Card
          title="Your Email"
          description="Please enter the email address you wish to login with."
          footer={
            <div className="sm:flex-row sm:items-center flex flex-col items-start justify-between">
              <p className="sm:pb-0 pb-4">
                We will email you to verify the change.
              </p>
              <Button variant="slim" type="submit" form="emailForm">
                Update Email
              </Button>
            </div>
          }
        >
          <form id="emailForm" action={updateEmail} className="mt-2">
            <input
              type="email"
              name="email"
              defaultValue={user?.email ?? ''}
              placeholder="Your email"
              maxLength={64}
              className="bg-zinc-900 focus:border-secondary focus:ring-secondary w-full text-white border border-white rounded-md"
            />
          </form>
        </Card>
        <div className="flex items-center justify-center w-full h-20">
          <SignOut />
        </div>
      </div>
    </section>
  )
}
