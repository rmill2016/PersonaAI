'use client'

import React from 'react'
import s from './page.module.css'
import Button from '@/components/ui/Button/Button'
import { FaBox, FaEdit, FaExternalLinkAlt } from 'react-icons/fa'
import Laptop from '@/components/scroll/laptop'
import Lenis from '@studio-freight/lenis'
import Accordion from '@/components/ui/Accordion/Accordion'

const faqList: Array<{ question: string; answer: string }> = [
  {
    question: 'Why Choose LeadPersona Over Competitors?',
    answer: 'because...'
  },
  {
    question: 'Why Choose LeadPersona Over Competitors?',
    answer: 'because...'
  },
  {
    question: 'Why Choose LeadPersona Over Competitors?',
    answer: 'because...'
  },
  {
    question: 'Why Choose LeadPersona Over Competitors?',
    answer: 'because...'
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
        <ul className={s.faqsList}>
          {faqList.map((faq, index) => (
            <Accordion
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </ul>
      </section>
      <section id="contact"></section>
    </>
  )
}

export default Page
