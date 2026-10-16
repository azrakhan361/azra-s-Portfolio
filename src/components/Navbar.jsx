import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const navLinks = [
  { label: 'Home',     href: '#home'     },
  { label: 'About',   href: '#about'    },
  { label: 'Projects',href: '#projects' },
  { label: 'Contact', href: '#contact'  },
];

export default function Navbar({ isDark, toggleTheme }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeId, setActiveId]   = useState('home');

  /* ── Sticky shadow on scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Prevent body scroll when mobile menu is open ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  /* ── Close menu on desktop resize ── */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ── Active section highlight ── */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <header
      role="banner"
      style={menuOpen ? { backgroundColor: 'var(--bg)' } : undefined}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        menuOpen
          ? 'inset-0 flex flex-col h-screen'
          : (scrolled ? 'glass shadow-md' : 'bg-transparent')
      }`}
    >
      <nav
        className="max-w-6xl w-full mx-auto px-4 sm:px-8 h-16 flex items-center justify-between flex-shrink-0"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          className="font-mono font-bold text-lg tracking-tight"
          style={{ color: 'var(--accent)' }}
          aria-label="Home"
        >
          &lt;Azra /&gt;
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none" role="list">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[var(--accent)] ${
                  activeId === href.slice(1)
                    ? 'text-[var(--accent)] font-semibold'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          {/* Hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition-all hover:border-[var(--accent)] cursor-pointer"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 w-full max-w-sm mx-auto flex flex-col justify-between px-6 py-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col items-center justify-center gap-3 my-auto w-full">
              {navLinks.map(({ label, href }, index) => {
                const isActive = activeId === href.slice(1);
                return (
                  <button
                    key={href}
                    type="button"
                    onClick={() => handleNavClick(href)}
                    className="w-full py-3.5 px-5 rounded-xl flex items-center justify-between text-base font-semibold transition-all border cursor-pointer"
                    style={{
                      backgroundColor: isActive ? 'var(--surface)' : 'transparent',
                      borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                      color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs opacity-60">0{index + 1}.</span>
                      <span>{label}</span>
                    </div>
                    <ArrowUpRight
                      size={18}
                      style={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Bottom social footer in mobile menu */}
            <div
              className="pt-6 border-t flex flex-col items-center gap-3 mt-auto"
              style={{ borderColor: 'var(--border)' }}
            >
              <p className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                Let's connect
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/azrakhan361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border transition-all"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text-secondary)',
                  }}
                  aria-label="GitHub"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/azra-bibi-55703a351"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border transition-all"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text-secondary)',
                  }}
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
