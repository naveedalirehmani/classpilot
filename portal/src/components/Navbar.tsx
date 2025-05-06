"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "@/lib/routes";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav
        className={`w-full h-16 border-b border-gray-200 bg-white fixed top-0 z-50 transition-all duration-200 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/classpilot.png"
                alt="logo"
                width={100}
                height={100}
              ></Image>
            </Link>

            {isHomePage && (
              <div className="hidden md:flex items-center space-x-6">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={(e) => scrollToSection(e, "#features")}
                >
                  Features
                </a>
                <a
                  href="#demo"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={(e) => scrollToSection(e, "#demo")}
                >
                  How it works
                </a>
              </div>
            )}
          </div>

          {/* Desktop buttons - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link href={ROUTES.SIGNIN}>Log in</Link>
            </Button>
            <Button asChild>
              <Link href={ROUTES.SIGNUP}>Sign up</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center text-gray-700"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white flex items-center justify-center">
          <div className="container mx-auto px-4 pt-6 flex flex-col">
            {isHomePage && (
              <>
                <a
                  href="#features"
                  className="hover:text-gray-900 text-lg text-center"
                  onClick={(e) => scrollToSection(e, "#features")}
                >
                  Features
                </a>
              </>
            )}
            <div className="flex flex-col space-y-4 pt-4 border-gray-200">
              <Button
                asChild
                variant="ghost"
                className="justify-center w-32 mx-auto"
              >
                <Link
                  href={ROUTES.SIGNIN}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
              </Button>
              <Button asChild className="justify-center w-32 mx-auto">
                <Link
                  href={ROUTES.SIGNUP}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
