"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, GitBranch, Hammer } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useTRPC } from "@/lib/trpc/client"

function ProjectPageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  )
}

export function ProjectPageContent({ projectId }: { projectId: string }) {
  const trpc = useTRPC()

  const projectQuery = useQuery(
    trpc.project.getById.queryOptions({ id: projectId }),
  )

  if (projectQuery.isPending) {
    return <ProjectPageSkeleton />
  }

  if (projectQuery.isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {projectQuery.error.message || "Failed to load project."}
        </AlertDescription>
      </Alert>
    )
  }

  const { project } = projectQuery.data
  const githubUrl =
    project.fullName.startsWith("http")
      ? project.fullName
      : `https://github.com/${project.fullName}`

  return (
    <div className="space-y-8">
      <DashboardHeader
        title={project.name}
        description={`Connected to ${project.fullName}`}
      >
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/dashboard" />}
        >
          <ArrowLeft />
          Back to dashboard
        </Button>
      </DashboardHeader>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="font-normal">Repository</CardTitle>
            <CardDescription>
              GitHub repository details for this project.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Full name</p>
              <p className="font-mono text-foreground">{project.fullName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Repository URL</p>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-foreground underline-offset-4 hover:underline"
              >
                {githubUrl.replace("https://", "")}
                <ExternalLink className="size-3.5" />
              </a>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Default branch</p>
              <div className="flex items-center gap-2">
                <GitBranch className="size-4 text-muted-foreground" />
                <span className="font-mono text-foreground">
                  {project.defaultBranch}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Created</p>
              <p className="text-foreground">
                {new Intl.DateTimeFormat(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(project.createdAt))}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="font-normal">
                  Build configuration
                </CardTitle>
                <CardDescription>
                  Pipeline settings will be configured here in a later phase.
                </CardDescription>
              </div>
              <Badge variant="secondary">Coming soon</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-dashed border-border bg-muted/20 px-4 py-8 text-center">
              <p className="text-sm text-muted-foreground">
                No pipeline configuration yet. Build execution, workers, and
                Docker support will be added in upcoming phases.
              </p>
            </div>
            <Button disabled className="w-full sm:w-auto">
              <Hammer />
              Build Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
