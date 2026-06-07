import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/constants/projects";

export default function Projects() {
  // Sort projects so featured projects are rendered first
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <section
      id="projects"
      className="py-20 bg-bg-secondary border-y border-border-color/30"
      aria-label="Projects Portfolio Section"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title="Selected Projects"
          subtitle="A collection of web applications and APIs I've developed, ranging from frontend layouts to full stack systems."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {sortedProjects.map((project) => (
            <div key={project.title} className="h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
