import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/trpc/init"

export const appRouter = createTRPCRouter({
  public: createTRPCRouter({
    hello: publicProcedure.query(() => {
      return {
        message: "Hello from tRPC",
      }
    }),
  }),
  private: createTRPCRouter({
    hello: privateProcedure.query(({ ctx }) => {
      return {
        message: "Authenticated",
        user: ctx.session.user,
      }
    }),
  }),
})

export type AppRouter = typeof appRouter
