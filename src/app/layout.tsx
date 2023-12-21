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
        <Header/>
        <section>
          {children}
        </section>
      </body>
    </html>
  )
}
