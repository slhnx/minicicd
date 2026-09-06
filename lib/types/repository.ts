export type BuildStatus = "passed" | "failed" | "running" | "queued"

export type RepositoryVisibility = "public" | "private"

export type Repository = {
  id: string
  name: string
  description: string
  visibility: RepositoryVisibility
  url: string
  defaultBranch: string
  owner: string
  lastBuildStatus?: BuildStatus
  lastBuildAt?: string
}
