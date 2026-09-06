import Link from "next/link"

import { Button } from "@/components/ui/button"

export function FinalCta() {
  return (
    <section className="border-t border-border/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
          Ready to run your first build?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
          Create an account and get started in minutes. No credit card required.
        </p>
        <Button
          className="mt-8"
          size="lg"
          nativeButton={false}
          render={<Link href="/signup" />}
        >
          Get Started
        </Button>
      </div>
    </section>
  )
}
