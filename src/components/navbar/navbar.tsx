"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Left Section: Logo & Mobile Menu Button */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Teacher planning illustration"
            width={190}
            height={32}
            className="w-auto h-auto"
          />
        </Link>
      </div>

      {/* Center Section: Navigation (Hidden on Mobile) */}
      <nav className="hidden md:flex space-x-6 text-gray-700 text-lg">
        <Link href="/" className="hover:text-gray-900 font-medium">
          Home
        </Link>
        {/* Add more navigation links if needed */}
      </nav>

      {/* Right Section: Create Button & Profile */}
      <div className="flex items-center gap-4">
        {/* Create New Button (Hidden on Mobile) */}
        <Button className="hidden md:flex bg-blue-500 hover:bg-blue-600 font-semibold px-4 py-2">
          <Image src="/icons/stairs.svg" alt="Create New" width={15} height={15} className="mr-1" />
          Create new
        </Button>

        {/* User Avatar */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-[#C5D5F5] text-white flex items-center justify-center rounded-full">
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-block font-medium">Moeez Ali</span>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 flex flex-col space-y-4 md:hidden">
          <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
            Home
          </Link>
          {/* Add more mobile menu links here */}
        </div>
      )}
    </header>
  );
}