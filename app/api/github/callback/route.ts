import { NextRequest } from "next/server"

import { handleGithubInstallationSetup } from "@/server/github/handle-installation-setup"

export async function GET(request: NextRequest) {
  return handleGithubInstallationSetup(request)
}
