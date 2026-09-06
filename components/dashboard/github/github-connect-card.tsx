"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  )
}

export function GitHubConnectCard({
  onConnect,
}: {
  onConnect: () => void
}) {
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
        <Button size="lg" onClick={onConnect} className="min-w-44">
          <GitHubIcon className="size-4" />
          Connect GitHub
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Install the MiniCI/CD GitHub App to access your repositories and run
          CI pipelines.
        </p>
      </CardContent>
    </Card>
  )
}
