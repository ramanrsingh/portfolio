'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Bot, User, Minimize2 } from 'lucide-react';

const SYSTEM_PROMPT = `You are Raman Ratnakar Singh's Digital Twin — an AI assistant that represents Raman and answers questions about his career, skills, and experience on his behalf.

Speak in first person as Raman. Be conversational, confident, and insightful. Keep answers concise (2-4 sentences usually) unless detail is genuinely needed.

## About Raman
- Full name: Raman Ratnakar Singh
- Current role: Lead Software Engineer at Bacancy Technology (May 2021 – Present, ~4 years)
- Location: Jaipur, Rajasthan, India
- Email: raman.ratnakarsingh@gmail.com
- LinkedIn: linkedin.com/in/raman-ratnakar-singh-95127288

## Career Journey
1. **Bacancy Technology** — Senior / Lead Software Engineer (May 2021 – Present)
   - Leading engineering teams to architect and deliver enterprise-grade Laravel applications
   - AI-augmented development workflows combining Laravel, Python, and modern AI tooling
   - Mentoring junior engineers, driving technical best practices

2. **Aksh Optifibre Ltd.** — Process Member / Web Developer (Feb 2020 – Jan 2021)
   - Maintained akshoptifibre.com and 1stopaksh.in solution portal
   - Built and maintained HRMS portal (hrms.1stopaksh.in)
   - MIS report generation system and FTTH field portal

3. **Reliance Jio** — Deputy Manager, FTTX Automation (Aug 2018 – Feb 2020, Navi Mumbai)
   - Designed GUI for web-based & console-based automation applications
   - Automated reports in the FTTX telecom domain
   - Built real-time charting dashboards for network monitoring
   - Tools to fetch live data from OLT, ONT & BNG network devices

4. **Aksh Optifibre Ltd.** — NOC Engineer / Front End Developer (Aug 2015 – Aug 2018)
   - NOC operations for BSNL IPTV and FTTH
   - Developed IPTV content management and GUI interfaces
   - Maintained core office network infrastructure

## Education
- M.Tech., Computer Science — Suresh Gyan Vihar University (2012–2014)
- B.Tech., Computer Science — Vivekananda Institute Of Technology (2008–2012)

## Skills & Tech Stack
- **Primary**: PHP, Laravel (expert level, ~10 years), Python, REST APIs, MySQL
- **Frontend**: HTML/CSS, JavaScript, Vue.js, React, Tailwind CSS
- **Infrastructure**: Network Engineering, Linux/Server Admin, Git, Docker, CI/CD
- **AI/Modern**: AI-augmented development, prompt engineering, rapid prototyping, automation, system architecture
- **Telecom**: FTTX, IPTV, NOC operations, OLT/ONT/BNG

## Career Philosophy
I started as a Network Engineer and transitioned into software development — that systems-level foundation gives me a unique perspective. I believe in leveraging AI tools to ship faster, automate repetitive work, and focus creative energy on things that matter. I combine rigorous engineering discipline with modern AI-augmented workflows to prototype quickly and deliver production-quality software.

## Availability
Currently open to senior/lead engineering roles, interesting consulting engagements, and ambitious projects. Especially interested in AI-integrated product development.

## Instructions
- Answer questions about career, skills, experience, availability, and background
- If asked about projects or portfolio, mention it's being curated and coming soon
- If asked about salary/compensation, say you prefer to discuss that directly
- If someone wants to hire/collaborate, encourage them to reach out via email
- Stay in character as Raman's digital representation
- Do not make up information not provided above`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What's your current tech stack?",
  "Tell me about your AI workflow",
  "Are you open to new opportunities?",
  "What was your career path?",
];

export default function DigitalTwin() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! I'm Raman's Digital Twin — an AI that represents me. Ask me anything about my career, skills, or experience. I'm happy to chat!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: content.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setStreamingText('');

    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://r-sin.com',
          'X-Title': 'Raman Digital Twin',
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b:free',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages.map(m => ({ role: m.role, content: m.content })),
          ],
          stream: true,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

          for (const line of lines) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content || '';
              fullText += delta;
              setStreamingText(fullText);
            } catch {
              // skip malformed chunks
            }
          }
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: fullText }]);
      setStreamingText('');
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting right now. Please reach out directly at raman.ratnakarsingh@gmail.com.",
        },
      ]);
      setStreamingText('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 md:right-8 z-50 w-[calc(100vw-2rem)] max-w-sm flex flex-col"
            style={{ height: 'min(520px, calc(100vh - 120px))' }}
          >
            <div className="flex flex-col h-full rounded-2xl overflow-hidden border border-[#1e293b] shadow-2xl"
              style={{ background: '#0d1120', boxShadow: '0 0 40px rgba(0, 212, 255, 0.1), 0 25px 50px rgba(0,0,0,0.5)' }}>

              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e293b]"
                style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.08))' }}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#818cf8] flex items-center justify-center text-white font-bold text-sm">
                      R
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0d1120]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm leading-none mb-0.5">Raman&apos;s Digital Twin</div>
                    <div className="text-[#64748b] text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      AI-powered · Ask me anything
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#64748b] hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      msg.role === 'assistant'
                        ? 'bg-gradient-to-br from-[#22d3ee] to-[#818cf8] text-white'
                        : 'bg-[#1e293b] text-[#94a3b8]'
                    }`}>
                      {msg.role === 'assistant' ? 'R' : <User size={12} />}
                    </div>
                    <div className={`max-w-[80%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-[#22d3ee]/20 to-[#818cf8]/20 text-white border border-[#22d3ee]/20 rounded-tr-sm'
                        : 'bg-[#111827] text-[#cbd5e1] border border-[#1e293b] rounded-tl-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}

                {/* Streaming message */}
                {streamingText && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#818cf8] flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
                      R
                    </div>
                    <div className="max-w-[80%] px-3 py-2.5 rounded-2xl rounded-tl-sm bg-[#111827] border border-[#1e293b] text-[#cbd5e1] text-sm leading-relaxed">
                      {streamingText}
                      <span className="cursor-blink text-[#22d3ee]">▋</span>
                    </div>
                  </div>
                )}

                {/* Loading dots */}
                {isLoading && !streamingText && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#818cf8] flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
                      R
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[#111827] border border-[#1e293b] flex items-center gap-1.5">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested questions — only show at start */}
              {messages.length === 1 && (
                <div className="px-4 pb-3 flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map(q => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-[#1e293b] text-[#94a3b8] hover:text-[#22d3ee] hover:border-[#22d3ee]/40 transition-all duration-150 bg-[#111827]"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-4 pb-4 pt-2 border-t border-[#1e293b]">
                <div className="flex items-center gap-2 bg-[#111827] border border-[#1e293b] rounded-xl px-3 py-2 focus-within:border-[#22d3ee]/40 transition-colors">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about my career..."
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-sm text-white placeholder-[#475569] outline-none min-w-0 disabled:opacity-50"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={isLoading || !input.trim()}
                    className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#22d3ee] to-[#818cf8] flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex-shrink-0"
                  >
                    {isLoading ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                  </button>
                </div>
                <p className="text-center text-[10px] text-[#334155] mt-1.5">Powered by AI · Represents Raman</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-8 z-50 w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center"
        style={{
          background: isOpen
            ? 'linear-gradient(135deg, #1e293b, #0f172a)'
            : 'linear-gradient(135deg, #22d3ee, #818cf8)',
          boxShadow: isOpen
            ? '0 4px 20px rgba(0,0,0,0.4)'
            : '0 4px 20px rgba(0,212,255,0.4), 0 0 40px rgba(124,58,237,0.2)',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} className="text-[#94a3b8]" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageSquare size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip on first load */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 2.5 }}
            className="fixed bottom-8 right-20 md:right-24 z-50 pointer-events-none"
          >
            <div className="bg-[#0d1120] border border-[#1e293b] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg"
              style={{ boxShadow: '0 0 20px rgba(0,212,255,0.1)' }}>
              Chat with my Digital Twin ✨
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0d1120] border-r border-t border-[#1e293b] rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
