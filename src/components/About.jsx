import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Code2, Server, Database, Wrench } from 'lucide-react';

const skillGroups = [
  {
    icon: <Code2 size={16} />,
    label: 'Frontend',
    skills: ['JavaScript', 'React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    icon: <Server size={16} />,
    label: 'Backend',
    skills: ['Node.js', 'Express', 'PHP', 'Laravel', '.NET', 'C#', 'REST API'],
  },
  {
    icon: <Database size={16} />,
    label: 'Database',
    skills: ['MongoDB', 'MySQL', 'SQL Server', 'Mongoose'],
  },
  {
    icon: <Wrench size={16} />,
    label: 'Tools & CMS',
    skills: ['Git', 'GitHub', 'WordPress', 'VS Code', 'Postman', 'Vercel'],
  },
  {
    icon: <Wrench size={16} />,
    label: 'SEO',
    skills: ['On-Page SEO', 'Off-Page SEO', 'WordPress SEO', 'Yoast SEO', 'Google Analytics', 'Keyword Research'],
  },
];

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Done' },
  { value: '5+', label: 'Tech Stacks' },
];

function ProfilePhoto() {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="relative flex-shrink-0 mx-auto md:mx-0"
      style={{ perspective: '800px' }}
    >
      {/* Glow ring */}
      <div
        className="absolute -inset-1 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, var(--accent), transparent, var(--accent))',
          boxShadow: '0 0 24px var(--accent-glow)',
          borderRadius: '1rem',
        }}
      />
      {/* Photo */}
      <div className="relative w-56 h-72 sm:w-72 sm:h-88 max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden border-2 border-[var(--accent)] bg-[var(--surface)]">
        {!imgError ? (
          <img
            src="/profile.png"
            alt="Azra Dilshad — Full Stack Developer"
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          /* Fallback avatar */
          <div
            className="w-full h-full flex items-center justify-center text-6xl sm:text-7xl font-bold"
            style={{ background: 'var(--surface)', color: 'var(--accent)' }}
            aria-label="Avatar placeholder: AD"
          >
            AD
          </div>
        )}
      </div>
      {/* Floating badge */}
      <div
        className="absolute -bottom-3 right-2 sm:-bottom-4 sm:-right-4 px-3 py-1.5 sm:py-2 rounded-xl border border-[var(--border)] text-xs sm:text-sm font-mono font-semibold shadow-lg backdrop-blur-md"
        style={{ color: 'var(--accent)', background: 'var(--card)' }}
      >
        &lt;FullStack /&gt;
      </div>
    </motion.div>
  );
}

export default function About() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="about" className="relative py-16 sm:py-24 px-4 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center md:text-left"
        >
          <p className="font-mono text-xs sm:text-sm mb-2" style={{ color: 'var(--accent)' }}>
            01. Who I Am
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold section-title">About Me</h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-14 items-center md:items-start">
          {/* Left: text + skills */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1 w-full"
          >
            <p
              className="text-sm sm:text-lg leading-relaxed mb-8 text-center md:text-left"
              style={{ color: 'var(--text-secondary)' }}
            >
              I'm <strong className="font-semibold" style={{ color: 'var(--text-primary)' }}>Azra Dilshad</strong>, a Full Stack Developer who builds fast,
              scalable web apps with PHP, .NET, React, Node.js, and MongoDB. I enjoy
              turning complex problems into clean, simple user experiences. Whether
              it's a REST API, a dynamic React UI, or a database schema — I care about
              quality and performance at every layer.
            </p>

            {/* Skill groups */}
            <div className="space-y-5 mb-10">
              {skillGroups.map(({ icon, label, skills }, gi) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + gi * 0.1 }}
                >
                  <div
                    className="flex items-center gap-2 mb-2 font-mono text-xs font-semibold uppercase tracking-widest justify-center md:justify-start"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span style={{ color: 'var(--accent)' }}>{icon}</span>
                    {label}
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center md:justify-start">
                    {skills.map((s) => (
                      <span key={s} className="skill-tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="grid grid-cols-3 gap-3 sm:flex sm:gap-8 max-w-sm mx-auto md:mx-0"
            >
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center sm:text-left">
                  <p
                    className="text-2xl sm:text-3xl font-extrabold"
                    style={{ color: 'var(--accent)' }}
                  >
                    {value}
                  </p>
                  <p
                    className="font-mono text-[0.7rem] sm:text-xs mt-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:sticky md:top-24 mb-4 md:mb-0"
          >
            <ProfilePhoto />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
