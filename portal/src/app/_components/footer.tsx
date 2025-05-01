import Link from "next/link"

import { Separator } from "@/components/ui/separator"
import Image from "next/image";




const links = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];


const menuLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
];

const aboutLinks = [
  { label: "About Us", href: "/features-section" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];


export default function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto   max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          <div>
            <div className="flex items-center space-x-2 mb-6">
               <Image src="/mainLogo.png" alt="banner" width={50} height={50}></Image>
            </div>
            <p className="text-muted-foreground">AI-powered lesson planning for modern educators.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
  {menuLinks.map((item) => (
    <li key={item.label}>
     <a href={item.href} className="text-muted-foreground hover:text-foreground transition">
        {item.label}
      </a>
    </li>
  ))}
</ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
  {aboutLinks.map((item) => (
    <li key={item.label}>
      <a href={item.href} className="text-muted-foreground hover:text-foreground transition">
        {item.label}
      </a>
    </li>
  ))}
</ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {links.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-muted-foreground hover:text-foreground transition">
        {item.label}
      </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground">© 2025 ClassPlanner. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Twitter", "LinkedIn", "Facebook", "Instagram"].map((item) => (
              <Link key={item} href="#" className="text-muted-foreground hover:text-foreground transition">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
