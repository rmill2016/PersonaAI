import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="text-white font-thin flex flex-col items-center justify-center w-full h-full">
      <p>&copy; 2023 LeadPersona | Your AI Leader</p>
      <div>
        <a
          href="https://leadpersona.io/terms_conditions"
          className="hover-underline"
        >
          Terms & Conditions
        </a>{' '}
        |{' '}
        <a href="https://leadpersona.io/privacy" className="hover-underline">
          Privacy
        </a>{' '}
        |{' '}
        <a href="https://leadpersona.io/contact" className="hover-underline">
          Contact Us
        </a>
      </div>
    </footer>
  )
}

export default Footer
