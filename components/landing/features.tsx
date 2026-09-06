import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GitBranch, History, ScrollText, Shield } from "lucide-react"

const features = [
  {
    title: "GitHub integration",
    description:
      "Connect repositories and trigger builds from pushes and pull requests.",
    icon: GitBranch,
  },
  {
    title: "Isolated builds",
    description:
      "Each pipeline runs in its own environment—predictable, reproducible, secure.",
    icon: Shield,
  },
  {
    title: "Real-time logs",
    description:
      "Stream build output as it happens. No refreshing, no guessing.",
    icon: ScrollText,
  },
  {
    title: "Build history",
    description:
      "Track every run, compare results, and debug failures with full context.",
    icon: History,
  },
] as const

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Core CI capabilities designed for clarity. Marketing preview only—full
            functionality coming in later phases.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className="shadow-none">
              <CardHeader>
                <div className="mb-2 flex size-9 items-center justify-center rounded-lg border border-border bg-muted/50">
                  <feature.icon className="size-4 text-muted-foreground" />
                </div>
                <CardTitle className="font-normal">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
