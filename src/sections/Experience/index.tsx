import SectionTitle from "@/components/SectionTitle";
import { experiences } from "@/constants/experience";

export default function Experience() {
  const hasExperience = experiences && experiences.length > 0;

  return (
    <section
      id="experience"
      className="py-20 bg-bg-primary"
      aria-label="Professional Experience Section"
    >
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle
          title="Experience"
          subtitle="My professional history and freelance milestones."
        />

        <div className="mt-8">
          {!hasExperience ? (
            /* Fallback state when experiences list is empty */
            <div className="p-8 text-center rounded-lg border border-dashed border-border-color bg-bg-secondary text-text-secondary">
              <p className="text-base font-medium">
                Currently focused on personal projects, open-source contributions, and continuous learning.
              </p>
            </div>
          ) : (
            /* Vertical timeline format */
            <div className="relative border-l border-border-color/80 pl-6 ml-3 space-y-12">
              {experiences.map((exp, index) => (
                <div key={`${exp.company}-${index}`} className="relative">
                  {/* Bullet indicator on the line */}
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent ring-4 ring-bg-primary" />
                  
                  {/* Header metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-text-primary leading-snug">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-accent uppercase tracking-wide">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-medium text-text-secondary bg-bg-secondary px-2.5 py-1 rounded-sm border border-border-color/40 w-fit">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Bullet description text */}
                  <ul className="list-disc list-outside pl-4 space-y-2 text-sm md:text-base text-text-secondary leading-relaxed">
                    {exp.description.map((point, pIdx) => (
                      <li key={pIdx}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
