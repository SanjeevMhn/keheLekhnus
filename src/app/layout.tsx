import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './(components)/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sanu\'s Nursery',
  description: 'Buy vegetable sapling along with your every gardening need.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>
          <section className='main-wrapper p-8 p-md-11 p-lg-24'>
            {children}
          </section>
        </main>
      </body>
    </html>
  )
}
