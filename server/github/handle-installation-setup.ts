import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/auth"
import { githubService } from "@/server/services/github.service"

export function redirectToDashboard(
  request: NextRequest,
  params: Record<string, string>
) {
  const url = new URL("/dashboard", request.url)

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  return NextResponse.redirect(url)
}

export async function handleGithubInstallationSetup(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const installationIdParam = searchParams.get("installation_id")
  const state = searchParams.get("state")

  if (!installationIdParam) {
    return redirectToDashboard(request, {
      github: "error",
      reason: "missing_installation_id",
    })
  }

  const installationId = Number(installationIdParam)

  if (!Number.isFinite(installationId)) {
    return redirectToDashboard(request, {
      github: "error",
      reason: "invalid_installation_id",
    })
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (!state) {
    return redirectToDashboard(request, {
      github: "error",
      reason: "missing_state",
    })
  }

  try {
    const { userId } = githubService.verifyState(state)

    if (userId !== session.user.id) {
      return redirectToDashboard(request, {
        github: "error",
        reason: "invalid_state",
      })
    }

    await githubService.saveInstallation(session.user.id, installationId)

    return redirectToDashboard(request, { github: "connected" })
  } catch (error) {
    console.error("GitHub installation setup failed:", error)

    return redirectToDashboard(request, {
      github: "error",
      reason: "setup_failed",
    })
  }
}
