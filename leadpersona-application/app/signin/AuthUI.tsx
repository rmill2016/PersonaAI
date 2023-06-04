'use client'

import { useSupabase } from '@/app/supabase-provider'
import { getURL } from '@/utils/helpers'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function AuthUI() {
  const { supabase } = useSupabase()
  return (
    <Auth
      supabaseClient={supabase}
      providers={['google']}
      redirectTo={getURL()}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: '#35BE9C',
              brandAccent: '#24856c'
            }
          }
        }
      }}
      theme="dark"
    />
  )
}
