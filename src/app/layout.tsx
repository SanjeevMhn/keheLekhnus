import type { Metadata } from 'next'
import { Inter, Lobster } from 'next/font/google'
import './globals.css'
import Header from './(components)/Header'
import ReduxProvider from './(components)/redux-provider'

const inter = Inter({ subsets: ['latin'] })
export const lobster = Lobster({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lobster'
})

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
          <section className='main-wrapper py-8'>
            <ReduxProvider>
              {children}
            </ReduxProvider>
          </section>
        </main>
      </body>
    </html>
  )
}
