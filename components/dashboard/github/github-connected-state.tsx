import type { MockRepository } from "@/lib/mocks/repositories"

import { RepositoryList } from "@/components/dashboard/repositories/repository-list"
import { Button } from "@/components/ui/button"

export function GitHubConnectedState({
  repositories,
  isLoading = false,
  onDisconnect,
}: {
  repositories: MockRepository[]
  isLoading?: boolean
  onDisconnect?: () => void
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-normal text-foreground">Repositories</h2>
          <p className="text-sm text-muted-foreground">
            Your connected GitHub repositories
          </p>
        </div>
        {onDisconnect && (
          <Button variant="outline" size="sm" onClick={onDisconnect}>
            Disconnect (preview)
          </Button>
        )}
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
