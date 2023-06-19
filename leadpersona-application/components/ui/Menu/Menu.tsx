'use client'

import React, { useState, useEffect, useRef } from 'react'
import cn from 'classnames'
import s from './Menu.module.css'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import { FaBars } from 'react-icons/fa'

type Props = {
  className?: string
  user: User | null
}

const Dropdown = ({ className, user }: Props) => {
  const [enabled, setEnabled] = useState<boolean>(false)
  const rootClassName = cn(s.root, 'menu', { open: enabled }, className)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (enabled) {
      document.body.style.position = 'fixed'
      document.body.style.inset = '0px'
    } else {
      document.body.style.position = ''
      document.body.style.inset = ''
    }
  }, [enabled])
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setEnabled(false)
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])
  return (
    <div className={rootClassName} ref={menuRef}>
      <Button onClick={() => setEnabled(!enabled)} className="bg-accent">
        <FaBars className="fill-white w-6 h-auto" />
      </Button>
      <ul className={s.menuPanel}>
        <li className={s.menuLink}>
          <Link href={'/'} onClick={() => setEnabled(false)}>
            Home
          </Link>
        </li>
        <li className={s.menuLink}>
          <Link href={'#demo'} onClick={() => setEnabled(false)}>
            Product
          </Link>
        </li>
        <li className={s.menuLink}>
          <Link href={'/pricing'} onClick={() => setEnabled(false)}>
            Pricing
          </Link>
        </li>
        <li className={s.menuLink}>
          <Link href={'#faq'} onClick={() => setEnabled(false)}>
            FAQs
          </Link>
        </li>
        <li className={s.menuLink}>
          <Link href={'#contact'} onClick={() => setEnabled(false)}>
            Contact Us
          </Link>
        </li>
        <li className={s.menuLink}>
          {user ? (
            <Link href={'/account'} onClick={() => setEnabled(false)}>
              <Button className="text-accent bg-white">Account</Button>
            </Link>
          ) : (
            <Link href={'/signin'} onClick={() => setEnabled(false)}>
              <Button className="text-accent bg-white">Sign In</Button>
            </Link>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Dropdown
