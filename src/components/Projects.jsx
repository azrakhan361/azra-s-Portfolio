import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { projects } from '../data/projects';

function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="project-card flex flex-col rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)]"
      aria-label={`Project: ${project.title}`}
    >
      {/* Screenshot */}
      <div
        className="relative h-44 overflow-hidden"
        style={{ background: 'var(--surface)' }}
      >
        {!imgError ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="font-mono text-4xl font-bold opacity-20"
              style={{ color: 'var(--accent)' }}
            >
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-bold mb-2">{project.title}</h3>
        <p
          className="text-sm leading-relaxed mb-4 flex-1"
          style={{ color: 'var(--text-secondary)' }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="skill-tag text-[0.65rem]">
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 sm:gap-3">
          {project.live ? (
            <>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo of ${project.title}`}
                className="btn-primary text-xs sm:text-sm py-2 px-2.5 sm:px-4 flex-1 justify-center"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repository for ${project.title}`}
                className="btn-outline text-xs sm:text-sm py-2 px-2.5 sm:px-4 flex-1 justify-center"
              >
                <GithubIcon size={14} /> GitHub
              </a>
            </>
          ) : (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              className="btn-primary text-xs sm:text-sm py-2.5 px-4 w-full justify-center"
            >
              <GithubIcon size={15} /> View Code on GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="projects" className="relative py-16 sm:py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <p className="font-mono text-xs sm:text-sm mb-2" style={{ color: 'var(--accent)' }}>
            02. What I've Built
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold section-title mx-auto">
            Projects
          </h2>
        </motion.div>

        {/* Grid */}
        {inView && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
