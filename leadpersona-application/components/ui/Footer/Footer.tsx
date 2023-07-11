'use client'

import { Footer } from 'flowbite-react'

export default function FooterComponent() {
  return (
    <Footer container bgDark>
      <div className="w-full text-center">
        <div className="flex items-center justify-between w-full">
          <Footer.Brand alt="Flowbite Logo" href="/" src="/favicon.ico" />
          <Footer.LinkGroup>
            <Footer.Link href="/privacy-policy">Privacy Policy</Footer.Link>
            <Footer.Link href="/terms-and-conditions">
              Terms & Conditions
            </Footer.Link>
            <Footer.Link href="/cookie-policy">Cookie Policy</Footer.Link>
            <Footer.Link href="/contact-us">Contact Us</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Copyright
          by="LeadPersona | Your AI Leader"
          href="#"
          year={2023}
        />
      </div>
    </Footer>
  )
}
