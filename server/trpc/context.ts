import { auth } from "@/lib/auth/auth"
import { db } from "@/lib/db"

export async function createTRPCContext(opts: { headers: Headers }) {
  const session = await auth.api.getSession({
    headers: opts.headers,
  })

  return {
    db,
    session,
    headers: opts.headers,
  }
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>
