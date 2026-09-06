"use client"

import { createTRPCClient, httpBatchLink } from "@trpc/client"
import { createTRPCContext } from "@trpc/tanstack-react-query"
import superjson from "superjson"

import type { AppRouter } from "@/server/trpc/routers"
import { getQueryClient } from "@/lib/trpc/query-client"

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()

export function getTRPCClient() {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: getBaseUrl() + "/api/trpc",
        transformer: superjson,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: "include",
          })
        },
      }),
    ],
  })
}

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin
  }

  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return "http://localhost:3000"
}

export { getQueryClient }
