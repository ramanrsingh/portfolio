# Building a Professional Portfolio Website with Next.js
### A Beginner's Guide — From Zero to Live

---

## Table of Contents

1. [What We Built](#1-what-we-built)
2. [Technology Summary](#2-technology-summary)
3. [How the Project is Structured](#3-how-the-project-is-structured)
4. [High-Level Walkthrough](#4-high-level-walkthrough)
5. [Detailed Code Review](#5-detailed-code-review)
   - [The Design System (globals.css)](#51-the-design-system-globalscss)
   - [The App Entry Points (layout.tsx & page.tsx)](#52-the-app-entry-points-layouttsx--pagetsx)
   - [The Navbar Component](#53-the-navbar-component)
   - [The Hero Section](#54-the-hero-section)
   - [The About Section](#55-the-about-section)
   - [The Journey / Timeline Section](#56-the-journey--timeline-section)
   - [The Skills Section](#57-the-skills-section)
   - [The Portfolio Section](#58-the-portfolio-section)
   - [The Contact Section](#59-the-contact-section)
   - [The Digital Twin AI Chat](#510-the-digital-twin-ai-chat)
6. [Deployment: How It Went Live](#6-deployment-how-it-went-live)
7. [5 Suggestions for Improvement](#7-5-suggestions-for-improvement)

---

## 1. What We Built

We built a **personal portfolio website** for Raman Ratnakar Singh — a Lead Software Engineer with 10+ years of experience. The site is:

- **Fully static** — it's just HTML, CSS, and JavaScript files served from a web server. No database, no backend logic.
- **Visually polished** — dark theme with glowing cyan, purple, and orange accents. Smooth animations throughout.
- **AI-powered** — a floating "Digital Twin" chat widget lets visitors have a conversation with an AI that represents Raman.
- **Professionally deployed** — live at `r-sin.com` on a shared hosting server running nginx.

The final site has these sections:

| Section | Purpose |
|---|---|
| Hero | First impression — name, animated role title, CTA buttons |
| About | Bio, key traits, career stats |
| Journey | Full career timeline + education |
| Skills | Animated skill bars + technology badge cloud |
| Portfolio | Placeholder for future projects |
| Contact | Email, LinkedIn, contact form |
| Digital Twin | Floating AI chatbot answering questions as Raman |

---

## 2. Technology Summary

Think of building a website like building a house. You need different tools for different jobs.

### Next.js — The Framework (the building plan)

**Next.js** is a framework built on top of React. A *framework* is a set of tools and rules that make it easier to build something complex. React itself is a JavaScript library for building user interfaces — but on its own, it doesn't tell you how to organise files, handle routing, or optimise for production.

Next.js adds all of that. Key things it gave us:

- **App Router** — the `app/` folder structure where each file becomes a page or layout
- **Static Export** — ability to compile everything into plain HTML/CSS/JS files (`output: 'export'`)
- **TypeScript support** — built-in, zero configuration needed
- **Optimised builds** — minification, code splitting, and bundling out of the box

> **Analogy:** If React is lumber and nails, Next.js is the prefabricated wall panels — still flexible, but the common work is already done.

### TypeScript — Typed JavaScript (the safety inspector)

Normal JavaScript is *dynamically typed* — you can put any value in any variable and the language won't complain until the code actually runs. **TypeScript** adds *types* — it checks your code before it runs and tells you when something doesn't make sense.

```typescript
// JavaScript — no complaints until runtime
let name = "Raman";
name = 42; // This will cause bugs but JS allows it

// TypeScript — caught at compile time
let name: string = "Raman";
name = 42; // Error: Type 'number' is not assignable to type 'string'
```

For beginners, TypeScript feels like extra work. But it prevents entire categories of bugs and makes your code self-documenting.

### Tailwind CSS — Utility-First Styling (the paint and fixtures)

Traditional CSS means writing a separate `.css` file and naming everything. **Tailwind CSS** works differently — it gives you hundreds of small utility classes you apply directly in your HTML.

```html
<!-- Traditional CSS approach -->
<div class="hero-title">Hello</div>
<!-- Then in hero.css: .hero-title { font-size: 4rem; color: white; font-weight: bold; } -->

<!-- Tailwind approach -->
<div class="text-6xl text-white font-bold">Hello</div>
```

Everything you need is right there in the element. This makes it very fast to build and tweak UIs, and means you rarely need to write custom CSS.

### Framer Motion — Animations (the interior designer)

**Framer Motion** is a React animation library. Instead of writing complex CSS keyframes or JavaScript timers, you just describe what you want:

```tsx
// Without Framer Motion — complex CSS animation
// .element { animation: fadeIn 0.6s ease-out; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

// With Framer Motion — declarative and readable
<motion.div
  initial={{ opacity: 0, y: 30 }}  // starts invisible, 30px down
  animate={{ opacity: 1, y: 0 }}   // animates to visible, in position
  transition={{ duration: 0.6 }}   // over 0.6 seconds
>
  Hello
</motion.div>
```

It also has `useInView` — a hook that tells you when an element enters the visible screen area, so you can trigger animations as the user scrolls.

### Lucide React — Icons (the signage)

**Lucide React** is an icon library. Instead of finding PNG files or writing SVG code by hand, you import named components:

```tsx
import { Mail, Linkedin, ArrowDown } from 'lucide-react';

// Use it like any HTML element
<Mail size={20} className="text-cyan-400" />
```

There are 1,000+ icons available, all consistent in style, and they scale perfectly at any size because they're SVGs.

### OpenRouter — AI Gateway (the phone line to the AI)

**OpenRouter** is a service that provides a single API (interface) to hundreds of different AI language models. Instead of signing up for OpenAI, Anthropic, and Google separately, you use one OpenRouter API key and switch models by changing a single string.

We used the model `openai/gpt-oss-120b:free` — a powerful free model.

---

## 3. How the Project is Structured

```
site/
├── .env                          ← Secret environment variables (API keys)
├── Profile.pdf                   ← Source data for the site content
└── nextapp/                      ← The entire Next.js application
    ├── .env.local                ← Next.js-specific env vars (NEXT_PUBLIC_ prefix)
    ├── next.config.ts            ← Next.js configuration
    ├── package.json              ← Project dependencies list
    ├── tsconfig.json             ← TypeScript configuration
    ├── out/                      ← Built static files (what gets deployed)
    └── app/                      ← Main application code
        ├── layout.tsx            ← Root HTML shell (wraps all pages)
        ├── page.tsx              ← The homepage (assembles all sections)
        ├── globals.css           ← Global styles and design system
        └── components/           ← Individual UI sections
            ├── Navbar.tsx
            ├── Hero.tsx
            ├── About.tsx
            ├── Journey.tsx
            ├── Skills.tsx
            ├── Portfolio.tsx
            ├── Contact.tsx
            ├── Footer.tsx
            └── DigitalTwin.tsx
```

The key insight: **each section of the page is its own file**. This is called *component-based architecture*. Instead of one massive file with all the code, each piece is isolated, self-contained, and reusable.

---

## 4. High-Level Walkthrough

Here is the journey a request takes from your browser to seeing the website.

### Step 1 — You type `r-sin.com` in your browser

Your browser sends an HTTP request to the server at the IP address for `r-sin.com`.

### Step 2 — nginx receives the request

**nginx** is a web server — software that listens for incoming requests and responds with files. It's configured (via FastPanel, the hosting control panel) to look in `/var/www/r_sin_com_usr/data/www/r-sin.com/nextapp/` for files.

### Step 3 — nginx returns `index.html`

When you request `/` (the root), nginx looks for an `index.html` file. We have one, built by Next.js.

### Step 4 — Your browser parses the HTML

The `index.html` is actually mostly empty — it's a shell that tells the browser to load JavaScript files from `_next/static/`. This is normal for React apps.

```html
<!-- index.html is basically this skeleton -->
<html>
  <head>...</head>
  <body>
    <div id="__next"></div>
    <script src="/_next/static/chunks/main.js"></script>
  </body>
</html>
```

### Step 5 — React "hydrates" the page

The JavaScript runs, React takes over, and it renders the actual visible content — all the sections, animations, and interactivity. This process is called **hydration**.

### Step 6 — The user interacts

Scroll animations trigger, the nav becomes sticky, the Digital Twin button appears. When the user clicks the chat button and sends a message, the JavaScript makes a direct call to the OpenRouter API from the browser — no server involved.

### Step 7 — How we built and deployed it

During development, we ran `npm run dev` which starts a local server at `http://localhost:3000`. For production, we ran `npm run build` which compiled everything into static files in the `out/` folder. We then uploaded those files to the server via SCP (Secure Copy, a file transfer tool that uses SSH).

---

## 5. Detailed Code Review

### 5.1 The Design System (`globals.css`)

Before writing any components, we defined the visual language of the site — a set of reusable CSS variables and utility classes.

```css
/* CSS custom properties — like variables in any programming language */
:root {
  --bg-primary: #080b14;    /* Very dark navy — the main background */
  --accent-cyan: #00d4ff;   /* Electric cyan — primary accent */
  --accent-purple: #7c3aed; /* Deep purple — secondary accent */
  --accent-orange: #f97316; /* Warm orange — tertiary accent */
  --text-secondary: #94a3b8;/* Muted slate — for body text */
}
```

**Why use CSS variables?** They let you change the entire site's colour palette by editing one place. If you decide cyan should be slightly different, you change `--accent-cyan` and every element that uses it updates automatically.

#### The Glow Effects

```css
.glow-cyan {
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.1);
}
```

`box-shadow` normally draws a drop shadow under an element. By using `0 0` (no offset — centred on the element itself) and a partially transparent colour (`rgba`), we get a glowing halo effect. We stack two shadows — a smaller, brighter one close in and a larger, softer one further out — to make it look natural.

#### The Grid Background

```css
.grid-bg {
  background-image:
    linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

This draws two sets of repeating lines — one horizontal, one vertical — each just 3% opaque cyan. The result is a subtle grid pattern. The `background-size: 50px 50px` means each grid cell is 50×50 pixels.

#### The Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #f97316 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

This is a clever CSS trick. You apply a gradient as the *background* of the text element, then clip it to the text shape, then make the actual text fill transparent — so the gradient shows through. The result is text that fades from cyan to purple to orange.

#### The Typewriter Cursor

```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.cursor-blink {
  animation: blink 1s infinite;
}
```

`@keyframes` defines an animation sequence. This one makes an element fully visible for the first half of each second, then invisible for the second half — creating the classic blinking cursor effect.

---

### 5.2 The App Entry Points (`layout.tsx` & `page.tsx`)

#### `layout.tsx` — The HTML Shell

Every page on the site shares this wrapper. It's rendered once and doesn't change between pages.

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load fonts from Google Fonts — Next.js handles this automatically
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Metadata is used for SEO — search engines read this
export const metadata: Metadata = {
  title: "Raman Ratnakar Singh — Lead Software Engineer",
  description: "Lead Software Engineer specializing in Laravel, PHP, Python...",
};

// This component wraps every page
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} antialiased`}>
        {children}  {/* ← This is where page.tsx renders */}
      </body>
    </html>
  );
}
```

`{children}` is a React concept — it means "render whatever is passed inside this component". Since `layout.tsx` wraps `page.tsx`, the entire homepage renders where `{children}` appears.

#### `page.tsx` — The Homepage Composition

```tsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// ... all other imports

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Journey />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
      <DigitalTwin />
    </main>
  );
}
```

This file does almost nothing except import and stack the components. Think of it as a table of contents — all the real content is in the individual files. This is the *Single Responsibility Principle* in practice: each file does one thing.

---

### 5.3 The Navbar Component

The navbar has three interesting behaviours: it changes appearance on scroll, it highlights the active section, and it has a mobile menu.

#### Detecting Scroll Position

```tsx
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);  // true when scrolled > 50px
  };
  window.addEventListener('scroll', handleScroll);

  // Cleanup — remove the listener when component unmounts
  return () => window.removeEventListener('scroll', handleScroll);
}, []); // [] means "run this effect once, on mount"
```

**`useState`** is a React hook that stores a value and re-renders the component when it changes. **`useEffect`** runs code in response to component lifecycle events. Here, we attach a scroll listener when the navbar appears, and clean it up when it disappears (to prevent memory leaks).

When `scrolled` is `true`, we apply different CSS:

```tsx
className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  scrolled
    ? 'nav-blur bg-[#080b14]/80 border-b border-[#1e293b]'  // blurred glass effect
    : 'bg-transparent'                                         // fully transparent
}`}
```

The `nav-blur` class applies `backdrop-filter: blur(20px)` — a CSS property that blurs everything behind the element, creating the popular "frosted glass" effect seen in macOS and iOS interfaces.

#### Animated Entry

```tsx
<motion.nav
  initial={{ y: -100, opacity: 0 }}  // starts above the screen, invisible
  animate={{ y: 0, opacity: 1 }}      // slides down to its natural position
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
```

The navbar slides in from above the viewport when the page first loads. `easeOut` means it starts fast and decelerates smoothly to a stop — like something settling rather than hitting a wall.

---

### 5.4 The Hero Section

The hero is the most complex section because of the typewriter animation.

#### The Typewriter Effect

This is implemented entirely in JavaScript, without any external library:

```tsx
const roles = [
  'Lead Software Engineer',
  'Laravel Architect',
  'AI-Augmented Builder',
  'Full Stack Developer',
];

const [roleIndex, setRoleIndex] = useState(0);   // which role we're showing
const [displayText, setDisplayText] = useState(''); // current visible text
const [isDeleting, setIsDeleting] = useState(false); // typing or deleting?
const [charIndex, setCharIndex] = useState(0);    // how many characters shown

useEffect(() => {
  const currentRole = roles[roleIndex];

  const timeout = setTimeout(() => {
    if (!isDeleting) {
      // Typing forward: add one character
      if (charIndex < currentRole.length) {
        setDisplayText(currentRole.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else {
        // Finished typing — pause, then start deleting
        setTimeout(() => setIsDeleting(true), 1800);
      }
    } else {
      // Deleting backward: remove one character
      if (charIndex > 0) {
        setDisplayText(currentRole.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        // Finished deleting — move to next role
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    }
  }, isDeleting ? 50 : 80); // delete faster than typing

  return () => clearTimeout(timeout);
}, [charIndex, isDeleting, roleIndex]);
```

**How it works:** Every 80ms (or 50ms when deleting), a `setTimeout` fires. It checks whether we're typing or deleting, adds or removes one character from `displayText`, and updates `charIndex`. React re-renders the component each time the state changes, showing the new text. The cursor is just a blinking character:

```tsx
<span className="text-[#00d4ff]">{displayText}</span>
<span className="cursor-blink text-[#7c3aed]">_</span>
```

#### Staggered Animations

Each element in the hero animates in sequence, creating a cascading entrance:

```tsx
// Status badge — animates first (delay: 0.2s)
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>

// Name — animates second (delay: 0.3s)
<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>

// Typewriter — animates third (delay: 0.6s)
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>

// Summary text — animates fourth (delay: 0.8s)
<motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
```

By incrementing the `delay`, each piece waits for the previous one to finish before appearing, guiding the visitor's eye naturally down the page.

---

### 5.5 The About Section

The About section introduces the `useInView` hook — animations that trigger on scroll.

#### Scroll-Triggered Animations

```tsx
const ref = useRef(null);  // a reference to the DOM element
const isInView = useInView(ref, {
  once: true,        // only trigger once (don't re-animate on scroll back)
  margin: '-100px'   // trigger 100px before the element enters the viewport
});

// Attach the ref to the section element
<div className="max-w-6xl mx-auto px-6" ref={ref}>

// Then use isInView to control animations
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}  // only animate when in view
  transition={{ duration: 0.6 }}
>
```

`useRef` creates a persistent reference to a DOM element — like pointing a finger at a specific brick in a wall. `useInView` watches that element and returns `true` or `false` depending on whether it's visible. By passing `once: true`, the animation plays once and stays — the element doesn't disappear when you scroll back up.

#### Trait Cards with Data-Driven Rendering

Instead of writing the HTML for each card manually (which would be repetitive and hard to maintain), we define the data in an array and *map* over it:

```tsx
const traits = [
  {
    icon: Network,
    title: 'Infrastructure Roots',
    desc: 'Started as a Network Engineer...',
    color: '#f97316',
  },
  // ... more traits
];

// Render each trait with .map()
{traits.map((trait, i) => (
  <motion.div
    key={trait.title}                          // React needs a unique key
    transition={{ delay: 0.3 + i * 0.1 }}     // stagger: each card is 0.1s after previous
  >
    <trait.icon size={20} style={{ color: trait.color }} />
    <h3>{trait.title}</h3>
    <p>{trait.desc}</p>
  </motion.div>
))}
```

**`.map()`** is a JavaScript array method that transforms every item in an array into a React element. The result is a list of cards with no repetition. To add a new card, you just add an object to the `traits` array — the rendering code doesn't need to change.

---

### 5.6 The Journey / Timeline Section

The timeline uses an alternating left-right layout with a gradient line running through the middle.

#### The Gradient Timeline Line

```tsx
{/* The vertical line */}
<div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] timeline-line opacity-30 md:-translate-x-px" />
```

```css
/* In globals.css */
.timeline-line {
  background: linear-gradient(180deg, #00d4ff, #7c3aed, #f97316);
}
```

The line is `position: absolute` — it's taken out of the normal document flow and positioned relative to its nearest `position: relative` ancestor. `top-0 bottom-0` makes it stretch from the very top to the very bottom of the container. `w-[2px]` makes it exactly 2 pixels wide.

On mobile (`left-6`), the line sits near the left edge. On desktop (`md:left-1/2`), it's centred. `md:` is a Tailwind responsive prefix — it only applies at "medium" screen width and above (768px).

#### Alternating Card Positions

```tsx
{experiences.map((exp, i) => (
  <div className={`relative flex gap-8 ${
    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
  }`}>
    {/* Spacer — pushes content to the correct side on desktop */}
    <div className="hidden md:block w-1/2 flex-shrink-0" />

    {/* The actual card */}
    <div className="ml-14 md:ml-0 md:w-1/2">
      ...
    </div>
  </div>
))}
```

`i % 2 === 0` means "is the index even?" (`%` is the modulo operator — it gives the remainder after division). Even-indexed items use `flex-row` (spacer on right, card on right side), odd-indexed items use `flex-row-reverse` (card on left side). This creates the alternating zigzag layout.

---

### 5.7 The Skills Section

The animated skill bars use a child component with its own scroll detection.

#### The `SkillBar` Component

```tsx
function SkillBar({ name, level, color, delay }: {
  name: string;
  level: number;   // 0-100
  color: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-[#94a3b8]">{name}</span>
        <span className="text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      {/* Track */}
      <div className="h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
        {/* Fill — animates from 0 to level% */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            //                                          ^^ 80 = 50% opacity hex
            boxShadow: `0 0 8px ${color}40`,           // subtle glow on the bar
          }}
        />
      </div>
    </div>
  );
}
```

Notice how **each bar watches its own scroll position** via its own `ref` and `useInView`. This means bars animate individually as the user scrolls into each skill group, rather than all at once.

The `: { name: string; level: number; ... }` after the props is a TypeScript *type annotation*. It tells TypeScript exactly what types each prop should be — if you accidentally pass a string where a number is expected, TypeScript will catch it.

---

### 5.8 The Portfolio Section

This section demonstrates hover state management and conditional rendering.

#### Hover Overlay with CSS

```tsx
<div className="... group relative overflow-hidden">
  {/* Overlay — invisible normally, visible on hover */}
  <div className="absolute inset-0 ... opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <Lock size={14} />
    <span>Coming Soon</span>
  </div>

  {/* Card content */}
  <div className="relative">
    ...
  </div>
</div>
```

**Tailwind groups** work like this: you add `group` to a parent element. Then any child can use `group-hover:` to apply styles when the *parent* is hovered. This lets you create effects where hovering a card changes things inside it — without any JavaScript.

`absolute inset-0` means: position this absolutely, and make `top`, `right`, `bottom`, and `left` all `0` — which stretches the element to completely fill its parent. Combined with `overflow-hidden` on the parent, this creates a perfect overlay.

---

### 5.9 The Contact Section

The contact section demonstrates building interactive form elements with Tailwind and creating visually distinct "card links."

#### Interactive Input Styling

```tsx
<input
  type="text"
  placeholder="What's this about?"
  className="w-full bg-[#0d1120] border border-[#1e293b] rounded-lg px-4 py-3
             text-white placeholder-[#475569]
             focus:outline-none focus:border-[#00d4ff]/40 transition-colors"
/>
```

`focus:outline-none` removes the browser's default blue focus ring. `focus:border-[#00d4ff]/40` replaces it with a subtle cyan glow when the input is active. The `/40` means 40% opacity — so the border becomes a dim cyan rather than the full bright colour. `transition-colors` ensures the border colour change animates smoothly rather than snapping.

---

### 5.10 The Digital Twin AI Chat

This is the most technically involved component. Let's break it down piece by piece.

#### State Management

```tsx
const [isOpen, setIsOpen] = useState(false);           // is the chat panel open?
const [messages, setMessages] = useState<Message[]>([  // conversation history
  { role: 'assistant', content: "Hey! I'm Raman's Digital Twin..." }
]);
const [input, setInput] = useState('');      // current text in the input field
const [isLoading, setIsLoading] = useState(false);     // waiting for API response?
const [streamingText, setStreamingText] = useState(''); // text currently streaming in
```

Each piece of state is a separate `useState`. When *any* of them change, React re-renders the component with the new values. The component always reflects the current state — you never manipulate the DOM directly.

#### The System Prompt

Before sending the user's message to the AI, we prepend a large *system prompt* — instructions that tell the AI who it is and how to behave:

```typescript
const SYSTEM_PROMPT = `You are Raman Ratnakar Singh's Digital Twin — an AI assistant
that represents Raman and answers questions about his career, skills, and experience.

Speak in first person as Raman. Be conversational, confident, and insightful...

## About Raman
- Current role: Lead Software Engineer at Bacancy Technology
- Location: Jaipur, Rajasthan, India
...
```

The system prompt acts as the AI's personality and knowledge base. It contains all of Raman's career history, skills, and instructions on how to handle various situations (salary questions, hire requests, etc.).

#### Calling the OpenRouter API with Streaming

This is where the AI magic happens. We call the API with `stream: true`, which means instead of waiting for the entire response, the API sends it back word-by-word in real time.

```tsx
const sendMessage = async (content: string) => {
  // 1. Add user's message to the conversation immediately
  const userMessage: Message = { role: 'user', content: content.trim() };
  const newMessages = [...messages, userMessage];
  setMessages(newMessages);

  // 2. Make the API call
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b:free',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...newMessages,  // full conversation history so AI has context
      ],
      stream: true,  // <-- the key: send response as a stream
    }),
  });
```

`async/await` is JavaScript's way of handling *asynchronous* operations — things that take time (like an API call) without freezing the browser. `await` pauses execution of this function until the fetch resolves, but doesn't block the rest of the page.

#### Reading the Stream

The API's stream response is a sequence of lines, each containing a JSON chunk of text:

```
data: {"choices":[{"delta":{"content":"Hey"}}]}
data: {"choices":[{"delta":{"content":", I'm"}}]}
data: {"choices":[{"delta":{"content":" Raman"}}]}
data: [DONE]
```

We read these chunks one by one and append each piece to `streamingText`:

```tsx
const reader = response.body?.getReader();  // get a stream reader
const decoder = new TextDecoder();           // convert bytes to text
let fullText = '';

while (true) {
  const { done, value } = await reader.read();  // read one chunk
  if (done) break;

  const chunk = decoder.decode(value, { stream: true });
  const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

  for (const line of lines) {
    const data = line.slice(6);        // remove "data: " prefix
    if (data === '[DONE]') continue;   // skip the final marker

    const parsed = JSON.parse(data);
    const delta = parsed.choices?.[0]?.delta?.content || '';
    fullText += delta;
    setStreamingText(fullText);  // update display in real time
  }
}

// When stream ends, move the completed text to messages
setMessages(prev => [...prev, { role: 'assistant', content: fullText }]);
setStreamingText('');  // clear the streaming display
```

`setStreamingText(fullText)` is called many times per second as new words arrive. Each call triggers a React re-render, which is why you see the text appearing word by word.

#### Rendering Messages

The message list renders differently for user vs. assistant messages:

```tsx
{messages.map((msg, i) => (
  <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
    {/* Avatar */}
    <div className={msg.role === 'assistant'
      ? 'bg-gradient-to-br from-[#00d4ff] to-[#7c3aed]'  // Raman's avatar
      : 'bg-[#1e293b]'                                      // User's avatar
    }>
      {msg.role === 'assistant' ? 'R' : <User size={12} />}
    </div>

    {/* Bubble */}
    <div className={msg.role === 'user'
      ? 'bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20 rounded-tr-sm'  // user bubble
      : 'bg-[#111827] rounded-tl-sm'  // assistant bubble
    }>
      {msg.content}
    </div>
  </div>
))}
```

User messages appear on the right (`flex-row-reverse` swaps the avatar and bubble order). Assistant messages appear on the left. This is the classic chat UI pattern.

#### The Environment Variable

```typescript
const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
```

`process.env` is how JavaScript accesses environment variables. In Next.js, only variables prefixed with `NEXT_PUBLIC_` are included in the client-side bundle — this is a security feature. We defined this in `nextapp/.env.local`:

```
NEXT_PUBLIC_OPENROUTER_API_KEY=sk-or-v1-...
```

---

## 6. Deployment: How It Went Live

Getting the site from our laptop to the internet involved a few steps.

### The Build Command

```bash
npm run build
```

This triggers Next.js's build process, which:
1. Compiles all TypeScript to JavaScript
2. Processes Tailwind CSS — removes all unused classes, minifies the output
3. Bundles all JavaScript files and splits them into chunks for efficient loading
4. Since `output: 'export'` is set, generates static HTML files in `out/`

The key setting in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'export',  // Generate static HTML instead of a Node.js server
};
```

Without `output: 'export'`, Next.js would require a running Node.js process on the server. With it, the output is plain files that any web server (nginx, Apache, even GitHub Pages) can serve.

### The Transfer Command

```bash
scp -i "C:/Users/admin/.ssh/rsin" -P 2200 -r "./out/." r_sin_com_usr@r-sin.com:~/www/r-sin.com/nextapp/
```

`scp` is *Secure Copy Protocol* — it copies files over an SSH connection. Breaking down the flags:
- `-i "...rsin"` — use this private key file to authenticate (like a password, but more secure)
- `-P 2200` — connect on port 2200 (non-standard, more secure than the default 22)
- `-r` — recursive copy (copy the directory and everything inside it)
- `"./out/."` — source: everything inside the `out` folder
- `r_sin_com_usr@r-sin.com:~/www/r-sin.com/nextapp/` — destination on the server

### File Permissions

Linux file permissions control who can read, write, or execute files. After upload, we set:

```bash
find ~/www/r-sin.com/nextapp -type d -exec chmod 755 {} \;  # directories: rwxr-xr-x
find ~/www/r-sin.com/nextapp -type f -exec chmod 644 {} \;  # files: rw-r--r--
```

- `755` on directories: owner can do everything; others can read and enter the directory
- `644` on files: owner can read/write; others can only read
- nginx runs as a different system user, so it needs the "others can read" permission to serve the files

---

## 7. Five Suggestions for Improvement

After reviewing the codebase honestly, here are five meaningful improvements ranked by impact.

---

### Suggestion 1 — Move the AI Chat to a Server-Side API Route

**The problem:** The OpenRouter API key is currently embedded in the client-side JavaScript bundle. Anyone who opens browser DevTools, goes to the Network tab, and watches the API call can see the key. If someone copies it, they can make API calls charged to your account.

**The fix:** Remove `output: 'export'` from `next.config.ts`, switch to running Next.js as a proper server, and create an API route that proxies the OpenRouter call:

```typescript
// nextapp/app/api/chat/route.ts  — runs on the SERVER, never sent to browser
export async function POST(request: Request) {
  const { messages } = await request.json();

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      // process.env (without NEXT_PUBLIC_) is server-only — never exposed
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: 'openai/gpt-oss-120b:free', messages, stream: true }),
  });

  return response; // stream directly to the client
}
```

Then in `DigitalTwin.tsx`, call `/api/chat` instead of OpenRouter directly. The browser never sees the key.

**What this requires:** Running `npm start` as a persistent process on the server (via a process manager like PM2), and configuring nginx to proxy requests to it.

---

### Suggestion 2 — Add a `deploy.sh` Script to Automate Deployment

**The problem:** Deploying currently requires manually running `npm run build` and then a long `scp` command. This is error-prone and easy to forget.

**The fix:** Create a shell script that does everything in one command:

```bash
#!/bin/bash
# deploy.sh — run from the site/ root directory

echo "Building..."
cd nextapp
npm run build

echo "Uploading..."
scp -i "C:/Users/admin/.ssh/rsin" -P 2200 -r "./out/." \
  r_sin_com_usr@r-sin.com:~/www/r-sin.com/nextapp/

echo "Fixing permissions..."
ssh -i "C:/Users/admin/.ssh/rsin" -p 2200 r_sin_com_usr@r-sin.com \
  "find ~/www/r-sin.com/nextapp -type f -exec chmod 644 {} \; && \
   find ~/www/r-sin.com/nextapp -type d -exec chmod 755 {} \;"

echo "Done! Live at r-sin.com"
```

Then deploying becomes: `bash deploy.sh`.

---

### Suggestion 3 — Extract Career Data into a Separate Data File

**The problem:** All the career data (job titles, dates, bullet points) is hardcoded inside the component files (`Journey.tsx`, `Skills.tsx`, etc.). When you want to update your experience, you have to dig through component code to find the right array and edit it carefully, risking accidentally breaking the JSX.

**The fix:** Move all data to a dedicated file:

```typescript
// nextapp/app/data/career.ts
export const experiences = [
  {
    company: 'Bacancy Technology',
    role: 'Senior / Lead Software Engineer',
    period: 'May 2021 – Present',
    // ...
  },
];

export const skills = [
  {
    category: 'Backend',
    skills: [
      { name: 'PHP', level: 95 },
      // ...
    ],
  },
];
```

Then in `Journey.tsx`:

```tsx
import { experiences } from '../data/career';
```

Now updating your portfolio is just editing a data file — no risk of accidentally breaking the layout code.

---

### Suggestion 4 — Add Loading and Error States to the Contact Form

**The problem:** The contact form has an "Send via Email" button that simply opens the user's email client. While this is functional, it gives no feedback and the form inputs (Subject, Message) are silently ignored — they don't pre-fill the email.

**The fix:** Use a `mailto:` URL with query parameters to pre-fill the email client, and add a copy-to-clipboard fallback for mobile users who don't have an email client configured:

```tsx
const handleSend = () => {
  const subject = encodeURIComponent(subjectValue);
  const body = encodeURIComponent(messageValue);
  const mailtoUrl = `mailto:raman.ratnakarsingh@gmail.com?subject=${subject}&body=${body}`;

  window.location.href = mailtoUrl;
};
```

Or even better — integrate with a free form service like **Formspree** or **EmailJS** so the form actually sends an email via API without needing the user's email client at all.

---

### Suggestion 5 — Add a `robots.txt` and `sitemap.xml` for SEO

**The problem:** The site currently has good `<meta>` tags but no `robots.txt` (which tells search engine crawlers how to index the site) or `sitemap.xml` (which lists all the pages for crawlers to discover).

**The fix:** Add both files to `nextapp/public/` — anything in `public/` is served directly at the root path:

```
# nextapp/public/robots.txt
User-agent: *
Allow: /
Sitemap: https://r-sin.com/sitemap.xml
```

```xml
<!-- nextapp/public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://r-sin.com/</loc>
    <lastmod>2026-03-09</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

This is a small change that meaningfully improves how quickly and accurately Google indexes the site. Without it, Google will still find the site eventually, but it may miss content or de-prioritise it.

---

*Tutorial written for Raman Ratnakar Singh's portfolio project — March 2026.*
