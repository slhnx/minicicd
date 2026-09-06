"use client"

import { useState } from "react"
import { LayoutGrid, List } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { ProjectGridCard } from "@/components/dashboard/projects/project-grid-card"
import { ProjectListRow } from "@/components/dashboard/projects/project-list-row"
import { ProjectsEmptyState } from "@/components/dashboard/projects/projects-empty-state"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useTRPC } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"

type ProjectsView = "grid" | "list"

function ProjectsSkeleton({ view }: { view: ProjectsView }) {
  if (view === "list") {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-44 w-full rounded-xl" />
      ))}
    </div>
  )
}

export function ProjectsSection() {
  const trpc = useTRPC()
  const [view, setView] = useState<ProjectsView>("grid")

  const projectsQuery = useQuery(trpc.project.list.queryOptions(undefined))

  if (projectsQuery.isPending) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
        <ProjectsSkeleton view={view} />
      </div>
    )
  }

  if (projectsQuery.isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load projects. Please try again.
        </AlertDescription>
      </Alert>
    )
  }

  const projects = projectsQuery.data.projects

  if (projects.length === 0) {
    return <ProjectsEmptyState />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {projects.length} project{projects.length === 1 ? "" : "s"}
        </p>
        <div className="flex items-center rounded-lg border border-border p-0.5">
          <Button
            type="button"
            size="sm"
            variant={view === "grid" ? "secondary" : "ghost"}
            className={cn("h-7 px-2.5", view === "grid" && "shadow-none")}
            onClick={() => setView("grid")}
            aria-pressed={view === "grid"}
            aria-label="Grid view"
          >
            <LayoutGrid className="size-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={view === "list" ? "secondary" : "ghost"}
            className={cn("h-7 px-2.5", view === "list" && "shadow-none")}
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            aria-label="List view"
          >
            <List className="size-4" />
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectGridCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <ProjectListRow key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
