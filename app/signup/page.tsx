import { AuthLayout } from "@/components/auth/auth-layout"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      description="Start building with Mini CI/CD"
    >
      <SignupForm />
    </AuthLayout>
  )
}
