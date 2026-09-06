export function getUserDisplayName(name: string | null | undefined, email: string) {
  if (name?.trim()) {
    return name.trim()
  }

  return email.split("@")[0] ?? email
}

export function getUserInitials(
  name: string | null | undefined,
  email: string
) {
  const displayName = getUserDisplayName(name, email)
  const parts = displayName.split(/\s+/).filter(Boolean)

  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase()
  }

  return displayName.slice(0, 2).toUpperCase()
}
