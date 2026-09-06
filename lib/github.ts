import { App } from "octokit"

import { formatGithubAppPrivateKey } from "@/lib/github/format-private-key"

export function getGithubApp(): App {
  const appId = process.env.GITHUB_APP_ID
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY

  if (!appId) {
    throw new Error("GITHUB_APP_ID is missing in environment variables")
  }

  if (!privateKey) {
    throw new Error(
      "GITHUB_APP_PRIVATE_KEY is missing in environment variables",
    )
  }

  return new App({
    appId: parseInt(appId, 10),
    privateKey: formatGithubAppPrivateKey(privateKey),
  })
}