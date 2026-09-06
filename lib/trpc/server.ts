import "server-only"

import { cache } from "react"

import { createTRPCContext } from "@/server/trpc/context"
import { createCallerFactory } from "@/server/trpc/init"
import { appRouter } from "@/server/trpc/routers"

const createContext = cache(async () => {
  return createTRPCContext({ headers: new Headers() })
})

const createCaller = createCallerFactory(appRouter)

export async function createServerCaller() {
  return createCaller(await createContext())
}
