"use client";

import type React from "react";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, MoreHorizontal, Star, ChevronRight, File, CircleHelp, CircuitBoard } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "src/lib/utils";
import { Button } from "../ui/button";
import { ROUTES } from "@/lib/routes";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/modal";

interface SidebarLink {
  href: ROUTES;
  label: string;
  icon: React.ReactNode;
  children?: SidebarLink[];
}

const sidebarLinks: SidebarLink[] = [
  {
    href: ROUTES.DASHBOARD,
    label: "Home",
    icon: <Home className="h-4 w-4" />,
  },
  {
    href: ROUTES.ALL,
    label: "All Lesson Plans",
    icon: <File className="h-4 w-4" />,
  },
  {
    href: ROUTES.KANBAN,
    label: "Track Board",
    icon: <CircuitBoard className="h-4 w-4" />,
  },
  {
    href: ROUTES.FAVORITES,
    label: "Favorites",
    icon: <Star className="h-4 w-4" />,
  },
  {
    href: ROUTES.RESOURCES,
    label: "More",
    icon: <MoreHorizontal className="h-4 w-4" />,
    children: [
      {
        href: ROUTES.FAQ,
        label: "FAQ'S",
        icon: <CircleHelp className="h-4 w-4" />,
      },
      // {
      //   href: Routes.VIDEOS,
      //   label: "Videos",
      //   icon: <Video className="h-4 w-4" />,
      // },
    ],
  },
];

interface SidebarItemProps {
  href?: ROUTES;
  icon: React.ReactNode;
  children: React.ReactNode;
  hasChildren?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  isActive?: boolean;
  isChildActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon,
  children,
  hasChildren,
  isOpen,
  onToggle,
  isActive,
  isChildActive,
}) => {
  return (
    <div>
      {hasChildren ? (
        <Button
          onClick={onToggle}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 px-3 py-2 text-sm font-medium transition-colors",
            isActive || isChildActive
              ? "text-emerald-700 bg-emerald-50"
              : "text-slate-700 hover:text-emerald-600 hover:bg-slate-50"
          )}
        >
          <span
            className={cn(
              "text-slate-500 transition-colors",
              (isActive || isChildActive) && "text-emerald-500"
            )}
          >
            {icon}
          </span>
          <span className="flex-1 text-left">{children}</span>
          <ChevronRight
            className={cn(
              "h-4 w-4 text-slate-400 transition-transform",
              isOpen && "rotate-90",
              (isActive || isChildActive) && "text-emerald-400"
            )}
          />
        </Button>
      ) : (
        <Button
          asChild
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "text-emerald-700 bg-emerald-50"
              : "text-slate-700 hover:text-emerald-600 hover:bg-slate-50"
          )}
        >
          <Link href={href as string}>
            <span
              className={cn(
                "text-slate-500 transition-colors",
                isActive && "text-emerald-500"
              )}
            >
              {icon}
            </span>
            <span className="ml-2">{children}</span>
            {isActive && (
              <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-emerald-500" />
            )}
          </Link>
        </Button>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { openModal } = useModalStore();
  // Auto-expand parent menu when child is active
  useEffect(() => {
    sidebarLinks.forEach((link) => {
      if (link.children?.some((child) => child.href === pathname)) {
        setOpenMenus((prev) => ({ ...prev, [link.href]: true }));
      }
    });
  }, [pathname]);

  const toggleMenu = (route: ROUTES) => {
    setOpenMenus((prev) => ({ ...prev, [route]: !prev[route] }));
  };

  const isActive = (href: string) => pathname === href;
  const hasActiveChild = (link: SidebarLink) =>
    link.children?.some((child) => isActive(child.href));

  return (
    <aside className="hidden md:block w-64 border-r bg-white overflow-y-auto">
      <div className="py-6 flex flex-col justify-between h-full">
        <div>
          <div className="px-6 mb-6">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Navigation
            </h2>
          </div>
          <nav className="space-y-1 px-3">
            {sidebarLinks.map(({ href, label, icon, children }) => (
              <div key={href} className="py-0.5">
                <SidebarItem
                  href={!children ? href : undefined}
                  icon={icon}
                  hasChildren={!!children}
                  isOpen={!!openMenus[href]}
                  onToggle={() => children && toggleMenu(href)}
                  isActive={isActive(href)}
                  isChildActive={hasActiveChild({
                    href,
                    label,
                    icon,
                    children,
                  })}
                >
                  {label}
                </SidebarItem>

                {children && openMenus[href] && (
                  <div className="ml-5 mt-1 space-y-1 border-l border-slate-100 pl-2">
                    {children.map(
                      ({
                        href: childHref,
                        label: childLabel,
                        icon: childIcon,
                      }) => (
                        <SidebarItem
                          key={childHref}
                          href={childHref}
                          icon={childIcon}
                          isActive={isActive(childHref)}
                        >
                          {childLabel}
                        </SidebarItem>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Pro Upgrade Banner */}
        <div className="px-4 mt-8">
          <div className="rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 p-4 border border-emerald-100">
            <h3 className="font-medium text-emerald-800 text-sm">
              Upgrade to Pro
            </h3>
            <p className="text-xs text-emerald-700 mt-1 mb-3">
              Get access to premium templates and resources.
            </p>
            <Button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs h-8"
              onClick={() => {
                openModal(ModalType.UPGRADE);
              }}
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
