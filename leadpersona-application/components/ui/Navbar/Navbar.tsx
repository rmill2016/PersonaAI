import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/app/supabase-server'

import Logo from '@/components/icons/Logo'
import Button from '@/components/ui/Button'
import Dropdown from '@/components/ui/Dropdown'

import s from './Navbar.module.css'

export default async function Navbar() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

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
              <Link href={'#demo'} className={s.link}>
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
                  <Button>Sign In</Button>
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div className={s.mobile}>
          <Dropdown className={'bg-accent'} />
        </div>
        {/* {enabled && (
          <div className={s.dropdown}>
            <ul>
              <li>
                <Link href={'/'} className={s.link}>
                  Home
                </Link>
              </li>
              <li>
                <Link href={'#demo'} className={s.link}>
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
                  <Link href={'/account'} className={s.link}>
                    <Button>Account</Button>
                  </Link>
                ) : (
                  <Link href={'/signin'} className={s.link}>
                    <Button variant="slim">Sign In</Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )} */}
      </div>
    </nav>
  )
}
