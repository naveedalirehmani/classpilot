"use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode, useState } from "react";

enum Routes {
  HOME = "/",
  RECENT = "/recent",
  RESOURCES = "/resources",
  DOCUMENTS = "/resources/documents",
  VIDEOS = "/resources/videos",
}

interface SidebarLink {
  href: Routes;
  label: string;
  icon: string;
  children?: SidebarLink[];
}

const sidebarLinks: SidebarLink[] = [
  { href: Routes.HOME, label: "Home", icon: "/icons/home.svg" },
  { href: Routes.RECENT, label: "Recent", icon: "/icons/clock.svg" },
  {
    href: Routes.RESOURCES,
    label: "My Resources",
    icon: "/icons/file.svg",
    children: [
      { href: Routes.DOCUMENTS, label: "Documents", icon: "/icons/doc.svg" },
      { href: Routes.VIDEOS, label: "Videos", icon: "/icons/video.svg" },
    ],
  },
];

interface SidebarItemProps {
  href?: Routes;
  icon: string;
  children: ReactNode;
  hasChildren?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, children, hasChildren, isOpen, onToggle }) => {
  return (
    <div>
      {hasChildren ? (
        <button
          onClick={onToggle}
          className="flex w-full items-center gap-4 px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
        >
          <Image src={icon} alt={children?.toString() || "icon"} width={18} height={18} />
          <span className="flex-1">{children}</span>
          <span className={`transition-transform ${isOpen ? "rotate-90" : ""}`}>▼</span>
        </button>
      ) : (
        <Link
          href={href as Routes}
          className="flex items-center gap-4 px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
        >
          <Image src={icon} alt={children?.toString() || "icon"} width={18} height={18} />
          {children}
        </Link>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [openMenus, setOpenMenus] = useState<Record<Routes, boolean>>({});

  const toggleMenu = (route: Routes) => {
    setOpenMenus((prev) => ({ ...prev, [route]: !prev[route] }));
  };

  return (
    <aside className="w-80 bg-gray-100 p-4 border-r shadow-md">
      <nav className="space-y-2 flex-1">
        {sidebarLinks.map(({ href, label, icon, children }) => (
          <div key={href}>
            <SidebarItem
              href={!children ? href : undefined} // Make it undefined if it has children
              icon={icon}
              hasChildren={!!children}
              isOpen={!!openMenus[href]}
              onToggle={() => children && toggleMenu(href)}
            >
              {label}
            </SidebarItem>
            {children && openMenus[href] && (
              <div className="ml-6 mt-1 space-y-1">
                {children.map(({ href, label, icon }) => (
                  <SidebarItem key={href} href={href} icon={icon}>
                    {label}
                  </SidebarItem>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;