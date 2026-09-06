import { Settings } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Settings"
        description="Configure your account, integrations, and workspace preferences."
      />
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-20 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-lg border border-border bg-background">
          <Settings className="size-5 text-muted-foreground" />
        </div>
        <h2 className="text-base font-medium text-foreground">
          Settings coming soon
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Account and integration settings will be available in a future phase.
        </p>
      </div>
    </div>
  )
}
