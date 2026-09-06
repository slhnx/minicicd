import type { Metadata } from "next"

import { ProjectPageContent } from "@/components/projects/project-page-content"

export const metadata: Metadata = {
  title: "Project",
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <ProjectPageContent projectId={id} />
}
