import type { ReactNode } from "react"

export const SectionTitle = ({
  icon,
  children,
}: {
  icon?: ReactNode
  children: ReactNode
}) => (
  <div className="flex items-center gap-2 mb-4">
    {icon}
    <h3 className="text-xl font-semibold">{children}</h3>
  </div>
)

export const Card = ({
  children,
  className = "",
  highlight = false,
}: {
  children: ReactNode
  className?: string
  highlight?: boolean
}) => (
  <div
    className={`${
      highlight ? "border-l-4 border-emerald-500" : ""
    } bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow rounded-none ${className}`}
  >
    {children}
  </div>
) 