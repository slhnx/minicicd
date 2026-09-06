import { db } from "@/lib/db"
import { githubService } from "@/server/services/github.service"

export type ProjectRecord = {
  id: string
  githubRepoId: string
  name: string
  fullName: string
  cloneUrl: string
  defaultBranch: string
  createdAt: Date
  updatedAt: Date
}

function serializeProject(project: {
  id: string
  githubRepoId: bigint
  name: string
  fullName: string
  cloneUrl: string
  defaultBranch: string
  createdAt: Date
  updatedAt: Date
}): ProjectRecord {
  return {
    id: project.id,
    githubRepoId: project.githubRepoId.toString(),
    name: project.name,
    fullName: project.fullName,
    cloneUrl: project.cloneUrl,
    defaultBranch: project.defaultBranch,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  }
}

export class ProjectService {
  async getRegistrationMap(githubRepoIds: string[]) {
    if (githubRepoIds.length === 0) {
      return new Map<string, { projectId: string }>()
    }

    const projects = await db.project.findMany({
      where: {
        githubRepoId: {
          in: githubRepoIds.map((id) => BigInt(id)),
        },
      },
      select: {
        id: true,
        githubRepoId: true,
      },
    })

    return new Map(
      projects.map((project) => [
        project.githubRepoId.toString(),
        { projectId: project.id },
      ]),
    )
  }

  async createFromGithubRepo(userId: string, githubRepoId: string) {
    let repository

    try {
      repository = await githubService.getRepository(userId, githubRepoId)
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        error.status === 404
      ) {
        throw new Error("GitHub repository not found or not accessible")
      }

      throw error
    }

    const existing = await db.project.findUnique({
      where: { githubRepoId: BigInt(githubRepoId) },
    })

    if (existing) {
      return serializeProject(existing)
    }

    const project = await db.project.create({
      data: {
        githubRepoId: BigInt(githubRepoId),
        name: repository.name,
        fullName: repository.fullName,
        cloneUrl: repository.cloneUrl,
        defaultBranch: repository.defaultBranch,
      },
    })

    return serializeProject(project)
  }

  async list() {
    const projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
    })

    return projects.map(serializeProject)
  }

  async getById(userId: string, projectId: string) {
    const project = await db.project.findUnique({
      where: { id: projectId },
    })

    if (!project) {
      return null
    }

    await githubService.getRepository(userId, project.githubRepoId.toString())

    return serializeProject(project)
  }
}

export const projectService = new ProjectService()
