import { z } from "zod"

import { projectService } from "@/server/services/project.service"
import { createTRPCRouter, privateProcedure } from "@/server/trpc/init"
import { TRPCError } from "@trpc/server"

export const projectRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        githubRepoId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const project = await projectService.createFromGithubRepo(
          ctx.session.user.id,
          input.githubRepoId,
        )

        return { project }
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "GitHub installation not found"
        ) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: "Connect GitHub before importing a repository.",
          })
        }

        if (
          error instanceof Error &&
          error.message === "GitHub repository not found or not accessible"
        ) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Repository not found or not accessible.",
          })
        }

        console.error(error)

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to register project",
        })
      }
    }),

  list: privateProcedure.query(async () => {
    try {
      const projects = await projectService.list()
      return { projects }
    } catch (error) {
      console.error(error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to list projects",
      })
    }
  }),

  getById: privateProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const project = await projectService.getById(
          ctx.session.user.id,
          input.id,
        )

        if (!project) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Project not found",
          })
        }

        return { project }
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error
        }

        if (
          error instanceof Error &&
          error.message === "GitHub installation not found"
        ) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You do not have access to this project.",
          })
        }

        console.error(error)

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to load project",
        })
      }
    }),
})
