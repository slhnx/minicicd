"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  mainNavItems,
  secondaryNavItems,
  type DashboardNavItem,
} from "@/components/dashboard/sidebar-nav-items"
import { useDashboard } from "@/components/dashboard/dashboard-provider"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function NavLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: DashboardNavItem
  collapsed: boolean
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const isActive =
    item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(item.href)

  const link = (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground",
        collapsed && "justify-center px-2"
      )}
    >
      <item.icon className="size-4 shrink-0" aria-hidden />
      {!collapsed && <span className="truncate">{item.title}</span>}
    </Link>
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger render={link} />
        <TooltipContent side="right">{item.title}</TooltipContent>
      </Tooltip>
    )
  }

  return link
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { collapsed } = useDashboard()

  return (
    <nav className="flex flex-1 flex-col gap-6 px-2">
      <div className="space-y-1">
        {!collapsed && (
          <p className="px-2.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Main
          </p>
        )}
        <div className="space-y-0.5">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>

      <div className="space-y-1">
        {!collapsed && (
          <p className="px-2.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Other
          </p>
        )}
        <div className="space-y-0.5">
          {secondaryNavItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}
