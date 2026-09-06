"use client"

import { GitHubConnectButton } from "@/components/dashboard/github/github-connect-button"
import { GitHubIcon } from "@/components/dashboard/github/github-icon"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function GitHubConnectCard() {
  return (
    <Card className="mx-auto max-w-lg shadow-sm">
      <CardHeader className="items-center text-center">
        <div className="mb-2 flex size-14 items-center justify-center rounded-xl border border-border bg-muted/50">
          <GitHubIcon className="size-7 text-foreground" />
        </div>
        <CardTitle className="text-xl font-normal">Connect GitHub</CardTitle>
        <CardDescription className="max-w-sm text-pretty">
          Connect your GitHub account to access your repositories and start
          building CI pipelines.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3 pb-8">
        <GitHubConnectButton size="lg" className="min-w-44" />
        <p className="text-center text-xs text-muted-foreground">
          Install the MiniCI/CD GitHub App to access your repositories and run
          CI pipelines.
        </p>
      </CardContent>
    </Card>
  )
}
