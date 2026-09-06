import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/lib/generated/prisma/client"
import { getAppDatabaseUrl } from "@/lib/db/urls"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: getAppDatabaseUrl(),
  })

  return new PrismaClient({ adapter })
}

function isPrismaClientReady(client: PrismaClient | undefined): client is PrismaClient {
  return Boolean(client && typeof client.project?.findMany === "function")
}

function getPrismaClient() {
  if (isPrismaClientReady(globalForPrisma.prisma)) {
    return globalForPrisma.prisma
  }

  const client = createPrismaClient()

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client
  }

  return client
}

export const db = getPrismaClient()
