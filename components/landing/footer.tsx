import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="text-sm font-medium text-foreground">Mini CI/CD</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A simple CI platform that you can understand and control.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#features" className="transition-colors hover:text-foreground">
                  Features
                </a>
              </li>
              <li>
                <a href="#preview" className="transition-colors hover:text-foreground">
                  Preview
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">Account</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/login" className="transition-colors hover:text-foreground">
                  Log in
                </Link>
              </li>
              <li>
                <Link href="/signup" className="transition-colors hover:text-foreground">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mini CI/CD. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
