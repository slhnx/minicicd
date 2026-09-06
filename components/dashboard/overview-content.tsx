"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { Suspense } from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AddProjectDialog } from "@/components/dashboard/projects/add-project-dialog"
import { ProjectsEmptyState } from "@/components/dashboard/projects/projects-empty-state"
import { UserAvatar, UserSummary } from "@/components/dashboard/user-display"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useTRPC } from "@/lib/trpc/client"

function ProjectsBody({
  dialogOpen,
  setDialogOpen,
}: {
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
}) {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const githubStatus = searchParams.get("github")

  useEffect(() => {
    if (githubStatus !== "connected" && githubStatus !== "error") {
      return
    }

    void queryClient.invalidateQueries({
      queryKey: trpc.github.getInstallation.queryKey(),
    })

    if (githubStatus === "connected") {
      void queryClient.invalidateQueries({
        queryKey: trpc.github.listRepositories.queryKey(),
      })
      setDialogOpen(true)
      router.replace(pathname, { scroll: false })
    }
  }, [githubStatus, pathname, queryClient, router, setDialogOpen, trpc.github])

  return (
    <>
      {githubStatus === "error" ? (
        <Alert variant="destructive">
          <AlertDescription>
            GitHub installation failed. Open &ldquo;Add new project&rdquo; to
            try connecting again.
          </AlertDescription>
        </Alert>
      ) : null}

      <ProjectsEmptyState />

      <AddProjectDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  )
}

function ProjectsFallback() {
  return <Skeleton className="h-48 w-full rounded-xl" />
}

export function OverviewContent() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Overview"
        description="Monitor your projects and CI pipelines."
      >
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => setDialogOpen(true)}>
            <Plus />
            Add new project
          </Button>
          <UserAvatar size="sm" />
          <UserSummary className="hidden sm:block" />
        </div>
      </DashboardHeader>

      <Suspense fallback={<ProjectsFallback />}>
        <ProjectsBody dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      </Suspense>
    </div>
  )
}
