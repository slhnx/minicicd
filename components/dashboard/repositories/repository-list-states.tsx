import { GitBranch } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function RepositorySkeleton() {
  return (
    <Card className="shadow-none">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Skeleton className="size-9 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
          <Skeleton className="h-5 w-16 rounded-4xl" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-28" />
        </div>
      </CardContent>
    </Card>
  )
}

export function RepositorySkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading repositories">
      {Array.from({ length: count }).map((_, index) => (
        <RepositorySkeleton key={index} />
      ))}
    </div>
  )
}

export function RepositoryEmptyState({
  title = "No repositories found",
  description = "No repositories are available yet. Connect GitHub and select repositories to get started.",
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-lg border border-border bg-background">
        <GitBranch className="size-5 text-muted-foreground" />
      </div>
      <h3 className="text-base font-medium text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
