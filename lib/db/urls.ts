function requireEnv(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is not set`)
  }

  return value
}

/** Neon pooled connection for the Next.js app runtime. */
export function getAppDatabaseUrl(): string {
  return requireEnv("DATABASE_URL")
}

/** Direct Neon connection for Prisma CLI (migrate, push, studio). */
export function getPrismaCliDatabaseUrl(): string {
  return (
    process.env.DATABASE_URL_UNPOOLED ??
    process.env.DIRECT_URL ??
    process.env.DATABASE_URL ??
    (() => {
      throw new Error(
        "DATABASE_URL_UNPOOLED, DIRECT_URL, or DATABASE_URL must be set",
      )
    })()
  )
}
