import SectionTitle from "@/components/SectionTitle";
import { socials } from "@/constants/socials";
import {
  EnvelopeIcon,
  CodeIcon,
  LinkIcon,
  SayHelloIcon,
} from "@/components/Icons";

export default function Contact() {
  const contactLinks = [
    {
      name: "Email Address",
      value: socials.email,
      href: `mailto:${socials.email}`,
      icon: <EnvelopeIcon className="w-5 h-5 text-accent" />,
    },
    {
      name: "GitHub Profile",
      value: socials.github.replace("https://", ""),
      href: socials.github,
      icon: <CodeIcon className="w-5 h-5 text-accent" />,
    },
    {
      name: "LinkedIn Network",
      value: socials.linkedin.replace("https://", ""),
      href: socials.linkedin,
      icon: <LinkIcon className="w-5 h-5 text-accent" />,
    },
    {
      name: "Leetcode",
      value: socials.leetcode.replace("https://", ""),
      href: socials.leetcode,
      icon: <LinkIcon className="w-5 h-5 text-accent" />,
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-bg-secondary border-t border-border-color/30"
      aria-label="Contact Information Section"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <SectionTitle
          title="Get In Touch"
          subtitle="Feel free to reach out if you're looking for a developer, have a question, or just want to connect."
          className="text-center flex flex-col items-center"
        />

        <div className="mt-8 max-w-xl mx-auto">
          <p className="text-text-secondary text-base md:text-lg mb-10 leading-relaxed">
            I am currently open to new software engineering positions, project
            collaborations, and freelance opportunities. Drop me an email, and I
            will get back to you as soon as possible.
          </p>

          {/* Primary Call to Action Button */}
          <div className="mb-12">
            <a
              href={`mailto:${socials.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-black font-bold rounded-md hover:bg-transparent hover:text-accent hover:border-accent border border-accent transition-all duration-200 shadow-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
              <SayHelloIcon className="w-5 h-5" />
              Say Hello
            </a>
          </div>

          {/* Individual Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {contactLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name === "Email Address" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-bg-primary rounded-lg border border-border-color hover:border-accent/50 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex-shrink-0 p-2 bg-bg-secondary rounded border border-border-color/40">
                  {link.icon}
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-mono text-text-secondary uppercase tracking-wider">
                    {link.name}
                  </span>
                  <span className="block text-sm font-semibold text-text-primary truncate">
                    {link.value}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
