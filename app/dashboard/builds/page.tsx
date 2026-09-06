import { Hammer } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function BuildsPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Builds"
        description="View build history, logs, and pipeline run status."
      />
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-20 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-lg border border-border bg-background">
          <Hammer className="size-5 text-muted-foreground" />
        </div>
        <h2 className="text-base font-medium text-foreground">
          Builds coming soon
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Pipeline runs and build logs will appear here in a future phase.
        </p>
      </div>
    </div>
  )
}
