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
import { signOut } from "@/lib/auth/auth-client"

export function SidebarUser() {
  const router = useRouter()
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

  const trigger = (
    <Button
      variant="ghost"
      className={
        collapsed
          ? "size-8 justify-center px-0"
          : "h-auto w-full justify-start gap-3 px-2.5 py-2"
      }
      disabled={isPending || !user}
    >
      {isPending ? (
        <Skeleton className="size-6 shrink-0 rounded-full" />
      ) : user ? (
        <Avatar size="sm">
          {user.image ? (
            <AvatarImage src={user.image} alt={user.name} />
          ) : null}
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
      ) : null}
      {!collapsed && !isPending && user && (
        <span className="flex min-w-0 flex-1 flex-col items-start text-left">
          <span className="truncate text-sm font-medium text-foreground">
            {user.name}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {user.email}
          </span>
        </span>
      )}
      {!collapsed && isPending && (
        <span className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </span>
      )}
      {!collapsed && !isPending && user && (
        <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
      )}
    </Button>
  )

  if (!isPending && !user) {
    return null
  }

  return (
    <DropdownMenu>
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                render={trigger}
                aria-label={user ? `${user.name} menu` : "User menu"}
              />
            }
          />
          <TooltipContent side="right">
            {user?.name ?? "Account"}
          </TooltipContent>
        </Tooltip>
      ) : (
        <DropdownMenuTrigger
          render={trigger}
          aria-label={user ? `${user.name} menu` : "User menu"}
        />
      )}

      <DropdownMenuContent align="start" side="top" className="w-56">
        {user && (
          <>
            <DropdownMenuLabel>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
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
