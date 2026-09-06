import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

export function Logo({
  href = "/",
  showWordmark = true,
  className,
  iconClassName,
  wordmarkClassName,
}: {
  href?: string
  showWordmark?: boolean
  className?: string
  iconClassName?: string
  wordmarkClassName?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 transition-opacity hover:opacity-80",
        className,
      )}
    >
      <Image
        src="/logo.png"
        alt="MiniCI/CD"
        width={32}
        height={32}
        className={cn("size-8 shrink-0 rounded-lg", iconClassName)}
        priority
      />
      {showWordmark ? (
        <span
          className={cn(
            "font-medium tracking-tight text-foreground",
            wordmarkClassName,
          )}
        >
          MiniCI/CD
        </span>
      ) : null}
    </Link>
  )
}
