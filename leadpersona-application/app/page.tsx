'use client'

import React from 'react'
import s from './page.module.css'
import Button from '@/components/ui/Button/Button'
import { FaBox, FaEdit, FaExternalLinkAlt } from 'react-icons/fa'
import Laptop from '@/components/scroll/laptop'
import Lenis from '@studio-freight/lenis'

const faqList: Array<{ title: string; description: string }> = [
  {
    title: 'Why Choose LeadPersona Over Competitors?',
    description: 'because...'
  },
  {
    title: 'Why Choose LeadPersona Over Competitors?',
    description: 'because...'
  },
  {
    title: 'Why Choose LeadPersona Over Competitors?',
    description: 'because...'
  },
  {
    title: 'Why Choose LeadPersona Over Competitors?',
    description: 'because...'
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
            <li key={index}>
              <div className="max-w-lg mx-auto">
                <Button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                  type="button"
                  data-dropdown-toggle="dropdown"
                >
                  Dropdown button{' '}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </Button>

                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
                  id="dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm">Bonnie Green</span>
                    <span className="block text-sm font-medium text-gray-900 truncate">
                      name@flowbite.com
                    </span>
                  </div>
                  <ul className="py-1" aria-labelledby="dropdown">
                    <li>
                      <a
                        href="#"
                        className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>

                <p className="mt-5">
                  This dropdown element is part of a larger, open-source library
                  of Tailwind CSS components. Learn more by going to the
                  official{' '}
                  <a
                    className="hover:underline text-blue-600"
                    href="https://flowbite.com/docs/getting-started/introduction/"
                    target="_blank"
                  >
                    Flowbite Documentation
                  </a>
                  .
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section id="contact"></section>
    </>
  )
}

export default Page
