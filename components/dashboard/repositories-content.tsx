"use client"

import { Suspense } from "react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { GitHubOverviewSection } from "@/components/dashboard/github/github-overview-section"
import { Skeleton } from "@/components/ui/skeleton"

function RepositoriesFallback() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-24 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  )
}

export function RepositoriesContent() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Repositories"
        description="Manage connected GitHub repositories and pipeline settings."
      />
      <Suspense fallback={<RepositoriesFallback />}>
        <GitHubOverviewSection />
      </Suspense>
    </div>
  )
}
