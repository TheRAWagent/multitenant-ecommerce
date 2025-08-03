import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

function SearchInput({disabled = false}:{disabled?: boolean}) {
  return (
    <div className='flex items-center gap-2 w-full'>
      <div className='relative w-full'>
        <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500' />
        <Input disabled={disabled} className='pl-8' placeholder='Search Products' />
      </div>
      {/* Todo: Add Categories View all button */}
      {/* Todo: Add Categories Library button */}
    </div>
  )
}

export default SearchInput