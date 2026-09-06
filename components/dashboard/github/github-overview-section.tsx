"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { GitHubConnectCard } from "@/components/dashboard/github/github-connect-card"
import { GitHubConnectedState } from "@/components/dashboard/github/github-connected-state"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTRPC } from "@/lib/trpc/client"

export function GitHubOverviewSection() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const githubStatus = searchParams.get("github")

  const installationQuery = useQuery(trpc.github.getInstallation.queryOptions())

  const repositoriesQuery = useQuery({
    ...trpc.github.listRepositories.queryOptions(),
    enabled: installationQuery.data?.connected === true,
  })

  useEffect(() => {
    if (githubStatus === "connected" || githubStatus === "error") {
      void queryClient.invalidateQueries({
        queryKey: trpc.github.getInstallation.queryKey(),
      })
      void queryClient.invalidateQueries({
        queryKey: trpc.github.listRepositories.queryKey(),
      })
    }
  }, [githubStatus, queryClient, trpc.github])

  const isLoading =
    installationQuery.isPending ||
    (installationQuery.data?.connected && repositoriesQuery.isPending)

  if (installationQuery.isError || repositoriesQuery.isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load GitHub connection status. Please try again.
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

  if (isLoading) {
    return (
      <GitHubConnectedState repositories={[]} isLoading accountLogin={undefined} />
    )
  }

  if (!installationQuery.data?.connected) {
    return (
      <div className="flex justify-center py-8">
        <GitHubConnectCard />
      </div>
    )
  }

  return (
    <GitHubConnectedState
      repositories={repositoriesQuery.data?.repositories ?? []}
      isLoading={repositoriesQuery.isFetching}
      accountLogin={installationQuery.data.installation?.githubAccountLogin}
    />
  )
}
