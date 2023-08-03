import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/Toaster'
import { Analytics } from '@vercel/analytics/react';

import '@/styles/globals.css'
import Provider from '@/components/Provider'
import AutoLogoutProvider from '@/components/AutoLogoutProvider'
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Toastit',
  description: 'Simple website built with Next.js and Typescript',
}

export default function RootLayout({
  children,
  authModel,
}: {
  children: React.ReactNode
  authModel: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={cn(
        'bg-white text-slate-900 antialiased light',
        inter.className
      )}>
      <body className='min-h-screen pt-12 bg-slate-50 antialiased flex flex-col'>
        <Provider>
          <AutoLogoutProvider>
            {/* @ts-expect-error server component */}
            <Navbar />

            {authModel}

            <div className='container max-w-7xl mx-auto h-full pt-12 flex-grow'>
              {children}
            </div>
          </AutoLogoutProvider>
          </Provider>
          <Footer />
        <Toaster />        
        <Analytics />
      </body>
    </html>
  )
}