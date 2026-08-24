import { notFound, permanentRedirect } from "next/navigation";
import { projectBySlug, projectExternalUrl, projects } from "../../data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const destination = projectExternalUrl(project);
  if (!destination) permanentRedirect("/#selected-work");
  permanentRedirect(destination);
}
