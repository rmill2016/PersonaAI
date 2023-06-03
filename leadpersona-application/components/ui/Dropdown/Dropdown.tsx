'use client'

import React from 'react'
import cn from 'classnames'
import s from './Dropdown.module.css'

type Props = {
  className?: string
}

const Dropdown = ({ className }: Props) => {
  const rootClassName = cn(s.root, {}, className)
  return <div className={rootClassName}></div>
}

export default Dropdown
