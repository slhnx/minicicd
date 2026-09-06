import Link from "next/link"
import { GitBranch } from "lucide-react"

import { GitHubIcon } from "@/components/dashboard/github/github-icon"
import type { Project } from "@/lib/types/repository"
import { cn } from "@/lib/utils"

export function ProjectListRow({
  project,
  className,
}: {
  project: Project
  className?: string
}) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn(
        "flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/30",
        className,
      )}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
        <GitHubIcon className="size-4 text-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          {project.name}
        </p>
        <p className="truncate font-mono text-xs text-muted-foreground">
          {project.fullName}
        </p>
      </div>
      <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
        <GitBranch className="size-3.5" />
        <span className="font-mono">{project.defaultBranch}</span>
      </div>
      <p className="hidden shrink-0 text-xs text-muted-foreground md:block">
        {new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
        }).format(new Date(project.createdAt))}
      </p>
    </Link>
  )
}
