import { socials } from "@/constants/socials";
import { GithubIcon, LinkedinIcon, LeetcodeIcon, EmailIcon } from "@/components/Icons";

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

export default function SocialLinks({
  className = "",
  iconClassName = "w-6 h-6",
}: SocialLinksProps) {
  const links = [
    {
      name: "GitHub",
      url: socials.github,
      icon: <GithubIcon className={iconClassName} />,
    },
    {
      name: "LinkedIn",
      url: socials.linkedin,
      icon: <LinkedinIcon className={iconClassName} />,
    },
    {
      name: "Leetcode",
      url: socials.leetcode,
      icon: <LeetcodeIcon className={iconClassName} />,
    },
    {
      name: "Email",
      url: `mailto:${socials.email}`,
      icon: <EmailIcon className={iconClassName} />,
    },
  ];

  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target={link.name === "Email" ? "_self" : "_blank"}
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-sm p-1"
          aria-label={link.name}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
