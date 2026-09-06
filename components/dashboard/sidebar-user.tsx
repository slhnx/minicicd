"use client"

import { ChevronUp, LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"

import { useCurrentUser } from "@/components/dashboard/user-display"
import { useDashboard } from "@/components/dashboard/dashboard-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useMounted } from "@/hooks/use-mounted"
import { signOut } from "@/lib/auth/auth-client"

function SidebarUserSkeleton({ collapsed }: { collapsed: boolean }) {
  if (collapsed) {
    return <Skeleton className="mx-auto size-8 rounded-lg" />
  }

  return (
    <div className="flex items-center gap-3 px-2.5 py-2">
      <Skeleton className="size-6 shrink-0 rounded-full" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  )
}

export function SidebarUser() {
  const router = useRouter()
  const mounted = useMounted()
  const { collapsed } = useDashboard()
  const { user, isPending } = useCurrentUser()

  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login")
          router.refresh()
        },
      },
    })
  }

  if (!mounted || isPending) {
    return <SidebarUserSkeleton collapsed={collapsed} />
  }

  if (!user) {
    return null
  }

  const trigger = (
    <Button
      variant="ghost"
      className={
        collapsed
          ? "size-8 justify-center px-0"
          : "h-auto w-full justify-start gap-3 px-2.5 py-2"
      }
    >
      <Avatar size="sm">
        {user.image ? (
          <AvatarImage src={user.image} alt={user.name} />
        ) : null}
        <AvatarFallback>{user.initials}</AvatarFallback>
      </Avatar>
      {!collapsed && (
        <span className="flex min-w-0 flex-1 flex-col items-start text-left">
          <span className="truncate text-sm font-medium text-foreground">
            {user.name}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {user.email}
          </span>
        </span>
      )}
      {!collapsed && (
        <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
      )}
    </Button>
  )

  return (
    <DropdownMenu>
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                render={trigger}
                aria-label={`${user.name} menu`}
              />
            }
          />
          <TooltipContent side="right">{user.name}</TooltipContent>
        </Tooltip>
      ) : (
        <DropdownMenuTrigger
          render={trigger}
          aria-label={`${user.name} menu`}
        />
      )}

      <DropdownMenuContent align="start" side="top" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <User className="size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
