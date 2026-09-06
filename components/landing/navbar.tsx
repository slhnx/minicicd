"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { signOut, useSession } from "@/lib/auth/auth-client"

export function Navbar() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
          router.refresh()
        },
      },
    })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-foreground transition-colors hover:text-foreground/80"
        >
          Mini CI/CD
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#preview" className="transition-colors hover:text-foreground">
            Preview
          </a>
        </nav>

        <div className="flex items-center gap-2">
          {!isPending && session?.user ? (
            <>
              <span className="hidden max-w-[12rem] truncate text-sm text-muted-foreground sm:inline">
                {session.user.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/login" />}>
                Log in
              </Button>
              <Button size="sm" nativeButton={false} render={<Link href="/signup" />}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
