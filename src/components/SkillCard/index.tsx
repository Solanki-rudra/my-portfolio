import { SkillCategory } from "@/types";

interface SkillCardProps {
  category: SkillCategory;
}

export default function SkillCard({ category }: SkillCardProps) {
  return (
    <div className="p-6 bg-bg-secondary rounded-lg border border-border-color hover:border-accent/50 transition-colors duration-200">
      <h3 className="text-xl font-bold text-text-primary mb-4 tracking-tight">
        {category.category}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li
            key={skill}
            className="px-3 py-1.5 bg-bg-primary text-text-primary border border-border-color rounded text-sm font-medium shadow-2xs hover:border-accent/40 transition-colors"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
