"use client"

import { useQuery } from "@tanstack/react-query"

import { GitHubIcon } from "@/components/dashboard/github/github-icon"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/lib/trpc/client"

export function GitHubConnectButton({
  size = "default",
  className,
}: {
  size?: "default" | "lg"
  className?: string
}) {
  const trpc = useTRPC()

  const { refetch, isFetching } = useQuery(
    trpc.github.getInstallUrl.queryOptions(undefined, {
      enabled: false,
    }),
  )

  async function handleConnect() {
    const result = await refetch()

    if (result.data?.installUrl) {
      window.location.href = result.data.installUrl
    }
  }

  return (
    <Button
      size={size}
      onClick={handleConnect}
      className={className}
      isLoading={isFetching}
    >
      <GitHubIcon className="size-4" />
      Connect GitHub
    </Button>
  )
}
