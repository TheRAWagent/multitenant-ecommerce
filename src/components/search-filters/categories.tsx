import { Category } from '$/multitenant-ecommerce-cms/src/payload-types'

import { CategoryDropdown } from '@/components/search-filters/category-dropdown'

function Categories({ data }: { data: any }) {
  
  return (
    <div className='relative w-full'>
      <div className='flex flex-nowrap items-center'>
      {data.map((category: Category) => (
        <div key={category.id}>
        <CategoryDropdown category={category} isActive={false} isNavigationHovered={false} />
        </div>
      ))}
      </div>
    </div>
  )
}

export { Categories }