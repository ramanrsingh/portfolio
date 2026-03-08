'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';

const experiences = [
  {
    company: 'Bacancy Technology',
    role: 'Senior / Lead Software Engineer',
    period: 'May 2021 – Present',
    duration: '4+ years',
    location: 'Jaipur, India (Remote)',
    type: 'work',
    color: '#00d4ff',
    current: true,
    highlights: [
      'Leading engineering teams to architect and deliver enterprise-grade Laravel applications',
      'Implementing AI-augmented development workflows to accelerate delivery cycles',
      'Combining Laravel, Python, and modern tooling to build scalable, production-ready systems',
      'Mentoring junior engineers and driving technical best practices',
    ],
    tags: ['Laravel', 'PHP', 'Python', 'AI Tools', 'Team Lead'],
  },
  {
    company: 'Aksh Optifibre Ltd.',
    role: 'Process Member (Web Developer)',
    period: 'Feb 2020 – Jan 2021',
    duration: '1 year',
    location: 'Jaipur, Rajasthan',
    type: 'work',
    color: '#7c3aed',
    current: false,
    highlights: [
      'Maintained official website (akshoptifibre.com) and the 1stopaksh solution portal',
      'Maintained HRMS portal (hrms.1stopaksh.in) for internal HR operations',
      'Built MIS report generation system and FTTH portal for field teams',
      'Handled full-stack development and backend architecture',
    ],
    tags: ['PHP', 'Laravel', 'HRMS', 'Portal Development'],
  },
  {
    company: 'Reliance Jio',
    role: 'Deputy Manager – FTTX Automation',
    period: 'Aug 2018 – Feb 2020',
    duration: '1 year 7 months',
    location: 'Navi Mumbai, Maharashtra',
    type: 'work',
    color: '#f97316',
    current: false,
    highlights: [
      'Designed and developed GUI for web-based and console-based automation applications',
      'Automated reports in the FTTX telecom domain, saving hours of manual work',
      'Built real-time data charting and graphical dashboards for network monitoring',
      'Developed tools to fetch live data from OLT, ONT & BNG network devices',
    ],
    tags: ['Automation', 'GUI Development', 'FTTX', 'Telecom', 'Data Visualization'],
  },
  {
    company: 'Aksh Optifibre Ltd.',
    role: 'NOC Engineer / Front End Developer',
    period: 'Aug 2015 – Aug 2018',
    duration: '3 years 1 month',
    location: 'Jaipur, Rajasthan',
    type: 'work',
    color: '#10b981',
    current: false,
    highlights: [
      'NOC operations for BSNL IPTV and FTTH — maintenance and service management',
      'Developed IPTV content management and GUI interfaces',
      'Maintained core office network infrastructure and NOC servers',
      'First exposure to combining networking with frontend development',
    ],
    tags: ['NOC', 'IPTV', 'FTTH', 'HTML', 'Network Engineering'],
  },
];

const education = [
  {
    institution: 'Suresh Gyan Vihar University',
    degree: 'M.Tech., Computer Science',
    period: '2012 – 2014',
    color: '#00d4ff',
  },
  {
    institution: 'Vivekananda Institute Of Technology',
    degree: 'B.Tech., Computer Science',
    period: '2008 – 2012',
    color: '#7c3aed',
  },
];

export default function Journey() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="journey" className="py-28 relative overflow-hidden">
      <div className="absolute left-0 top-1/3 w-[400px] h-[400px] rounded-full bg-[#00d4ff]/4 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#7c3aed]" />
            <span className="text-[#7c3aed] text-sm font-mono tracking-widest uppercase">Career Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            10+ Years of
            <br />
            <span className="gradient-text">Building & Leading</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] timeline-line opacity-30 md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company + exp.period}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className={`relative flex gap-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-2 border-[#080b14] md:-translate-x-2 -translate-y-1 z-10 top-6"
                  style={{ background: exp.color, boxShadow: `0 0 15px ${exp.color}60` }}
                />

                {/* Spacer for desktop alternating layout */}
                <div className="hidden md:block w-1/2 flex-shrink-0" />

                {/* Card */}
                <div className="ml-14 md:ml-0 md:w-1/2 flex-shrink-0">
                  <div className="gradient-border rounded-2xl p-6 card-hover">
                    {/* Company & role */}
                    <div className="flex items-start justify-between mb-4 gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-bold text-lg">{exp.company}</h3>
                          {exp.current && (
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="font-medium" style={{ color: exp.color }}>
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 text-xs text-[#64748b] mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-4">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                          <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: exp.color }} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-xs font-mono"
                          style={{
                            background: `${exp.color}10`,
                            color: exp.color,
                            border: `1px solid ${exp.color}30`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap size={20} className="text-[#f97316]" />
            <h3 className="text-xl font-bold text-white">Education</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {education.map((edu, i) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="gradient-border rounded-xl p-5 card-hover"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${edu.color}20`, border: `1px solid ${edu.color}40` }}
                  >
                    <GraduationCap size={18} style={{ color: edu.color }} />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{edu.degree}</div>
                    <div className="text-[#94a3b8] text-sm mt-0.5">{edu.institution}</div>
                    <div className="text-[#64748b] text-xs mt-1 flex items-center gap-1">
                      <Calendar size={10} />
                      {edu.period}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
