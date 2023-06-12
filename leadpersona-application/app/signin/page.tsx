import { getSession } from '@/app/supabase-server'
import AuthUI from './AuthUI'

import { redirect } from 'next/navigation'
import Logo from '@/components/icons/Logo'

export default async function SignIn() {
  const session = await getSession()

  if (session) {
    return redirect('/account')
  }

  return (
    <div className="height-screen-helper flex flex-col items-center justify-center gap-5 p-4">
      <Logo width={120} height={120} />
      <div className="w-full h-auto max-w-[500px]">
        <AuthUI />
      </div>
    </div>
  )
}
