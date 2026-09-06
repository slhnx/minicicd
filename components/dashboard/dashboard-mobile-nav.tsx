"use client"

import { Menu } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { SidebarUser } from "@/components/dashboard/sidebar-user"
import { useDashboard } from "@/components/dashboard/dashboard-provider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

export function DashboardMobileNav() {
  const { mobileOpen, setMobileOpen } = useDashboard()

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-label="Open navigation menu"
          />
        }
      >
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b border-border px-4 py-4 text-left">
          <Logo href="/dashboard" wordmarkClassName="text-sm" />
        </SheetHeader>
        <div className="flex flex-1 flex-col py-4">
          <SidebarNav onNavigate={() => setMobileOpen(false)} />
        </div>
        <Separator />
        <div className="p-2">
          <SidebarUser />
        </div>
      </SheetContent>
    </Sheet>
  )
}
