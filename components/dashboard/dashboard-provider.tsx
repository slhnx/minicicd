"use client"

import * as React from "react"

type DashboardContextValue = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  toggleCollapsed: () => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

const DashboardContext = React.createContext<DashboardContextValue | null>(null)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const toggleCollapsed = React.useCallback(() => {
    setCollapsed((value) => !value)
  }, [])

  return (
    <DashboardContext.Provider
      value={{
        collapsed,
        setCollapsed,
        toggleCollapsed,
        mobileOpen,
        setMobileOpen,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = React.useContext(DashboardContext)

  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider")
  }

  return context
}
