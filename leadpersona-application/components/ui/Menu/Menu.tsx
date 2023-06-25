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
  const rootLink = cn(s.menuLink, {
    '!opacity-100 transition-opacity duration-500 ease-out delay-[800ms]':
      enabled
  })
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (enabled) {
      document.body.style.position = 'fixed'
    } else document.body.style.position = ''
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
    <>
      <div className={rootClassName} ref={menuRef}>
        <Button
          onClick={() => setEnabled(!enabled)}
          variant={enabled ? 'outline' : 'filled'}
          className={cn('relative z-30', { 'bg-accent': !enabled })}
        >
          <FaBars className="fill-white w-6 h-auto" />
        </Button>
      </div>
      <ul
        className={cn(s.menuPanel, {
          'w-[60vw] transition-width duration-500 ease-in-out flex': enabled
        })}
      >
        <li className={rootLink}>
          <Link href={enabled ? '/' : ''} onClick={() => setEnabled(false)}>
            Home
          </Link>
        </li>
        <li className={rootLink}>
          <Link
            href={enabled ? '#product' : ''}
            onClick={() => setEnabled(false)}
          >
            Product
          </Link>
        </li>
        <li className={rootLink}>
          <Link
            href={enabled ? '/pricing' : ''}
            onClick={() => setEnabled(false)}
          >
            Pricing
          </Link>
        </li>
        <li className={rootLink}>
          <Link href={enabled ? '#faq' : ''} onClick={() => setEnabled(false)}>
            FAQs
          </Link>
        </li>
        <li className={rootLink}>
          <Link
            href={enabled ? '#contact' : ''}
            onClick={() => setEnabled(false)}
          >
            Contact Us
          </Link>
        </li>
        <li className={rootLink}>
          {user ? (
            <Link
              href={enabled ? '/account' : ''}
              onClick={() => setEnabled(false)}
            >
              <Button className="text-accent bg-white">Account</Button>
            </Link>
          ) : (
            <Link
              href={enabled ? '/signin' : ''}
              onClick={() => setEnabled(false)}
            >
              <Button className="text-accent bg-white">Sign In</Button>
            </Link>
          )}
        </li>
      </ul>
    </>
  )
}

export default Dropdown
