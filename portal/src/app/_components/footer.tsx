import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { ROUTES } from "@/lib/routes"

const links = [
  { label: "Terms of Service", href: ROUTES.TERMS },
  // { label: "Privacy Policy", href: "/privacy" },
  // { label: "Cookie Policy", href: "/cookies" },
];

const menuLinks = [
  // { label: "Features", href: "/features" },
  { label: "Pricing", href: ROUTES.PRICING },
  // { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: ROUTES.PUBLIC_FAQ },
];

const aboutLinks = [
  { label: "About Us", href: "/features-section" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t py-8 sm:py-12">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {/* Brand Column - Full width on mobile */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center space-x-2  sm:mb-6">
              <Image 
                src="/classpilot.png" 
                alt="Class Pilot Logo" 
                width={120} 
                height={120}
                className="w-20 h-auto sm:w-24"
              />
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">
              A Product by <Link href="https://www.kohminds.com/" target="_blank">Kohminds Technologies</Link>
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Product</h3>
            <ul className="space-y-2">
              {menuLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground transition text-sm sm:text-base">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            {/* <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Company</h3>
            <ul className="space-y-2">
              {aboutLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground transition text-sm sm:text-base">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul> */}
          </div>

          {/* Legal Links - Shown on medium screens and up */}
          <div className="hidden sm:block">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Legal</h3>
            <ul className="space-y-2">
              {links.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground transition text-sm sm:text-base">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-6 sm:my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-xs sm:text-sm text-center sm:text-left order-2 sm:order-1 mt-4 sm:mt-0">
            © 2025 Class Pilot. All rights reserved.
          </p>
          
          {/* Legal links for mobile */}
          <div className="sm:hidden w-full order-1 mb-4">
            <h3 className="font-bold text-base mb-3">Legal</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {links.map((item) => (
                <Link key={item.label} href={item.href} className="text-muted-foreground hover:text-foreground transition text-sm">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
         <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 order-3 w-full sm:w-auto">
  {[
    { name: "Twitter", link: "https://twitter.com/YourProfile" },
    { name: "LinkedIn", link: "https://www.linkedin.com/company/kohminds/posts/?feedView=all" },
    { name: "Facebook", link: "https://www.facebook.com/YourPage" },
    { name: "Instagram", link: "https://www.instagram.com/YourProfile" },
  ].map((item) => (
    <Link 
      key={item.name} 
      href={item.link} 
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground transition text-sm sm:text-base"
    >
      {item.name}
    </Link>
  ))}
</div>

        </div>
      </div>
    </footer>
  )
}