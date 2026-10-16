import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import emailjs from '@emailjs/browser';

// ─── Replace with your EmailJS credentials ───────────────────────────────────
// 1. Sign up at https://www.emailjs.com/
// 2. Create a service (Gmail, Outlook, etc.) → copy the Service ID
// 3. Create an email template → copy the Template ID
// 4. Go to Account → API Keys → copy your Public Key
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';    // ← replace
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // ← replace
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';    // ← replace
// ─────────────────────────────────────────────────────────────────────────────

const socials = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'Azradilshad86@gmail.com',
    href: 'mailto:Azradilshad86@gmail.com',
  },
  {
    icon: <GithubIcon size={20} />,
    label: 'GitHub',
    value: 'github.com/azrakhan361',
    href: 'https://github.com/azrakhan361',
  },
  {
    icon: <LinkedinIcon size={20} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/azra-bibi-55703a351',
    href: 'https://linkedin.com/in/azra-bibi-55703a351',
  },
];

export default function Contact() {
  const { ref, inView } = useInView(0.15);
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState('idle'); // idle | sending | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim())                          e.name    = 'Name is required.';
    if (!form.email.trim())                         e.email   = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                                    e.email   = 'Enter a valid email.';
    if (!form.message.trim())                       e.message = 'Message is required.';
    else if (form.message.trim().length < 10)       e.message = 'Message is too short.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputCls = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm font-sans bg-[var(--surface)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 transition-all duration-200 ${
      errors[field]
        ? 'border-red-500 focus:ring-red-400'
        : 'border-[var(--border)] focus:ring-[var(--accent)] focus:border-[var(--accent)]'
    }`;

  return (
    <section id="contact" className="relative py-16 sm:py-24 px-4 overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <p className="font-mono text-xs sm:text-sm mb-2" style={{ color: 'var(--accent)' }}>
            03. Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold section-title mx-auto">
            Contact Me
          </h2>
          <p
            className="mt-4 sm:mt-6 text-sm sm:text-base max-w-md mx-auto px-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          {/* Left: social links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3 sm:space-y-4"
          >
            {socials.map(({ icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={`${label}: ${value}`}
                className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] group transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_0_16px_var(--accent-glow)] overflow-hidden"
              >
                <span
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg"
                  style={{
                    background: 'rgba(0,212,255,0.1)',
                    color: 'var(--accent)',
                  }}
                >
                  {icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className="font-mono text-xs mb-0.5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {label}
                  </p>
                  <p className="text-sm font-medium group-hover:text-[var(--accent)] transition-colors truncate">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center p-8 sm:p-10 rounded-2xl border border-green-500/30 bg-green-500/5 gap-4"
              >
                <CheckCircle size={44} className="text-green-400" />
                <h3 className="text-xl font-bold">Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
                  Thanks for reaching out. I'll get back to you soon!
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-outline text-sm py-2 px-6 mt-2"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4 p-4 sm:p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]"
                aria-label="Contact form"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className={inputCls('name')}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputCls('email')}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={handleChange}
                    className={inputCls('message') + ' resize-none'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Error banner */}
                {status === 'error' && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle size={14} /> Something went wrong. Please try again.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
