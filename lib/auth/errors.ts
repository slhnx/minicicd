export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message.toLowerCase()

    if (message.includes("invalid email or password")) {
      return "Invalid email or password. Please try again."
    }

    if (message.includes("user already exists") || message.includes("already exists")) {
      return "An account with this email already exists."
    }

    if (message.includes("invalid email")) {
      return "Please enter a valid email address."
    }

    if (message.includes("password") && message.includes("short")) {
      return "Password must be at least 8 characters."
    }

    if (message.includes("network") || message.includes("fetch")) {
      return "Network error. Please check your connection and try again."
    }

    return error.message
  }

  return "Something went wrong. Please try again."
}
