"use client";

import { ListFilterIcon, SearchIcon } from 'lucide-react'
import { useState } from 'react';

import { Category } from '$/multitenant-ecommerce-cms/src/payload-types'

import { Input } from '@/components/ui/input'
import { CategoriesSiedbar } from '@/components/search-filters/categories-sidebar'
import { Button } from '@/components/ui/button';

function SearchInput({ disabled = false, data }: { disabled?: boolean, data: Category[] }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='flex items-center gap-2 w-full'>
      <CategoriesSiedbar data={data} onOpenChange={setIsSidebarOpen} open={isSidebarOpen} />
      <div className='relative w-full'>
        <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500' />
        <Input disabled={disabled} className='pl-8' placeholder='Search Products' />
      </div>
      <Button variant={'elevated'} className='size-12 shrink-0 flex lg:hidden' onClick={() => setIsSidebarOpen(true)}>
        <ListFilterIcon />
      </Button>
      {/* Todo: Add Categories Library button */}
    </div>
  )
}

export default SearchInput