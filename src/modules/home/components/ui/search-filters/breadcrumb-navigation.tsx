import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import React from 'react'

function BreadcrumbNavigation({ activeCategory, activeCategoryName, activeSubcategoryName }: { activeCategoryName: string | null, activeCategory: string | null, activeSubcategoryName: string | null }) {
  if (!activeCategoryName || activeCategory === 'all')
    return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {activeSubcategoryName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className='text-xl font-medium underline text-primary'>
                <Link href={`/${activeCategory}`}>
                  {activeCategoryName}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='text-primary font-medium text-xl'>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className='text-xl font-medium'>
                <BreadcrumbPage className='text-xl font-medium'>
                  {activeSubcategoryName}
                </BreadcrumbPage>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbLink asChild className='text-xl font-medium'>
              <BreadcrumbPage className='text-xl font-medium'>
                {activeCategoryName}
              </BreadcrumbPage>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { BreadcrumbNavigation }