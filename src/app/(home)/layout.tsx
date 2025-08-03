import { type ReactNode } from 'react'

import type { Category } from '$/multitenant-ecommerce-cms/src/payload-types';

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SearchFilters } from '@/components/search-filters'
import { ContentFetcher } from '@/lib/content'

async function Layout({ children }: { children: ReactNode }) {

  const data = await new ContentFetcher().fetchCategories();
  const formattedData = data.docs.map((doc: Category) => ({
    ...doc,
    subcategories: doc.subcategories
      ? doc.subcategories.docs?.map((sub) =>
        typeof sub === 'object' && sub !== null ? { ...sub } : sub
      )
      : [],
  }));

  return (
    <div className='flex flex-col min-h-screen mx-auto max-w-screen-3xl'>
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">

        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout