'use client'

import React, { useState, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
type Props = {}

const Laptop = (props: Props) => {
  const lenis = new Lenis()

  lenis.on('scroll', (e: any) => {
    console.log(e)
  })

  function raf(time: any) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
  return <div>Laptop</div>
}

export default Laptop
