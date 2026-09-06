import { createTRPCRouter, publicProcedure } from "@/server/trpc/init"
import { githubRouter } from "./github.router"
import { projectRouter } from "./project.router"

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return {
      message: "Hello from tRPC",
    }
  }),
  github: githubRouter,
  project: projectRouter,
})

export type AppRouter = typeof appRouter
