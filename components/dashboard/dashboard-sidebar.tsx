"use client"

import Link from "next/link"

import { SidebarCollapseButton } from "@/components/dashboard/sidebar-collapse-button"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { SidebarUser } from "@/components/dashboard/sidebar-user"
import { useDashboard } from "@/components/dashboard/dashboard-provider"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export function DashboardSidebar({ className }: { className?: string }) {
  const { collapsed } = useDashboard()

  return (
    <aside
      className={cn(
        "hidden h-full shrink-0 flex-col border-r border-border bg-card transition-[width] duration-200 ease-in-out md:flex",
        collapsed ? "w-16" : "w-60",
        className
      )}
    >
      <div
        className={cn(
          "flex h-14 items-center border-b border-border px-3",
          collapsed ? "justify-center" : "justify-between gap-2"
        )}
      >
        <Link
          href="/dashboard"
          className={cn(
            "font-medium tracking-tight text-foreground transition-colors hover:text-foreground/80",
            collapsed ? "text-xs" : "text-sm"
          )}
        >
          {collapsed ? "MC" : "MiniCI/CD"}
        </Link>
        {!collapsed && <SidebarCollapseButton />}
      </div>

      {collapsed && (
        <div className="flex justify-center border-b border-border py-2">
          <SidebarCollapseButton />
        </div>
      )}

      <div className="flex flex-1 flex-col py-4">
        <SidebarNav />
      </div>

      <Separator />

      <div className="p-2">
        <SidebarUser />
      </div>
    </aside>
  )
}
