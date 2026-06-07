import SectionTitle from "@/components/SectionTitle";
import { personalInfo } from "@/constants/personal";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 bg-bg-secondary border-y border-border-color/30"
      aria-label="About Me Section"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title="About Me"
          subtitle="A summary of my background, current focus, and what I bring to a team."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
          {/* Main Professional Bio text */}
          <div className="lg:col-span-7 space-y-6 text-text-secondary text-base leading-relaxed">
            {personalInfo.about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Quick info highlights */}
          <div className="lg:col-span-5 bg-bg-primary p-8 rounded-lg border border-border-color/80 shadow-2xs h-fit">
            <h3 className="text-lg font-bold text-text-primary mb-6 border-b border-border-color pb-2">
              Quick Details
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm font-medium">
              <div>
                <dt className="text-text-secondary font-mono text-xs uppercase tracking-wide">
                  Location
                </dt>
                <dd className="text-text-primary mt-1">
                  {personalInfo.location}
                </dd>
              </div>
              <div>
                <dt className="text-text-secondary font-mono text-xs uppercase tracking-wide">
                  Primary Role
                </dt>
                <dd className="text-text-primary mt-1">{personalInfo.role}</dd>
              </div>
              <div>
                <dt className="text-text-secondary font-mono text-xs uppercase tracking-wide">
                  Email
                </dt>
                <dd className="text-text-primary mt-1 hover:text-accent transition-colors">
                  <a href={`mailto:${personalInfo.email}`}>
                    {personalInfo.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-text-secondary font-mono text-xs uppercase tracking-wide">
                  Work Style
                </dt>
                <dd className="text-text-primary mt-1">
                  Full-time / Remote / Freelance
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
