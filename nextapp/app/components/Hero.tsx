'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Terminal } from 'lucide-react';

const roles = [
  'Lead Software Engineer',
  'Laravel Architect',
  'AI-Augmented Builder',
  'Full Stack Developer',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentRole.length) {
            setDisplayText(currentRole.slice(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(currentRole.slice(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            setIsDeleting(false);
            setRoleIndex((roleIndex + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 80
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Radial glow backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#00d4ff]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#7c3aed]/8 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#f97316]/5 blur-[80px] pointer-events-none" />

      {/* Animated corner accents */}
      <div className="absolute top-24 left-8 w-16 h-16 border-t-2 border-l-2 border-[#00d4ff]/30" />
      <div className="absolute top-24 right-8 w-16 h-16 border-t-2 border-r-2 border-[#00d4ff]/30" />
      <div className="absolute bottom-16 left-8 w-16 h-16 border-b-2 border-l-2 border-[#7c3aed]/30" />
      <div className="absolute bottom-16 right-8 w-16 h-16 border-b-2 border-r-2 border-[#7c3aed]/30" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d1120] border border-[#1e293b] text-sm text-[#94a3b8] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
          Available for new opportunities
          <span className="text-[#00d4ff]">•</span>
          Jaipur, India
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-2">
            <span className="text-white">Raman</span>
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            <span className="gradient-text">Ratnakar Singh</span>
          </h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Terminal size={18} className="text-[#00d4ff]" />
          <span className="text-xl md:text-2xl text-[#94a3b8] font-mono">
            <span className="text-[#00d4ff]">{displayText}</span>
            <span className="cursor-blink text-[#7c3aed]">_</span>
          </span>
        </motion.div>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-[#94a3b8] text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          From network infrastructure to AI-augmented software delivery.
          Building scalable systems at{' '}
          <span className="text-white font-medium">Bacancy Technology</span>{' '}
          with{' '}
          <span className="text-[#00d4ff]">Laravel, Python & modern AI tooling</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={() => document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-semibold hover:opacity-90 transition-opacity glow-cyan"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View My Journey
          </motion.button>
          <motion.button
            onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-lg border border-[#1e293b] text-[#94a3b8] hover:text-white hover:border-[#00d4ff]/40 transition-all duration-200 font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Portfolio
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-6 mb-16"
        >
          {[
            { icon: Linkedin, href: 'https://www.linkedin.com/in/raman-ratnakar-singh-95127288', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:raman.ratnakarsingh@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#94a3b8] hover:text-[#00d4ff] transition-colors duration-200 text-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col items-center gap-2 text-[#94a3b8] hover:text-[#00d4ff] transition-colors mx-auto float-animation"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} />
        </motion.button>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-32 left-16 text-[#00d4ff]/10 font-mono text-xs pointer-events-none hidden lg:block">
        <div>{'{'}</div>
        <div className="pl-4">role: &quot;engineer&quot;,</div>
        <div className="pl-4">stack: [&quot;Laravel&quot;, &quot;AI&quot;],</div>
        <div className="pl-4">mode: &quot;vibe coding&quot;</div>
        <div>{'}'}</div>
      </div>

      <div className="absolute bottom-32 right-16 text-[#7c3aed]/10 font-mono text-xs pointer-events-none hidden lg:block text-right">
        <div>git commit -m</div>
        <div>&quot;ship faster with AI&quot;</div>
        <div className="text-[#00d4ff]/10 mt-2">✓ 1 file changed</div>
      </div>
    </section>
  );
}
