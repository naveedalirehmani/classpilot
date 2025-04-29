'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "@/lib/routes";

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`w-full h-16 border-b border-gray-200 bg-white fixed top-0 z-50 transition-all duration-200 ${
      scrolled ? 'shadow-md' : ''
    }`}>
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="font-bold text-white">T</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              Class Planner
            </span>
          </Link>

          {isHomePage && (
            <div className="hidden md:flex items-center space-x-6">
              <a 
                href="#features"
                className="text-gray-600 hover:text-gray-900"
                onClick={(e) => scrollToSection(e, '#features')}
              >
                Features
              </a>
              <a
                href="#demo"
                className="text-gray-600 hover:text-gray-900"
                onClick={(e) => scrollToSection(e, '#demo')}
              >
                How it works
              </a>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost">
            <Link href={ROUTES.SIGNIN}>Log in</Link>
          </Button>
          <Button asChild>
            <Link href={ROUTES.SIGNUP}>Sign up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
