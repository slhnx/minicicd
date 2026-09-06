export type BuildStatus = "passed" | "failed" | "running" | "queued"

export type RepositoryVisibility = "public" | "private"

export type Repository = {
  id: string
  name: string
  fullName: string
  cloneUrl: string
  description: string
  visibility: RepositoryVisibility
  url: string
  htmlUrl?: string
  defaultBranch: string
  owner: string
  isRegistered?: boolean
  projectId?: string | null
  lastBuildStatus?: BuildStatus
  lastBuildAt?: string
}

export type Project = {
  id: string
  githubRepoId: string
  name: string
  fullName: string
  cloneUrl: string
  defaultBranch: string
  createdAt: Date
  updatedAt: Date
}
