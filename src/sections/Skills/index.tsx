import SectionTitle from "@/components/SectionTitle";
import SkillCard from "@/components/SkillCard";
import { skillCategories } from "@/constants/skills";

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 bg-bg-primary"
      aria-label="My Tech Skills Section"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title="Skills &amp; Expertise"
          subtitle="My technical stack, languages, frameworks and tools."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {skillCategories.map((category) => (
            <SkillCard key={category.category} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
