"use client";

import type React from "react";

import { Plus, Menu, Search, Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "src/lib/routes";
import { useSignOut } from "src/hooks/auth/auth.hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserStore } from "@/store/user.store";
import Image from "next/image";

export function Navbar() {
  const [isScrolled] = useState(false);
  const { mutate: signOutMutation } = useSignOut();

  const { user } = useUserStore();

  // Add scroll event listener when component mounts (in a real implementation)
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 10);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo & Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center">
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="/classpilot.png"
                    alt="logo"
                    width={100}
                    height={100}
                  ></Image>
                </Link>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          {/* <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/" active>
              Home
            </NavLink>
            <NavLink href="/recent">Recent</NavLink>
            <NavLink href="/resources">Resources</NavLink>
            <NavLink href="/community">Community</NavLink>
          </nav> */}

          {/* Right: Actions & Profile */}
          <div className="flex items-center space-x-3">
            {/* Search Input */}
            <div className="relative hidden sm:flex items-center">
              <Search className="absolute left-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-500 hover:text-slate-900 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full"></span>
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Create New Button */}
            <Link href={ROUTES.DASHBOARD_CREATE}>
              <Button className="hidden sm:flex hover:bg-emerald-600 text-white">
                <Plus className="mr-1 h-4 w-4" />
                Create
              </Button>
            </Link>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8 border border-slate-200">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="Moeez Ali"
                    />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      {user?.name.split("")[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={ROUTES.PROFILE}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href={ROUTES.SETTINGS}>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>My Resources</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOutMutation()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-slate-500"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Access quick navigation and actions
                  </SheetDescription>
                </SheetHeader>

                <div className="grid gap-4 py-4">
                  <nav className="flex flex-col space-y-4">
                    <MobileNavLink href="/" active>
                      Home
                    </MobileNavLink>
                    <MobileNavLink href="/recent">Recent</MobileNavLink>

                    <div className="pt-2">
                      <h3 className="font-medium text-sm text-slate-500 mb-2">
                        Resources
                      </h3>
                      <div className="space-y-3 pl-2">
                        <MobileNavLink href="/resources/documents">
                          Documents
                        </MobileNavLink>
                        <MobileNavLink href="/resources/videos">
                          Videos
                        </MobileNavLink>
                        <MobileNavLink href="/resources/templates">
                          Templates
                        </MobileNavLink>
                      </div>
                    </div>

                    <MobileNavLink href="/community">Community</MobileNavLink>
                  </nav>
                </div>

                <SheetFooter>
                  <SheetClose asChild>
                    <Button className="w-full text-white">
                      <Plus className="mr-1 h-4 w-4" />
                      Create New
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

// // Desktop Navigation Link Component
// function NavLink({
//   href,
//   active,
//   children,
// }: {
//   href: string;
//   active?: boolean;
//   children: React.ReactNode;
// }) {
//   return (
//     <Link
//       href={href}
//       className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
//         active
//           ? "text-emerald-700"
//           : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
//       }`}
//     >
//       {children}
//       {active && (
//         <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 rounded-full" />
//       )}
//     </Link>
//   );
// }

// Mobile Navigation Link Component
function MobileNavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-2 py-2 rounded-md text-base transition-colors ${
        active
          ? "text-emerald-700 font-medium"
          : "text-slate-700 hover:text-emerald-600"
      }`}
    >
      {children}
    </Link>
  );
}
