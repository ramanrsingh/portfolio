'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillGroups = [
  {
    category: 'Backend',
    color: '#00d4ff',
    skills: [
      { name: 'PHP', level: 95 },
      { name: 'Laravel', level: 95 },
      { name: 'Python', level: 70 },
      { name: 'REST APIs', level: 90 },
      { name: 'MySQL', level: 85 },
    ],
  },
  {
    category: 'Frontend',
    color: '#7c3aed',
    skills: [
      { name: 'HTML/CSS', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'Vue.js', level: 70 },
      { name: 'React', level: 65 },
      { name: 'Tailwind CSS', level: 80 },
    ],
  },
  {
    category: 'Infrastructure & Tools',
    color: '#f97316',
    skills: [
      { name: 'Network Engineering', level: 90 },
      { name: 'Linux / Server Admin', level: 80 },
      { name: 'Git / Version Control', level: 88 },
      { name: 'Docker', level: 65 },
      { name: 'CI/CD', level: 70 },
    ],
  },
  {
    category: 'AI & Engineering Practices',
    color: '#10b981',
    skills: [
      { name: 'AI-Augmented Dev', level: 88 },
      { name: 'Prompt Engineering', level: 82 },
      { name: 'Rapid Prototyping', level: 90 },
      { name: 'Automation & Scripting', level: 88 },
      { name: 'System Architecture', level: 85 },
    ],
  },
];

const techBadges = [
  'PHP', 'Laravel', 'Python', 'JavaScript', 'TypeScript', 'MySQL', 'PostgreSQL',
  'Redis', 'Docker', 'Linux', 'Git', 'REST API', 'Vue.js', 'React', 'Tailwind',
  'Nginx', 'Apache', 'FTTX', 'IPTV', 'NOC', 'AI Tools', 'Automation',
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-[#94a3b8]">{name}</span>
        <span className="text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[#00d4ff]/4 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#22d3ee]" />
            <span className="text-[#22d3ee] text-sm font-mono tracking-widest uppercase">Skills & Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Tools of the
            <br />
            <span className="gradient-text">Trade</span>
          </h2>
        </motion.div>

        {/* Skill groups */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + gi * 0.1 }}
              className="gradient-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }}
                />
                <h3 className="text-white font-semibold">{group.category}</h3>
              </div>
              {group.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={group.color}
                  delay={0.3 + gi * 0.1 + si * 0.05}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-6">
            <span className="text-[#64748b] text-sm font-mono">// full technology stack</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {techBadges.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.03 }}
                className="skill-tag px-3 py-1.5 rounded-lg text-sm text-[#94a3b8] font-mono cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
