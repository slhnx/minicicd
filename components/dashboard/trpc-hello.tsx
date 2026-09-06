"use client"

import { useQuery } from "@tanstack/react-query"

import { useTRPC } from "@/lib/trpc/client"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TrpcHello() {
  const trpc = useTRPC()
  const helloQuery = useQuery(trpc.hello.queryOptions())

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="font-normal">tRPC</CardTitle>
        <CardDescription>
          Fetched from the server using React Query
        </CardDescription>
      </CardHeader>
      <CardContent>
        {helloQuery.isPending && <Skeleton className="h-4 w-48" />}
        {helloQuery.isError && (
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load hello procedure.
            </AlertDescription>
          </Alert>
        )}
        {helloQuery.isSuccess && (
          <p className="font-mono text-sm text-foreground">
            {helloQuery.data.message}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
