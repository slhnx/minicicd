import {
  CheckCircle2,
  CircleDashed,
  Loader2,
  XCircle,
  type LucideIcon,
} from "lucide-react"

import type { BuildStatus } from "@/lib/types/repository"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const statusConfig: Record<
  BuildStatus,
  {
    label: string
    variant: "secondary" | "destructive" | "outline"
    icon: LucideIcon
    iconClassName?: string
  }
> = {
  passed: {
    label: "Passed",
    variant: "secondary",
    icon: CheckCircle2,
  },
  failed: {
    label: "Failed",
    variant: "destructive",
    icon: XCircle,
  },
  running: {
    label: "Running",
    variant: "outline",
    icon: Loader2,
    iconClassName: "animate-spin",
  },
  queued: {
    label: "Queued",
    variant: "outline",
    icon: CircleDashed,
  },
}

export function BuildStatusBadge({
  status,
  className,
}: {
  status: BuildStatus
  className?: string
}) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={cn("gap-1", className)}>
      <Icon className={cn("size-3", config.iconClassName)} aria-hidden />
      {config.label}
    </Badge>
  )
}
