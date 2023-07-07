'use client'

import React from 'react'
import s from './page.module.css'
import Button from '@/components/ui/Button/Button'
import { FaBox, FaEdit, FaExternalLinkAlt } from 'react-icons/fa'
import Laptop from '@/components/scroll/laptop'
import Lenis from '@studio-freight/lenis'
import Accordion from '@/components/ui/Accordion/Accordion'
import ContactForm from '@/components/ui/ContactForm/ContactForm'

const faqList: Array<{ title: string; content: string; id: number }> = [
  {
    title: 'Why Choose LeadPersona Over Competitors?',
    content: 'because...',
    id: 1
  },
  {
    title: 'Why Choose LeadPersona Over Competitors?',
    content: 'because...',
    id: 2
  },
  {
    title: 'Why Choose LeadPersona Over Competitors?',
    content: 'because...',
    id: 3
  },
  {
    title: 'Why Choose LeadPersona Over Competitors?',
    content: 'because...',
    id: 4
  }
]

const Page = () => {
  const lenis = new Lenis()

  function raf(time: any) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
  return (
    <>
      <section className={s.homepage}>
        <div className={s.background} />
        <div className={s.homepageContainer}>
          <h1>
            LeadPersona | <span className="text-accent">Your AI Leader</span>
          </h1>
          <div className={s.homeLeft}>
            <ul>
              <h2 className="text-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique, temporibus?
              </h2>
              <h4 className="font-thin">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
                mollitia?
              </h4>
              <li>
                <Button
                  variant="filled"
                  className="bg-accent"
                  icon={FaBox}
                  onClick={() => lenis.scrollTo('#product', { duration: 1.5 })}
                >
                  Demo
                </Button>
                <Button
                  variant="outline"
                  className="text-accent"
                  icon={FaEdit}
                  onClick={() => window.location.assign('/signin')}
                >
                  Sign Up
                </Button>
              </li>
            </ul>
          </div>
          <div className={s.homeRight}>
            <img src="/home_1.png" alt="ai leader" />
          </div>
        </div>
      </section>
      <section id="product" className={s.product}>
        <div className="flex flex-col gap-4">
          <h2>LeadPersona Browser Extension</h2>
          <h4>Your Personalized AI Leader For Business Outreach</h4>
        </div>
        <Laptop />
        <Button variant="filled" className="bg-accent" icon={FaExternalLinkAlt}>
          View In Store
        </Button>
      </section>
      <section id="faqs" className={s.faqs}>
        <div className={s.blTriangle}></div>
        <div className={s.trTriangle}></div>
        <h2>Frequently Asked Questions</h2>
        <Accordion panel={faqList} />
        <Button
          variant="filled"
          className="bg-accent"
          onClick={() => window.location.assign('/pricing')}
        >
          Learn More
        </Button>
      </section>
      <section id="contact" className={s.contact}>
        <h2 className="text-center">Get In Contact With Us</h2>
        <ContactForm />
      </section>
    </>
  )
}

export default Page
