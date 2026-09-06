"use client"

import { useRouter } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Check, Globe, Lock } from "lucide-react"

import { GitHubConnectButton } from "@/components/dashboard/github/github-connect-button"
import { GitHubIcon } from "@/components/dashboard/github/github-icon"
import type { Repository } from "@/lib/types/repository"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { useTRPC } from "@/lib/trpc/client"

function RepositoryPickerRow({
  repository,
  isConnecting,
  onConnect,
}: {
  repository: Repository
  isConnecting: boolean
  onConnect: (repository: Repository) => void
}) {
  const VisibilityIcon = repository.visibility === "private" ? Lock : Globe
  const isRegistered = repository.isRegistered === true

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
          <GitHubIcon className="size-4 text-foreground" />
        </div>
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-medium text-foreground">
              {repository.name}
            </p>
            <Badge variant="outline" className="gap-1 font-normal">
              <VisibilityIcon className="size-3" aria-hidden />
              {repository.visibility === "private" ? "Private" : "Public"}
            </Badge>
          </div>
          <p className="truncate font-mono text-xs text-muted-foreground">
            {repository.fullName || repository.url}
          </p>
        </div>
      </div>
      {isRegistered ? (
        <Button
          size="sm"
          variant="secondary"
          className="min-w-24"
          onClick={() => onConnect(repository)}
        >
          <Check className="size-3.5" />
          Connected
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="min-w-24"
          isLoading={isConnecting}
          onClick={() => onConnect(repository)}
        >
          Connect
        </Button>
      )}
    </div>
  )
}

function RepositoryPickerSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 rounded-lg border border-border p-3"
        >
          <Skeleton className="size-9 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-7 w-20 rounded-lg" />
        </div>
      ))}
    </div>
  )
}

function GitHubConnectPrompt() {
  return (
    <div className="flex flex-col items-center px-2 py-8 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-xl border border-border bg-muted/50">
        <GitHubIcon className="size-7 text-foreground" />
      </div>
      <h3 className="text-base font-medium text-foreground">
        Connect GitHub first
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        Install the MiniCI/CD GitHub App to browse your repositories and import
        a project.
      </p>
      <GitHubConnectButton size="lg" className="mt-6 min-w-44" />
    </div>
  )
}

export function AddProjectDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const trpc = useTRPC()
  const router = useRouter()
  const queryClient = useQueryClient()

  const installationQuery = useQuery({
    ...trpc.github.getInstallation.queryOptions(undefined),
    enabled: open,
  })

  const isConnected = installationQuery.data?.connected === true

  const repositoriesQuery = useQuery({
    ...trpc.github.listRepositories.queryOptions(undefined),
    enabled: open && isConnected,
  })

  const createProjectMutation = useMutation(
    trpc.project.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: trpc.github.listRepositories.queryKey(),
        })
        await queryClient.invalidateQueries({
          queryKey: trpc.project.list.queryKey(),
        })
        onOpenChange(false)
        router.push(`/projects/${data.project.id}`)
      },
    }),
  )

  function handleRepositoryConnect(repository: Repository) {
    if (repository.isRegistered && repository.projectId) {
      onOpenChange(false)
      router.push(`/projects/${repository.projectId}`)
      return
    }

    createProjectMutation.mutate({
      githubRepoId: repository.id,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="shrink-0 border-b border-border px-6 py-5">
          <DialogTitle>Add new project</DialogTitle>
          <DialogDescription>
            Import a GitHub repository to create a new CI project.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-hidden px-6 py-5">
          {createProjectMutation.isError ? (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {createProjectMutation.error.message ||
                  "Failed to register project. Please try again."}
              </AlertDescription>
            </Alert>
          ) : null}

          {installationQuery.isPending ? (
            <ScrollArea className="h-[min(20rem,calc(85vh-10rem))]">
              <RepositoryPickerSkeleton />
            </ScrollArea>
          ) : null}

          {installationQuery.isError ? (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to check GitHub connection. Please try again.
              </AlertDescription>
            </Alert>
          ) : null}

          {!installationQuery.isPending &&
          !installationQuery.isError &&
          !isConnected ? (
            <GitHubConnectPrompt />
          ) : null}

          {isConnected ? (
            <div className="flex h-full min-h-0 flex-col">
              {repositoriesQuery.isPending ? (
                <ScrollArea className="h-[min(20rem,calc(85vh-10rem))]">
                  <RepositoryPickerSkeleton />
                </ScrollArea>
              ) : null}

              {repositoriesQuery.isError ? (
                <Alert variant="destructive">
                  <AlertDescription>
                    GitHub is connected, but repositories could not be loaded.
                  </AlertDescription>
                </Alert>
              ) : null}

              {repositoriesQuery.isSuccess &&
              repositoriesQuery.data.repositories.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center">
                  <p className="text-sm text-muted-foreground">
                    No repositories are available for this GitHub installation.
                  </p>
                </div>
              ) : null}

              {repositoriesQuery.isSuccess &&
              repositoriesQuery.data.repositories.length > 0 ? (
                <ScrollArea className="h-[min(20rem,calc(85vh-10rem))] w-full">
                  <div className="space-y-3 pr-4">
                    {repositoriesQuery.data.repositories.map((repository) => (
                      <RepositoryPickerRow
                        key={repository.id}
                        repository={repository}
                        isConnecting={
                          createProjectMutation.isPending &&
                          createProjectMutation.variables?.githubRepoId ===
                            repository.id
                        }
                        onConnect={handleRepositoryConnect}
                      />
                    ))}
                  </div>
                </ScrollArea>
              ) : null}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
