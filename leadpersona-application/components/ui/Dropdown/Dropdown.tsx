'use client'

import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import s from './Dropdown.module.css'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import { FaBars } from 'react-icons/fa'

type Props = {
  className?: string
  user: User | null
}

const Dropdown = ({ className, user }: Props) => {
  const rootClassName = cn(s.root, {}, className)
  const [enabled, setEnabled] = useState<boolean>(false)

  useEffect(() => {
    if (enabled) {
      document.body.style.position = 'fixed'
      document.body.style.inset = '0px'
    } else {
      document.body.style.position = ''
      document.body.style.inset = ''
    }
  }, [enabled])
  return (
    <div className={rootClassName}>
      <Button onClick={() => setEnabled(!enabled)}>
        <FaBars className="fill-white w-6 h-auto" />
      </Button>
      <ul className={enabled ? 'flex' : 'hidden'}>
        <li>
          <Link href={'/'} className={s.link} onClick={() => setEnabled(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link
            href={'#demo'}
            className={s.link}
            onClick={() => setEnabled(false)}
          >
            Product
          </Link>
        </li>
        <li>
          <Link
            href={'/pricing'}
            className={s.link}
            onClick={() => setEnabled(false)}
          >
            Pricing
          </Link>
        </li>
        <li>
          <Link
            href={'#faq'}
            className={s.link}
            onClick={() => setEnabled(false)}
          >
            FAQs
          </Link>
        </li>
        <li>
          <Link
            href={'#contact'}
            className={s.link}
            onClick={() => setEnabled(false)}
          >
            Contact Us
          </Link>
        </li>
        <li>
          {user ? (
            <Link href={'/account'} onClick={() => setEnabled(false)}>
              <Button className="border-accent text-accent bg-white border">
                Account
              </Button>
            </Link>
          ) : (
            <Link href={'/signin'} onClick={() => setEnabled(false)}>
              <Button className="border-accent text-accent bg-white border">
                Sign In
              </Button>
            </Link>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Dropdown
