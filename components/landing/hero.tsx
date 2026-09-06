import Link from "next/link"

import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Simple CI for modern teams
        </p>
        <h1 className="text-4xl font-light tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
          CI/CD infrastructure without the black box
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          Build, test, and ship with a platform you can read, reason about, and
          control. No hidden magic—just clear pipelines and real-time feedback.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" nativeButton={false} render={<Link href="/signup" />}>
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Sign In
          </Button>
        </div>
      </div>
    </section>
  )
}
