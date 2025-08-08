"use client";

import { useRef, useState } from 'react'
import Link from 'next/link';

import { Category } from '$/multitenant-ecommerce-cms/src/payload-types'

import { cn } from '@/lib/utils'
import { useDropdownPosition } from '@/modules/home/components/ui/search-filters/use-dropdown-position';
import { Button } from '@/components/ui/button'
import { SubcategoryMenu } from '@/modules/home/components/ui/search-filters/subcategory-menu';

function CategoryDropdown({ category, isActive, isNavigationHovered }: { category: Category, isActive?: boolean, isNavigationHovered?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { getDropdownPosition } = useDropdownPosition(dropdownRef);

  const dropdownPosition = getDropdownPosition();

  const toggleDropdown = () => {
    if (category.subcategories?.docs?.length) {
      setIsOpen(!isOpen);
    }
  }

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={dropdownRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={toggleDropdown}>
      <div className='relative'>
        <Button asChild variant={'elevated'} className={cn("h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
          isActive && !isNavigationHovered && "bg-white border-primary",
          isOpen && "bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[4px]"
        )}>
          <Link href={category.slug === "all" ? '/' : `/${category.slug}`}>
            {category.name}
          </Link>
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div className={cn('opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2',
            isOpen && 'opacity-100'
          )} />
        )}
      </div>
      <SubcategoryMenu category={category} position={dropdownPosition} isOpen={isOpen} />
    </div>
  )
}

export { CategoryDropdown }