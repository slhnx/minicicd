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

  verifyState(state: string) {
    return jwt.verify(state, this.githubStateSecret)
  }

  async getInstallationOctokit(installationId: number) {
    const githubApp = getGithubApp()
    return githubApp.getInstallationOctokit(installationId)
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
