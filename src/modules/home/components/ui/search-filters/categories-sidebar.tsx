import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Category } from '$/multitenant-ecommerce-cms/src/payload-types'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area';

export function CategoriesSiedbar({ onOpenChange, open, data }: { open: boolean, onOpenChange: (open: boolean) => void, data: Category[] }) {//Todo: Convert this to server component
  const router = useRouter();

  const [parentCategories, setParentCategories] = useState<Category[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // If we have parent categories, show those, otherware show root categories
  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    setParentCategories(null);
    setSelectedCategory(null);
    onOpenChange(open);
  };

  const handleCategoryClick = (category: Category) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as Category[]);
      setSelectedCategory(category);
    } else {
      // If it's a leaf category, navigate to the category page
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        // This is a root , navigate to the category page directly
        if (category.slug === "all") {
          router.push('/');
        } else {
          router.push(`/${category.slug}`);
        }
      }
      handleOpenChange(false);
    }
  };

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  };

  const backgroundColor = selectedCategory?.color || 'white';

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side='left' className='p-0 transition-none' style={{ backgroundColor }}>
        <SheetHeader className='p-4 border-b'>
          <SheetTitle>
            Categories
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className='flex flex-col overflow-y-auto h-full pb-2'>
          {parentCategories && (
            <button onClick={handleBackClick} className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'>
              <ChevronLeftIcon className='size-4 mr-2' />
              Back
            </button>
          )}
          {currentCategories.map((category: Category) => (
            <button onClick={() => handleCategoryClick(category)} key={category.slug} className='w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer'>
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className='size-4' />
              )}

            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
