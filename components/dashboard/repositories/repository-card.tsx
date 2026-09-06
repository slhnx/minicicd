import { GitBranch, Lock, Globe } from "lucide-react"

import { BuildStatusBadge } from "@/components/dashboard/build-status-badge"
import type { MockRepository } from "@/lib/mocks/repositories"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function RepositoryCard({
  repository,
  className,
}: {
  repository: MockRepository
  className?: string
}) {
  const VisibilityIcon =
    repository.visibility === "private" ? Lock : Globe

  return (
    <Card
      className={cn(
        "shadow-none transition-colors hover:bg-muted/30",
        className
      )}
    >
      <CardHeader className="border-b">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
              <GitBranch className="size-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="font-normal">{repository.name}</CardTitle>
                <Badge variant="outline" className="gap-1">
                  <VisibilityIcon className="size-3" aria-hidden />
                  {repository.visibility === "private" ? "Private" : "Public"}
                </Badge>
              </div>
              <CardDescription className="font-mono text-xs">
                {repository.url}
              </CardDescription>
            </div>
          </div>
          <BuildStatusBadge status={repository.lastBuildStatus} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {repository.description}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>
            Branch:{" "}
            <span className="font-mono text-foreground">
              {repository.defaultBranch}
            </span>
          </span>
          <span>
            Last build:{" "}
            <span className="text-foreground">{repository.lastBuildAt}</span>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
