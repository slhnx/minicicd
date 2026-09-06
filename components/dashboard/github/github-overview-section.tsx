"use client"

import { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { GitHubConnectCard } from "@/components/dashboard/github/github-connect-card"
import { GitHubConnectedState } from "@/components/dashboard/github/github-connected-state"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useTRPC } from "@/lib/trpc/client"

function GitHubConnectSkeleton() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-8">
      <Skeleton className="size-14 rounded-xl" />
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-72 max-w-full" />
      <Skeleton className="h-10 w-44 rounded-lg" />
    </div>
  )
}

export function GitHubOverviewSection() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const githubStatus = searchParams.get("github")

  const installationQuery = useQuery(
    trpc.github.getInstallation.queryOptions(undefined),
  )

  const isConnected = installationQuery.data?.connected === true

  const repositoriesQuery = useQuery({
    ...trpc.github.listRepositories.queryOptions(undefined),
    enabled: isConnected,
  })

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
      router.replace(pathname, { scroll: false })
    }
  }, [githubStatus, pathname, queryClient, router, trpc.github])

  if (installationQuery.isPending) {
    return <GitHubConnectSkeleton />
  }

  if (installationQuery.isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to check GitHub connection status. Please try again.
        </AlertDescription>
      </Alert>
    )
  }

  if (githubStatus === "error") {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertDescription>
            GitHub installation failed. Please try connecting again.
          </AlertDescription>
        </Alert>
        <div className="flex justify-center py-4">
          <GitHubConnectCard />
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="flex justify-center py-8">
        <GitHubConnectCard />
      </div>
    )
  }

  return (
    <GitHubConnectedState
      repositories={repositoriesQuery.data?.repositories ?? []}
      isLoading={repositoriesQuery.isPending}
      isError={repositoriesQuery.isError}
      accountLogin={installationQuery.data.installation?.githubAccountLogin}
    />
  )
}
