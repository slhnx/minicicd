import { githubService } from "@/server/services/github.service"
import { createTRPCRouter, privateProcedure } from "@/server/trpc/init"
import { TRPCError } from "@trpc/server"

export const githubRouter = createTRPCRouter({
  getInstallUrl: privateProcedure.query(({ ctx }) => {
    const { session } = ctx
    if (!session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    try {
      const installUrl = githubService.getInstallUrl(session.user.id)
      return { installUrl }
    } catch (error) {
      console.error(error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get install URL",
      })
    }
  }),
})
