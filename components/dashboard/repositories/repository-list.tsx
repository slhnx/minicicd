import type { Repository } from "@/lib/types/repository"

import { RepositoryCard } from "@/components/dashboard/repositories/repository-card"
import {
  RepositoryEmptyState,
  RepositorySkeletonList,
} from "@/components/dashboard/repositories/repository-list-states"

export function RepositoryList({
  repositories,
  isLoading = false,
  emptyTitle,
  emptyDescription,
}: {
  repositories: Repository[]
  isLoading?: boolean
  emptyTitle?: string
  emptyDescription?: string
}) {
  if (isLoading) {
    return <RepositorySkeletonList />
  }

  if (repositories.length === 0) {
    return (
      <RepositoryEmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
    )
  }

  return (
    <div className="space-y-3">
      {repositories.map((repository) => (
        <RepositoryCard key={repository.id} repository={repository} />
      ))}
    </div>
  )
}
