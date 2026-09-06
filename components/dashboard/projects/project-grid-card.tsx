import Link from "next/link"
import { GitBranch } from "lucide-react"

import { GitHubIcon } from "@/components/dashboard/github/github-icon"
import type { Project } from "@/lib/types/repository"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ProjectGridCard({
  project,
  className,
}: {
  project: Project
  className?: string
}) {
  return (
    <Link href={`/projects/${project.id}`} className={cn("block", className)}>
      <Card className="h-full shadow-none transition-colors hover:bg-muted/30">
        <CardHeader className="border-b">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
              <GitHubIcon className="size-4 text-foreground" />
            </div>
            <div className="min-w-0 space-y-1">
              <CardTitle className="truncate font-normal">
                {project.name}
              </CardTitle>
              <CardDescription className="truncate font-mono text-xs">
                {project.fullName}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <GitBranch className="size-3.5 shrink-0" />
            <span className="font-mono text-foreground">
              {project.defaultBranch}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Added{" "}
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: "medium",
            }).format(new Date(project.createdAt))}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
