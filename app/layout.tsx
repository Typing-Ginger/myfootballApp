import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SearchBar from './components/searchBar/SearchBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MyFootballAPP',
  description: 'Football/Soccer Stats, Matches, Team Info App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='relative bg-black'>
          <div className='absolute top-0 left-0 w-full h-full'>
            <img
              src='/background.png'
              alt='backgroundImage'
              className='h-screen w-full object-cover'
            />
          </div>
          <div className='absolute top-0 left-0 w-full h-screen bg-gradient-to-b
                          from-black/10 to-black'/>
          <div className='relative'>
            <SearchBar />
            {children}
          </div>
        </div>

      </body>
    </html>
  )
}
