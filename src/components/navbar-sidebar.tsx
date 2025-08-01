import Link from 'next/link'
import { type ReactNode } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

function NavbarSidebar({items, onOpenChange, open}:{open: boolean, onOpenChange: (open: boolean) => void, items: {children: ReactNode, href: string}[]}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} >
      <SheetContent side='left' className='p-0 transition-none'>
        <SheetHeader className='p-4 border-b'>
          <div className='flex items-center'>
            <SheetTitle>
              Menu
            </SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className='flex flex-col overflow-y-auto h-full pb-2'>
          {items.map((item, index) => (
            <Link key={item.href} href={item.href} onClick={() => onOpenChange(false)} className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'>
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            <Link href={"/sign-in"} onClick={() => onOpenChange(false)} className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'>
              Log in
            </Link>
            <Link href={"/sign-up"} onClick={() => onOpenChange(false)} className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'>
              Start selling
            </Link>

          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export {NavbarSidebar}