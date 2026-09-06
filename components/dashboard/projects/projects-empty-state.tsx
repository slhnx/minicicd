import { FolderGit2 } from "lucide-react"

export function ProjectsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-20 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-lg border border-border bg-background">
        <FolderGit2 className="size-5 text-muted-foreground" />
      </div>
      <h3 className="text-base font-medium text-foreground">No projects yet</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        Import a repository from GitHub to start building CI pipelines. Click
        &ldquo;Add new project&rdquo; to get started.
      </p>
    </div>
  )
}
