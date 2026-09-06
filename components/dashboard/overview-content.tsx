"use client"

import { useState } from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { GitHubConnectCard } from "@/components/dashboard/github/github-connect-card"
import { GitHubConnectedState } from "@/components/dashboard/github/github-connected-state"
import { UserAvatar, UserSummary } from "@/components/dashboard/user-display"
import { Button } from "@/components/ui/button"
import { mockRepositories } from "@/lib/mocks/repositories"

type PreviewState = "disconnected" | "connected" | "loading" | "empty"

const previewOptions: { value: PreviewState; label: string }[] = [
  { value: "disconnected", label: "Disconnected" },
  { value: "connected", label: "Connected" },
  { value: "loading", label: "Loading" },
  { value: "empty", label: "Empty" },
]

export function OverviewContent() {
  const [previewState, setPreviewState] =
    useState<PreviewState>("disconnected")

  const isConnected =
    previewState === "connected" ||
    previewState === "loading" ||
    previewState === "empty"

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Overview"
        description="Monitor your repositories and CI pipelines."
      >
        <div className="flex items-center gap-3">
          <UserAvatar size="sm" />
          <UserSummary className="hidden sm:block" />
        </div>
      </DashboardHeader>

      <div className="rounded-lg border border-border bg-muted/20 p-1">
        <div className="flex flex-wrap gap-1">
          {previewOptions.map((option) => (
            <Button
              key={option.value}
              variant={previewState === option.value ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setPreviewState(option.value)}
              className="text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>
        <p className="px-2 pb-1 text-xs text-muted-foreground">
          UI preview only — switches local demo state without calling any API.
        </p>
      </div>

      {!isConnected ? (
        <div className="flex justify-center py-8">
          <GitHubConnectCard onConnect={() => setPreviewState("connected")} />
        </div>
      ) : (
        <GitHubConnectedState
          repositories={
            previewState === "connected" ? mockRepositories : []
          }
          isLoading={previewState === "loading"}
          onDisconnect={() => setPreviewState("disconnected")}
        />
      )}
    </div>
  )
}
