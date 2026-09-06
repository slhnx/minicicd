"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

import {
  getQueryClient,
  getTRPCClient,
  TRPCProvider,
} from "@/lib/trpc/client"

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() => getTRPCClient())

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
