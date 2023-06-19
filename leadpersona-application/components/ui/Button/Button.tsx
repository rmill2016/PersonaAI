'use client'

import cn from 'classnames'
import React, { forwardRef, useRef, ButtonHTMLAttributes } from 'react'
import { mergeRefs } from 'react-merge-refs'

import LoadingDots from '@/components/ui/LoadingDots'

import styles from './Button.module.css'
import { IconType } from 'react-icons'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outline'
  active?: boolean
  width?: number
  loading?: boolean
  icon?: IconType
  Component?: React.ComponentType
}

const Button = forwardRef<HTMLButtonElement, Props>((props, buttonRef) => {
  const {
    className,
    variant = 'filled',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    icon: Icon,
    style = {},
    Component = 'button',
    ...rest
  } = props
  const ref = useRef(null)
  const rootClassName = cn(
    styles.root,
    {
      [styles.outline]: variant === 'outline',
      [styles.loading]: loading,
      [styles.disabled]: disabled
    },
    className
  )
  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style
      }}
      {...rest}
    >
      {children}
      {Icon && <Icon className="self-center w-6 h-6 ml-2" />}
      {loading && (
        <i className="flex pl-2 m-0">
          <LoadingDots />
        </i>
      )}
    </Component>
  )
})

export default Button
