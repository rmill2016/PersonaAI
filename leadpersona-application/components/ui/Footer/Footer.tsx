import Link from 'next/link'

import Logo from '@/components/icons/Logo'
import GitHub from '@/components/icons/GitHub'

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6 bg-zinc-900">
      <div className="lg:grid-cols-12 border-zinc-600 bg-zinc-900 grid grid-cols-1 gap-8 py-12 text-white transition-colors duration-150 border-b">
        <div className="lg:col-span-2 col-span-1">
          <Link
            href="/"
            className="md:mr-24 flex items-center flex-initial font-bold"
          >
            <span className="border-zinc-700 mr-2 border rounded-full">
              <Logo />
            </span>
            <span>ACME</span>
          </Link>
        </div>
        <div className="lg:col-span-2 col-span-1">
          <ul className="md:flex-1 flex flex-col flex-initial">
            <li className="md:py-0 md:pb-4 py-3">
              <Link
                href="/"
                className="hover:text-zinc-200 text-white transition duration-150 ease-in-out"
              >
                Home
              </Link>
            </li>
            <li className="md:py-0 md:pb-4 py-3">
              <Link
                href="/"
                className="hover:text-zinc-200 text-white transition duration-150 ease-in-out"
              >
                About
              </Link>
            </li>
            <li className="md:py-0 md:pb-4 py-3">
              <Link
                href="/"
                className="hover:text-zinc-200 text-white transition duration-150 ease-in-out"
              >
                Careers
              </Link>
            </li>
            <li className="md:py-0 md:pb-4 py-3">
              <Link
                href="/"
                className="hover:text-zinc-200 text-white transition duration-150 ease-in-out"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-2 col-span-1">
          <ul className="md:flex-1 flex flex-col flex-initial">
            <li className="md:py-0 md:pb-4 py-3">
              <p className="hover:text-zinc-200 font-bold text-white transition duration-150 ease-in-out">
                LEGAL
              </p>
            </li>
            <li className="md:py-0 md:pb-4 py-3">
              <Link
                href="/"
                className="hover:text-zinc-200 text-white transition duration-150 ease-in-out"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="md:py-0 md:pb-4 py-3">
              <Link
                href="/"
                className="hover:text-zinc-200 text-white transition duration-150 ease-in-out"
              >
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="md:flex-row bg-zinc-900 flex flex-col items-center justify-between py-12 space-y-4">
        <div>
          <span>
            &copy; {new Date().getFullYear()} ACME, Inc. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
