import { githubService } from "@/server/services/github.service"
import { createTRPCRouter, privateProcedure } from "@/server/trpc/init"
import { TRPCError } from "@trpc/server"

export const githubRouter = createTRPCRouter({
  getInstallUrl: privateProcedure.query(({ ctx }) => {
    try {
      const installUrl = githubService.getInstallUrl(ctx.session.user.id)
      return { installUrl }
    } catch (error) {
      console.error(error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get install URL",
      })
    }
  }),

  getInstallation: privateProcedure.query(async ({ ctx }) => {
    try {
      const installation = await githubService.getUserInstallation(
        ctx.session.user.id
      )

      if (!installation) {
        return { connected: false as const, installation: null }
      }

      return {
        connected: true as const,
        installation: {
          id: installation.id,
          githubAccountLogin: installation.githubAccountLogin,
          repositorySelection: installation.repositorySelection,
        },
      }
    } catch (error) {
      console.error(error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get GitHub installation",
      })
    }
  }),

  listRepositories: privateProcedure.query(async ({ ctx }) => {
    try {
      const installation = await githubService.getUserInstallation(
        ctx.session.user.id
      )

      if (!installation) {
        return { repositories: [] }
      }

      const repositories = await githubService.listRepositories(
        ctx.session.user.id
      )

      return { repositories }
    } catch (error) {
      console.error(error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to list repositories",
      })
    }
  }),
})
