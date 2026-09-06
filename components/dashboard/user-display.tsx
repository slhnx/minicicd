"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useSession } from "@/lib/auth/auth-client"
import { getUserDisplayName, getUserInitials } from "@/lib/auth/user-display"
import { cn } from "@/lib/utils"

export function UserAvatar({
  size = "default",
  className,
}: {
  size?: "default" | "sm" | "lg"
  className?: string
}) {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return (
      <Skeleton
        className={cn(
          "rounded-full",
          size === "sm" && "size-6",
          size === "default" && "size-8",
          size === "lg" && "size-10",
          className
        )}
      />
    )
  }

  if (!session?.user) {
    return (
      <Avatar size={size} className={className}>
        <AvatarFallback>?</AvatarFallback>
      </Avatar>
    )
  }

  const { name, email, image } = session.user
  const initials = getUserInitials(name, email)

  return (
    <Avatar size={size} className={className}>
      {image ? <AvatarImage src={image} alt={getUserDisplayName(name, email)} /> : null}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}

export function UserSummary({
  showEmail = false,
  className,
}: {
  showEmail?: boolean
  className?: string
}) {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return (
      <div className={cn("space-y-1", className)}>
        <Skeleton className="h-4 w-24" />
        {showEmail && <Skeleton className="h-3 w-32" />}
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className={cn("text-sm text-muted-foreground", className)}>
        Not signed in
      </div>
    )
  }

  const { name, email } = session.user
  const displayName = getUserDisplayName(name, email)

  return (
    <div className={cn("min-w-0", className)}>
      <p className="truncate text-sm font-medium text-foreground">{displayName}</p>
      {showEmail && (
        <p className="truncate text-xs text-muted-foreground">{email}</p>
      )}
    </div>
  )
}

export function useCurrentUser() {
  const { data: session, isPending } = useSession()

  if (!session?.user) {
    return { user: null, isPending }
  }

  const { name, email, image } = session.user

  return {
    isPending,
    user: {
      name: getUserDisplayName(name, email),
      email,
      image,
      initials: getUserInitials(name, email),
    },
  }
}
