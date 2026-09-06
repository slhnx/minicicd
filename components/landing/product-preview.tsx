import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const steps = [
  { name: "Checkout", status: "passed" },
  { name: "Install dependencies", status: "passed" },
  { name: "Run tests", status: "passed" },
  { name: "Build", status: "passed" },
] as const

export function ProductPreview() {
  return (
    <section
      id="preview"
      className="border-y border-border/60 bg-muted/30 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
            A dashboard you can actually understand
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Every step visible. Every log accessible. Preview of what your build
            pipeline will look like.
          </p>
        </div>

        <Card className="mx-auto max-w-2xl shadow-sm">
          <CardHeader className="border-b">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="font-normal">Build #142</CardTitle>
                <CardDescription>main · acme/web-app · 2m ago</CardDescription>
              </div>
              <Badge variant="outline">Passed</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-0 pt-4">
            {steps.map((step, index) => (
              <div key={step.name}>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary"
                      aria-hidden
                    >
                      ✓
                    </span>
                    <span className="text-sm text-foreground">{step.name}</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {index === 0
                      ? "12s"
                      : index === 1
                        ? "45s"
                        : index === 2
                          ? "1m 08s"
                          : "38s"}
                  </span>
                </div>
                {index < steps.length - 1 && <Separator />}
              </div>
            ))}
            <Separator className="my-4" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-foreground">Passed</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
