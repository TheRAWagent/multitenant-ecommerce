import { type ReactNode } from 'react'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className="flex-1 bg-[#F4F4F0]">

      {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout