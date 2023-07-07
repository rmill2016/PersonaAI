'use client'

import React, { useState, useEffect, useRef } from 'react'
import cn from 'classnames'
import s from './Menu.module.css'
import Button from '@/components/ui/Button'
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
          <a href={enabled ? '/' : undefined} onClick={() => setEnabled(false)}>
            Home
          </a>
        </li>
        <li className={rootLink}>
          <a
            href={enabled ? '#product' : undefined}
            onClick={() => setEnabled(false)}
          >
            Product
          </a>
        </li>
        <li className={rootLink}>
          <a
            href={enabled ? '/pricing' : undefined}
            onClick={() => setEnabled(false)}
          >
            Pricing
          </a>
        </li>
        <li className={rootLink}>
          <a
            href={enabled ? '#faq' : undefined}
            onClick={() => setEnabled(false)}
          >
            FAQs
          </a>
        </li>
        <li className={rootLink}>
          <a
            href={enabled ? '#contact' : undefined}
            onClick={() => setEnabled(false)}
          >
            Contact Us
          </a>
        </li>
        <li className={rootLink}>
          {user ? (
            <a
              href={enabled ? '/account' : undefined}
              onClick={() => setEnabled(false)}
            >
              <Button className="text-accent bg-white">Account</Button>
            </a>
          ) : (
            <a
              href={enabled ? '/signin' : undefined}
              onClick={() => setEnabled(false)}
            >
              <Button className="text-accent bg-white">Sign In</Button>
            </a>
          )}
        </li>
      </ul>
    </>
  )
}

export default Dropdown
