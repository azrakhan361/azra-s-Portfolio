import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ChevronDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const roles = ['Full Stack Developer', '.NET Developer', 'SEO Executive', 'Problem Solver'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  /* ── Typing animation ── */
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!deleting && charIndex > current.length) {
      // pause then start deleting
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((c) => c - 1);
      }, 45);
    } else if (deleting && charIndex < 0) {
      setDeleting(false);
      setCharIndex(0);
      setRoleIndex((r) => (r + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-16"
    >
      {/* Greeting badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] mb-6 shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="font-mono text-xs text-[var(--text-secondary)]">
          Open to opportunities
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-3xl min-[360px]:text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-4"
      >
        Hi, I'm{' '}
        <span style={{ color: 'var(--accent)' }} className="inline-block">
          Azra Dilshad
        </span>
      </motion.h1>

      {/* Typing role */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg min-[360px]:text-xl sm:text-2xl md:text-3xl font-semibold mb-4 min-h-[2.5rem] flex items-center justify-center gap-1"
      >
        <span style={{ color: 'var(--text-secondary)' }}>{displayed}</span>
        <span
          className="inline-block w-0.5 h-5 sm:h-7 ml-0.5 rounded"
          style={{ background: 'var(--accent)', animation: 'blink 0.8s step-end infinite' }}
        />
      </motion.div>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="max-w-xl text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10 px-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        I build fast, scalable web apps with PHP, .NET, React, Node.js, and MongoDB —
        turning complex problems into clean, simple user experiences.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-xs sm:max-w-none px-2 sm:px-0 mb-10 sm:mb-14"
      >
        <button
          onClick={() => scrollTo('projects')}
          className="btn-primary w-full sm:w-auto justify-center"
          aria-label="View projects"
        >
          View Projects <ArrowRight size={16} />
        </button>
        <button
          onClick={() => scrollTo('contact')}
          className="btn-outline w-full sm:w-auto justify-center"
          aria-label="Contact me"
        >
          Contact Me <Mail size={16} />
        </button>
      </motion.div>

      {/* Social icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}
        className="flex gap-4 sm:gap-5 items-center mb-12 sm:mb-16"
      >
        {[
          {
            href: 'https://github.com/azrakhan361',
            label: 'GitHub profile',
            icon: <GithubIcon size={20} />,
          },
          {
            href: 'https://linkedin.com/in/azra-bibi-55703a351',
            label: 'LinkedIn profile',
            icon: <LinkedinIcon size={20} />,
          },
          {
            href: 'mailto:Azradilshad86@gmail.com',
            label: 'Send email',
            icon: <Mail size={20} />,
          },
        ].map(({ href, label, icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-11 h-11 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_14px_var(--accent-glow)]"
            style={{ color: 'var(--text-secondary)' }}
          >
            {icon}
          </a>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, y: { repeat: Infinity, duration: 1.5 } }}
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}
