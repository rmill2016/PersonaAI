'use client'

import Button from '@/components/ui/Button'
import React from 'react'
import s from './page.module.css'
import Laptop from '@/components/scroll/laptop'
import Dropdown from '@/components/ui/Dropdown'
import { FaBox } from 'react-icons/fa'
import { LuEdit } from 'react-icons/lu'
import { FiExternalLink } from 'react-icons/fi'

type Props = {}

const Homepage = (props: Props) => {
  return (
    <>
      <section id="homepage">
        <div className={s.root}>
          <img
            src="/home_bg.jpg"
            alt="city skyline"
            className={s.homeBackground}
          />
          <h1 className={s.headline}>
            LeadPersona | <span>Your AI Leader</span>
          </h1>
          <div className={s.description}>
            <h2>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
              tenetur?
            </h2>
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis, ipsa.
            </h4>
            <div className={s.buttons}>
              <Button
                variant="filled"
                icon={FaBox}
                onClick={() => location.assign('#product')}
              >
                Demo
              </Button>
              <Button
                variant="outline"
                icon={LuEdit}
                onClick={() => location.assign('/signin')}
              >
                Signup
              </Button>
            </div>
          </div>
          <img src="/home_1.png" alt="aileader" className={s.homeImage} />
        </div>
      </section>
      <section id="product">
        <div className={s.root}>
          <div className={s.headlineLaptop}>
            <h2>LeadPersona Browser Extension</h2>
            <h4>Your Personalized AI Leader for Business Outreach</h4>
          </div>
          <Laptop />
          <Button
            variant="filled"
            className="bg-accent self-center"
            icon={FiExternalLink}
            onClick={() =>
              location.assign(
                'https://chrome.google.com/webstore/search/leadpersona'
              )
            }
          >
            View In Store
          </Button>
        </div>
      </section>
      <section>
        <div>
          <h2 className="text-center">Frequently Asked Questions</h2>
          <ul>
            <Dropdown />
            <Dropdown />
            <Dropdown />
            <Dropdown />
          </ul>
          <Button variant="filled" className="bg-accent">
            Learn More
          </Button>
        </div>
      </section>
    </>
  )
}

export default Homepage
