import React from 'react'
import Link from 'next/link'
import { headers } from 'next/headers'
import { createServerSupabaseClient } from '@/app/supabase-server'

import Logo from '@/components/icons/Logo'
import Button from '@/components/ui/Button'
import Dropdown from '@/components/ui/Menu'

import s from './Navbar.module.css'

export default async function Navbar() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  const headersList = headers()
  const url = headersList.get('referer') || ''

  console.log(url)

  return (
    <nav className={s.root}>
      <div className={s.navbar}>
        <div className={s.left}>
          <Link href={'/'} className={s.logo}>
            <Logo className="w-full h-full" />
          </Link>
        </div>
        <div className={s.right}>
          <ul>
            <li>
              <Link href={'/'} className={s.link}>
                Home
              </Link>
            </li>
            <li>
              <Link href={'#product'} className={s.link}>
                Product
              </Link>
            </li>
            <li>
              <Link href={'/pricing'} className={s.link}>
                Pricing
              </Link>
            </li>
            <li>
              <Link href={'#faq'} className={s.link}>
                FAQs
              </Link>
            </li>
            <li>
              <Link href={'#contact'} className={s.link}>
                Contact Us
              </Link>
            </li>
            <li>
              {user ? (
                <Link href={'/account'}>
                  <Button>Account</Button>
                </Link>
              ) : (
                <Link href={'/signin'}>
                  <Button variant="filled" className="bg-accent">
                    Sign In
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div className={s.mobile}>
          <Dropdown user={user} />
        </div>
      </div>
    </nav>
  )
}
