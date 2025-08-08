"use client";

import { Poppins } from "next/font/google"
import Link from "next/link"
import { type ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { NavbarSidebar } from "@/components/navbar-sidebar";
import { useUser } from "@/lib/tanstack-query/queries/use-user";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"]
});

const navbarItems = [
  { children: "Home", href: "/" },
  { children: "Features", href: "/features" },
  { children: "Pricing", href: "/pricing" },
  { children: "About", href: "/about" },
  { children: "Contact", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: user } = useUser();

  return (
    <nav className='h-20 flex border-b justify-between font-medium bg-white'>
      <Link href={"/"} className="pl-4 lg:pl-6 flex items-center">
        <span className={cn("text-3xl lg:text-5xl font-semibold", poppins.className)}>funroad</span>
      </Link>

      <NavbarSidebar open={isSidebarOpen} items={navbarItems} onOpenChange={setIsSidebarOpen} />

      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item, index) => <NavItem key={`nav-${index}`} href={item.href} isActive={item.href === "/" ? pathname === item.href : pathname.startsWith(item.href)}>{item.children}</NavItem>)}
      </div>

      {user ? (
        <div className="hidden lg:flex">
          <Button asChild className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full bg-black text-white hover:bg-pink-400 hover:text-black rounded-none transition-colors text-lg">
            <Link href={"/sign-up"}>
              Dashboard
            </Link>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <Button asChild variant={'secondary'} className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full bg-white hover:bg-pink-400 rounded-none transition-colors text-lg">
            <Link prefetch href={"/sign-in"}>
              Login
            </Link>
          </Button>
          <Button asChild className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full bg-black text-white hover:bg-pink-400 hover:text-black rounded-none transition-colors text-lg">
            <Link prefetch href={"/sign-up"}>
              Start Selling
            </Link>
          </Button>
        </div>
      )}
      <div className="flex lg:hidden items-center justify-center">
        <Button variant={'ghost'} className="size-12 border-transparent bg-white" onClick={() => setIsSidebarOpen(true)}>
          <MenuIcon />
        </Button>
      </div>
    </nav>
  )
}

function NavItem({ children, href, isActive }: { href: string, children: ReactNode, isActive?: boolean }) {
  return (
    <Button asChild variant={'outline'} className={cn("bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
      isActive && "bg-black text-white hover:bg-black hover:text-white"
    )}>
      <Link href={href}>
        {children}
      </Link>
    </Button>
  )
}
