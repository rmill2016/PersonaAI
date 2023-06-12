'use client'

import { useSupabase } from '@/app/supabase-provider'
import { getURL } from '@/utils/helpers'
import { Auth } from '@supabase/auth-ui-react'

export default function AuthUI() {
  const { supabase } = useSupabase()
  return (
    <Auth
      supabaseClient={supabase}
      providers={['google']}
      redirectTo={getURL()}
      appearance={{
        className: {
          divider: '!bg-accent',
          anchor: '!text-accent !font-normal hover:!text-opacity-80',
          button:
            'first:bg-slate-200 first:rounded-md first:border-none first:p-2 first:text-black first:hover:!bg-slate-300 even:bg-accent even:rounded-md even:border-none even:text-white even:p-2 even:hover:!bg-accent-darken',
          input: '!bg-white !placeholder-black !rounded-md !border-none !p-2',
          label: '!text-accent'
        }
      }}
    />
  )
}
