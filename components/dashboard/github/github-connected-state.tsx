import type { Repository } from "@/lib/types/repository"

import { RepositoryList } from "@/components/dashboard/repositories/repository-list"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export function GitHubConnectedState({
  repositories,
  isLoading = false,
  isError = false,
  accountLogin,
}: {
  repositories: Repository[]
  isLoading?: boolean
  isError?: boolean
  accountLogin?: string
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-normal text-foreground">Repositories</h2>
          <p className="text-sm text-muted-foreground">
            {accountLogin
              ? `Repositories accessible to ${accountLogin}`
              : "Your connected GitHub repositories"}
          </p>
        </div>
        <Badge variant="secondary" className="font-normal">
          GitHub connected
        </Badge>
      </div>

      {isError ? (
        <Alert variant="destructive">
          <AlertDescription>
            GitHub is connected, but repositories could not be loaded. Please
            try again.
          </AlertDescription>
        </Alert>
      ) : null}

      <RepositoryList
        repositories={repositories}
        isLoading={isLoading}
        emptyTitle="No repositories found"
        emptyDescription="Your GitHub account is connected, but no repositories were selected yet."
      />
    </div>
  )
}
