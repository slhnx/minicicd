"use client"

import { Logo } from "@/components/brand/logo"
import { DashboardMobileNav } from "@/components/dashboard/dashboard-mobile-nav"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardProvider } from "@/components/dashboard/dashboard-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <TooltipProvider delay={0}>
        <div className="flex h-svh overflow-hidden bg-background">
          <DashboardSidebar />
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4 md:hidden">
              <DashboardMobileNav />
              <Logo
                href="/dashboard"
                showWordmark
                className="md:hidden"
                wordmarkClassName="text-sm"
                iconClassName="size-7"
              />
            </div>
            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </DashboardProvider>
  )
}
