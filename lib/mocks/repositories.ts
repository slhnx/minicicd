import type { Repository } from "@/lib/types/repository"

export type { BuildStatus, Repository, RepositoryVisibility } from "@/lib/types/repository"

export const mockRepositories: Repository[] = [
  {
    id: "1",
    name: "my-web-app",
    description: "Frontend application with Next.js and TypeScript.",
    visibility: "public",
    url: "github.com/shaancodes/my-web-app",
    defaultBranch: "main",
    lastBuildStatus: "passed",
    lastBuildAt: "2 min ago",
    owner: "shaancodes",
  },
  {
    id: "2",
    name: "api-server",
    description: "REST API backend with PostgreSQL and tRPC.",
    visibility: "private",
    url: "github.com/shaancodes/api-server",
    defaultBranch: "main",
    lastBuildStatus: "failed",
    lastBuildAt: "15 min ago",
    owner: "shaancodes",
  },
  {
    id: "3",
    name: "infra-config",
    description: "Infrastructure and deployment configuration.",
    visibility: "private",
    url: "github.com/shaancodes/infra-config",
    defaultBranch: "develop",
    lastBuildStatus: "running",
    lastBuildAt: "Just now",
    owner: "shaancodes",
  },
  {
    id: "4",
    name: "docs-site",
    description: "Product documentation built with MDX.",
    visibility: "public",
    url: "github.com/shaancodes/docs-site",
    defaultBranch: "main",
    lastBuildStatus: "queued",
    lastBuildAt: "Waiting",
    owner: "shaancodes",
  },
]
