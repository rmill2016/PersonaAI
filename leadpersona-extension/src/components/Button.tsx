import classNames from 'classnames'
import React, { ReactElement, ReactNode } from 'react'
import { ButtonProps } from '../types/types'

export default function Button({
  children,
  active,
  onClick,
  label,
  className,
}: ButtonProps): ReactElement {
  return (
    <button
      className={classNames('p-2', className)}
      onClick={onClick}
      type="button"
    >
      {label}
      {children}
    </button>
  )
}
