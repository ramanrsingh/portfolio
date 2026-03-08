'use client';

import { motion } from 'framer-motion';
import { Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#1e293b] py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] flex items-center justify-center text-white font-bold text-xs">
              R
            </div>
            <span className="text-white font-bold text-sm">
              Raman<span className="text-[#00d4ff]">.</span>
            </span>
          </div>

          {/* Center */}
          <div className="flex items-center gap-1 text-[#64748b] text-sm">
            <span>Built with</span>
            <Heart size={12} className="text-[#f97316] fill-[#f97316]" />
            <span>in Jaipur</span>
            <span className="mx-2 text-[#1e293b]">|</span>
            <span className="font-mono text-xs">Next.js + Tailwind</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/raman-ratnakar-singh-95127288"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#64748b] hover:text-[#7c3aed] transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:raman.ratnakarsingh@gmail.com"
              className="text-[#64748b] hover:text-[#00d4ff] transition-colors"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#1e293b]/50 text-center">
          <p className="text-[#475569] text-xs font-mono">
            © {new Date().getFullYear()} Raman Ratnakar Singh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
