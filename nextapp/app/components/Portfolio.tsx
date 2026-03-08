'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Lock, Sparkles } from 'lucide-react';

const placeholderProjects = [
  {
    title: 'Enterprise HRMS Portal',
    desc: 'Full-featured Human Resource Management System with attendance tracking, payroll, and multi-role access control.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Vue.js'],
    status: 'coming-soon',
    color: '#00d4ff',
  },
  {
    title: 'FTTX Network Automation',
    desc: 'Real-time network monitoring dashboard with automated report generation for telecom infrastructure.',
    tags: ['Python', 'FTTX', 'Data Viz', 'Automation'],
    status: 'coming-soon',
    color: '#7c3aed',
  },
  {
    title: 'AI-Powered SaaS Platform',
    desc: 'Modern SaaS application leveraging AI tooling for intelligent workflow automation and rapid prototyping.',
    tags: ['Laravel', 'AI', 'REST API', 'React'],
    status: 'coming-soon',
    color: '#f97316',
  },
  {
    title: 'MIS Report Engine',
    desc: 'Business intelligence portal with dynamic report generation, charting, and role-based dashboards.',
    tags: ['PHP', 'Laravel', 'MySQL', 'Charts'],
    status: 'coming-soon',
    color: '#10b981',
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="portfolio" className="py-28 relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/4 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#10b981]" />
            <span className="text-[#10b981] text-sm font-mono tracking-widest uppercase">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Work in
            <br />
            <span className="gradient-text">Progress</span>
          </h2>
        </motion.div>

        {/* Coming soon banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-12 gradient-border rounded-2xl p-6 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20 border border-[#00d4ff]/20 flex items-center justify-center flex-shrink-0">
            <Sparkles size={22} className="text-[#00d4ff]" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">Portfolio Coming Soon</h3>
            <p className="text-[#94a3b8] text-sm">
              I&apos;m curating a selection of projects to showcase here — from telecom automation tools
              to AI-powered SaaS applications. Check back soon, or reach out directly to discuss my work.
            </p>
          </div>
        </motion.div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {placeholderProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="gradient-border rounded-2xl p-6 card-hover group relative overflow-hidden"
            >
              {/* Blur overlay */}
              <div className="absolute inset-0 backdrop-blur-[1px] bg-[#080b14]/30 rounded-2xl z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 text-[#94a3b8]">
                  <Lock size={14} />
                  <span className="text-sm font-medium">Coming Soon</span>
                </div>
              </div>

              {/* Card content */}
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}
                  >
                    <ExternalLink size={18} style={{ color: project.color }} />
                  </div>
                  <span
                    className="px-2 py-1 rounded text-xs font-mono"
                    style={{
                      background: `${project.color}10`,
                      color: project.color,
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    Soon
                  </span>
                </div>

                <h3 className="text-white font-bold mb-2">{project.title}</h3>
                <p className="text-[#64748b] text-sm leading-relaxed mb-4">{project.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs font-mono text-[#64748b] bg-[#1e293b]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
