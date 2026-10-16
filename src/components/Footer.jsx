import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const socials = [
  { icon: <GithubIcon size={18} />,   href: 'https://github.com/azrakhan361',                  label: 'GitHub'   },
  { icon: <LinkedinIcon size={18} />, href: 'https://linkedin.com/in/azra-bibi-55703a351',      label: 'LinkedIn' },
  { icon: <Mail size={18} />,         href: 'mailto:Azradilshad86@gmail.com',                   label: 'Email'    },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--border)] py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Copyright */}
        <p
          className="text-xs sm:text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          © {year} Azra Dilshad. All rights reserved.
        </p>

        {/* Social links */}
        <div className="flex gap-4">
          {socials.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_10px_var(--accent-glow)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
