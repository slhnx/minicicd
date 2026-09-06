import type { Repository } from "@/lib/types/repository"

import { RepositoryList } from "@/components/dashboard/repositories/repository-list"

export function GitHubConnectedState({
  repositories,
  isLoading = false,
  accountLogin,
}: {
  repositories: Repository[]
  isLoading?: boolean
  accountLogin?: string
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-normal text-foreground">Repositories</h2>
        <p className="text-sm text-muted-foreground">
          {accountLogin
            ? `Repositories accessible to ${accountLogin}`
            : "Your connected GitHub repositories"}
        </p>
      </div>

      <RepositoryList
        repositories={repositories}
        isLoading={isLoading}
        emptyTitle="No repositories found"
        emptyDescription="Your GitHub account is connected, but no repositories were selected yet."
      />
    </div>
  )
}
