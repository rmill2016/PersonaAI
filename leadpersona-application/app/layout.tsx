import SupabaseProvider from './supabase-provider'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import { PropsWithChildren } from 'react'
import Script from 'next/script'

import './main.css'

const meta = {
  title: 'LeadPersona',
  description: 'Your AI Leader For Business Outreach',
  cardImage: '/Logo.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: 'https://leadpersona-application-git-dev-rmill2016.vercel.app/',
  type: 'website'
}

export const metadata = {
  title: meta.title,
  description: meta.description,
  cardImage: meta.cardImage,
  robots: meta.robots,
  favicon: meta.favicon,
  url: meta.url,
  type: meta.type,
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage,
    type: meta.type,
    site_name: meta.title
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vercel',
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage
  }
}

export default function RootLayout({ children }: PropsWithChildren) {
  const options = {}
  return (
    <html lang="en">
      <body className="loading">
        <SupabaseProvider>
          {/* @ts-expect-error */}
          <Navbar />
          <main id="skip">{children}</main>
          <Footer />
        </SupabaseProvider>
      </body>
      <script src="node_modules/flowbite/dist/flowbite.min.js"></script>
    </html>
  )
}
