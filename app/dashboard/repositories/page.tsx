import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { GitHubConnectedState } from "@/components/dashboard/github/github-connected-state"
import { mockRepositories } from "@/lib/mocks/repositories"

export default function RepositoriesPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Repositories"
        description="Manage connected GitHub repositories and pipeline settings."
      />
      <GitHubConnectedState repositories={mockRepositories} />
    </div>
  )
}
