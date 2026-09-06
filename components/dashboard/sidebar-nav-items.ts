import type { LucideIcon } from "lucide-react"
import {
  Hammer,
  LayoutDashboard,
  Settings,
  GitBranch,
} from "lucide-react"

export type DashboardNavItem = {
  title: string
  href: string
  icon: LucideIcon
}

export const mainNavItems: DashboardNavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Repositories",
    href: "/dashboard/repositories",
    icon: GitBranch,
  },
  {
    title: "Builds",
    href: "/dashboard/builds",
    icon: Hammer,
  },
]

export const secondaryNavItems: DashboardNavItem[] = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]
