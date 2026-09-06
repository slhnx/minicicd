import { createTRPCRouter, publicProcedure } from "@/server/trpc/init"
import { githubRouter } from "./github.router"

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return {
      message: "Hello from tRPC",
    }
  }),
  github: githubRouter,
  
})

export type AppRouter = typeof appRouter
