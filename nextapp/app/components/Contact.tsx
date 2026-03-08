'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Linkedin, MapPin, Send, ExternalLink } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#f97316]/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full bg-[#00d4ff]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#00d4ff]" />
            <span className="text-[#00d4ff] text-sm font-mono tracking-widest uppercase">Contact</span>
            <div className="w-8 h-[2px] bg-[#00d4ff]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let&apos;s Build Something
            <br />
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-[#94a3b8] max-w-xl mx-auto text-lg">
            Whether you have a project in mind, want to discuss a role, or just want to talk tech —
            my inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Email card */}
            <a
              href="mailto:raman.ratnakarsingh@gmail.com"
              className="gradient-border rounded-2xl p-6 card-hover flex items-center gap-4 group block"
            >
              <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00d4ff]/20 transition-colors">
                <Mail size={22} className="text-[#00d4ff]" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#64748b] mb-1 font-mono uppercase tracking-widest">Email</div>
                <div className="text-white font-medium">raman.ratnakarsingh@gmail.com</div>
              </div>
              <ExternalLink size={16} className="text-[#64748b] group-hover:text-[#00d4ff] transition-colors" />
            </a>

            {/* LinkedIn card */}
            <a
              href="https://www.linkedin.com/in/raman-ratnakar-singh-95127288"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-border rounded-2xl p-6 card-hover flex items-center gap-4 group block"
            >
              <div className="w-12 h-12 rounded-xl bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7c3aed]/20 transition-colors">
                <Linkedin size={22} className="text-[#7c3aed]" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#64748b] mb-1 font-mono uppercase tracking-widest">LinkedIn</div>
                <div className="text-white font-medium">raman-ratnakar-singh</div>
              </div>
              <ExternalLink size={16} className="text-[#64748b] group-hover:text-[#7c3aed] transition-colors" />
            </a>

            {/* Location card */}
            <div className="gradient-border rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center flex-shrink-0">
                <MapPin size={22} className="text-[#f97316]" />
              </div>
              <div>
                <div className="text-xs text-[#64748b] mb-1 font-mono uppercase tracking-widest">Location</div>
                <div className="text-white font-medium">Jaipur, Rajasthan, India</div>
                <div className="text-[#64748b] text-sm">Open to remote opportunities worldwide</div>
              </div>
            </div>

            {/* Availability */}
            <div className="gradient-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                <span className="text-emerald-400 font-medium text-sm">Available for new opportunities</span>
              </div>
              <p className="text-[#64748b] text-sm">
                Currently open to senior/lead engineering roles, consulting engagements, and interesting projects.
                Response time: typically within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* CTA / message block */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="gradient-border rounded-2xl p-8"
          >
            <h3 className="text-white font-bold text-xl mb-4">Send a Message</h3>
            <p className="text-[#94a3b8] text-sm mb-6 leading-relaxed">
              I&apos;m always interested in hearing about new projects, opportunities, or just connecting
              with fellow engineers. Reach out and let&apos;s start a conversation.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs text-[#64748b] font-mono uppercase tracking-widest block mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="What's this about?"
                  className="w-full bg-[#0d1120] border border-[#1e293b] rounded-lg px-4 py-3 text-white text-sm placeholder-[#475569] focus:outline-none focus:border-[#00d4ff]/40 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#64748b] font-mono uppercase tracking-widest block mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-[#0d1120] border border-[#1e293b] rounded-lg px-4 py-3 text-white text-sm placeholder-[#475569] focus:outline-none focus:border-[#00d4ff]/40 transition-colors resize-none"
                />
              </div>
            </div>

            <motion.a
              href="mailto:raman.ratnakarsingh@gmail.com"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-semibold hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={16} />
              Send via Email
            </motion.a>

            <p className="text-center text-xs text-[#475569] mt-3">
              Opens your email client with pre-filled details
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
