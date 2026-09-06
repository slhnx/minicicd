import jwt from "jsonwebtoken"

import { db } from "@/lib/db"
import { getGithubApp } from "@/lib/github"

export class GithubService {
  private get githubAppSlug(): string {
    const slug = process.env.GITHUB_APP_SLUG
    if (!slug) {
      throw new Error("GITHUB_APP_SLUG is not defined in environment variables")
    }
    return slug
  }

  private get githubStateSecret(): string {
    const secret = process.env.GITHUB_STATE_SECRET
    if (!secret) {
      throw new Error(
        "GITHUB_STATE_SECRET is not defined in environment variables"
      )
    }
    return secret
  }

  getInstallUrl(userId: string) {
    const state = jwt.sign({ userId }, this.githubStateSecret, {
      expiresIn: "5m",
    })

    const url = `https://github.com/apps/${this.githubAppSlug}/installations/new?state=${encodeURIComponent(state)}`
    return url
  }

  verifyState(state: string): { userId: string } {
    const payload = jwt.verify(state, this.githubStateSecret)

    if (typeof payload === "string" || !payload || typeof payload !== "object") {
      throw new Error("Invalid state payload")
    }

    const userId = (payload as jwt.JwtPayload & { userId?: string }).userId

    if (!userId) {
      throw new Error("State payload missing userId")
    }

    return { userId }
  }

  async getInstallationOctokit(installationId: number) {
    const githubApp = getGithubApp()
    return githubApp.getInstallationOctokit(installationId)
  }

  async getUserInstallation(userId: string) {
    return db.githubInstallation.findFirst({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    })
  }

  async listRepositories(userId: string) {
    const installation = await this.getUserInstallation(userId)

    if (!installation) {
      return []
    }

    const installationId = Number(installation.installationId)
    const octokit = await this.getInstallationOctokit(installationId)

    const { data } = await octokit.rest.apps.listReposAccessibleToInstallation({
      per_page: 100,
    })

    return data.repositories.map((repo) => ({
      id: String(repo.id),
      name: repo.name,
      description: repo.description ?? "No description provided.",
      visibility: repo.private ? ("private" as const) : ("public" as const),
      url: repo.full_name
        ? `github.com/${repo.full_name}`
        : (repo.html_url ?? ""),
      defaultBranch: repo.default_branch ?? "main",
      owner: repo.full_name?.split("/")[0] ?? installation.githubAccountLogin,
    }))
  }

  async saveInstallation(userId: string, installation_id: number) {
    const githubApp = getGithubApp()
    const octokit = await githubApp.getInstallationOctokit(installation_id)

    const { data } = await octokit.rest.apps.getInstallation({
      installation_id,
    })

    if (!data.account) {
      throw new Error("Installation account data is missing")
    }

    const account = data.account as {
      id: number
      login?: string
      slug?: string
      type?: string
    }
    const accountLogin = account.login || account.slug || ""
    const accountType = account.type || "User"

    const installation = await db.githubInstallation.upsert({
      where: {
        installationId: BigInt(installation_id),
      },
      update: {
        githubAccountId: BigInt(account.id),
        githubAccountLogin: accountLogin,
        githubAccountType: accountType,
        repositorySelection: data.repository_selection,
      },
      create: {
        userId,
        installationId: BigInt(installation_id),
        githubAccountId: BigInt(account.id),
        githubAccountLogin: accountLogin,
        githubAccountType: accountType,
        repositorySelection: data.repository_selection,
      },
    })

    return installation
  }
}

export const githubService = new GithubService()
