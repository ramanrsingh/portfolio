'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Code2, Network, Zap } from 'lucide-react';

const traits = [
  {
    icon: Network,
    title: 'Infrastructure Roots',
    desc: 'Started as a Network Engineer — deep understanding of systems, protocols, and how the web actually works.',
    color: '#f97316',
  },
  {
    icon: Code2,
    title: 'Product Builder',
    desc: 'Transitioned to full-stack development, specializing in PHP/Laravel ecosystems for enterprise-grade applications.',
    color: '#00d4ff',
  },
  {
    icon: Brain,
    title: 'AI-Augmented Workflow',
    desc: 'Integrating AI tools into every phase of development — from rapid prototyping to intelligent automation.',
    color: '#7c3aed',
  },
  {
    icon: Zap,
    title: 'Vibe Coder',
    desc: 'Combining intuition and modern tooling to ship faster, experiment boldly, and turn ideas into reality.',
    color: '#10b981',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#7c3aed]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#00d4ff]" />
            <span className="text-[#00d4ff] text-sm font-mono tracking-widest uppercase">About</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The Engineer Behind
            <br />
            <span className="gradient-text">the Code</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-5 text-[#94a3b8] text-lg leading-relaxed">
              <p>
                I&apos;m <span className="text-white font-semibold">Raman Ratnakar Singh</span>, a Lead Software Engineer
                based in Jaipur, India. My journey began in network engineering — a foundation that gave me
                a deep appreciation for how systems talk to each other at every layer.
              </p>
              <p>
                Driven by curiosity, I pivoted into software development, where I found my stride with
                <span className="text-[#00d4ff]"> PHP and the Laravel ecosystem</span>. Over the years,
                I&apos;ve built and scaled web applications, HRMS portals, real-time data dashboards,
                and telecom automation tools.
              </p>
              <p>
                Today, I work in an <span className="text-[#7c3aed] font-medium">AI-augmented development workflow</span> —
                combining Laravel, Python, and cutting-edge AI tooling to prototype faster, automate smarter,
                and deliver solutions that matter.
              </p>
              <p>
                I believe the best engineers are curious builders who never stop learning. Currently leading
                engineering at <span className="text-white font-medium">Bacancy Technology</span>,
                building the next generation of scalable software.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { value: '10+', label: 'Years Experience' },
                { value: '4+', label: 'Companies' },
                { value: 'Lead', label: 'Current Role' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="gradient-border rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-[#94a3b8] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Trait cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {traits.map((trait, i) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="gradient-border rounded-xl p-5 card-hover cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${trait.color}20`, border: `1px solid ${trait.color}40` }}
                >
                  <trait.icon size={20} style={{ color: trait.color }} />
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm">{trait.title}</h3>
                <p className="text-[#64748b] text-xs leading-relaxed">{trait.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
