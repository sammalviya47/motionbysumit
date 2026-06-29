'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useInView,
  LayoutGroup,
} from 'framer-motion';
import Lenis from 'lenis';
import { ArrowUpRight, ArrowRight, X, Plus, ExternalLink } from 'lucide-react';

/* -----------------------------------------------------------
   DATA  —  Behance covers on home, Drive videos in work
----------------------------------------------------------- */

const BEHANCE = [
  {
    id: 'b1',
    title: 'Sarvam AI',
    client: 'Sarvam AI',
    category: 'AI / Product Launch',
    cover: 'https://mir-s3-cdn-cf.behance.net/projects/404/d24355245007383.Y3JvcCwxMDgwLDg0NCwwLDExNw.png',
    href: 'https://www.behance.net/gallery/245007383/Sarvam-AI-Product-Launch-Videos',
    style: { top: '7%', left: '5%', w: 290, h: 360, rot: -8, z: 3 },
  },
  {
    id: 'b2',
    title: 'Stylumia',
    client: 'Stylumia',
    category: 'AI / Brand Motion',
    cover: 'https://mir-s3-cdn-cf.behance.net/projects/404/6a6101245035043.Y3JvcCwxMDkzLDg1NSwyNzg2LDA.png',
    href: 'https://www.behance.net/gallery/245035043/Stylumia',
    style: { top: '12%', right: '6%', w: 310, h: 380, rot: 7, z: 4 },
  },
  {
    id: 'b3',
    title: 'Nerve AI',
    client: 'Nerve AI',
    category: 'AI / Product Launch',
    cover: 'https://mir-s3-cdn-cf.behance.net/projects/404/e6819c244958177.Y3JvcCw5OTksNzgyLDQ2MCww.png',
    href: 'https://www.behance.net/gallery/244958177/Nerve-AI-Product-Launch-Video',
    style: { bottom: '10%', left: '12%', w: 270, h: 340, rot: 6, z: 2 },
  },
  {
    id: 'b4',
    title: 'BASE',
    client: 'BASE',
    category: 'Web3 / Explainer',
    cover: 'https://mir-s3-cdn-cf.behance.net/projects/404/a37d2e242815819.Y3JvcCwyNzYxLDIxNjAsNTQwLDA.jpg',
    href: 'https://www.behance.net/gallery/242815819/BASE-Motiongraphics-Explainer',
    style: { bottom: '8%', right: '14%', w: 270, h: 340, rot: -5, z: 2 },
  },
];

const driveThumb = (id, w = 1600) => `https://lh3.googleusercontent.com/d/${id}=w${w}`;
const drivePreview = (id) => `https://drive.google.com/file/d/${id}/preview`;
const driveOpen = (id) => `https://drive.google.com/file/d/${id}/view`;

const WORK = [
  {
    id: 'w1',
    title: 'Sarvam AI — Product Launch',
    client: 'Sarvam AI',
    category: 'AI / Product Film',
    year: '2025',
    driveId: '1fVSFbzlgZv_grMgypIClZ06SxKPtyWFN', // Base Intro.mp4
    color: '#0a1a2a',
    aspect: 'aspect-[16/9]',
    challenge: 'Compress a multi-modal AI model launch into a brand-defining hero film that performs on the launch page, social and decks.',
    outcome: 'Anchored the launch reel and the homepage hero. Played a measurable role in pre-launch sign-ups.',
    tools: ['After Effects', 'Cinema 4D', 'Octane'],
    role: 'Direction, Design, Animation',
  },
  {
    id: 'w2',
    title: 'Agglayer — Motion Identity',
    client: 'Polygon · Agglayer',
    category: 'Web3 / System Film',
    year: '2025',
    driveId: '1LeGaCO3XpUUiel1tDbVDnRJcC-EYoWca', // Agglayer.mp4
    color: '#1a0d24',
    aspect: 'aspect-[9/16]',
    challenge: 'Make a complex aggregation layer feel like a living, breathing settlement network — not a flowchart.',
    outcome: 'Used across keynote, web and social. Cited by ecosystem media as one of the clearest network explainers.',
    tools: ['Cinema 4D', 'Redshift', 'After Effects'],
    role: 'Motion Direction, Animation',
  },
  {
    id: 'w3',
    title: 'Beratrax — UI Motion',
    client: 'Beratrax',
    category: 'Web3 / UI Motion',
    year: '2025',
    driveId: '1NIVV3Ijht4FV3MQpO7q2gVl9euhfrVT0', // Beratrax Ui - Video 02_Final.mp4
    color: '#171a0d',
    aspect: 'aspect-[16/9]',
    challenge: 'Translate the Beratrax product surface into a kinetic, on-brand walkthrough you actually want to finish.',
    outcome: 'Shipped as the main product walkthrough and onboarding asset. Reused across decks and social cutdowns.',
    tools: ['After Effects', 'Figma', 'Lottie'],
    role: 'Motion Design, Animation',
  },
  {
    id: 'w4',
    title: 'Beratrax — Logo Reveal',
    client: 'Beratrax',
    category: 'Web3 / Brand Sting',
    year: '2024',
    driveId: '1Fr132YBCqcWGdXaDl1RC2W9IKVjf2wnS', // Beratrax_Logo.mp4
    color: '#0d141a',
    aspect: 'aspect-[1/1]',
    challenge: 'Build a 6-second logo sting that sets the tonal table for the entire brand motion system.',
    outcome: 'Used as a category lead-in and on all client communications.',
    tools: ['After Effects', 'Cinema 4D'],
    role: 'Motion Identity',
  },
  {
    id: 'w5',
    title: 'Biconomy — Hero Film',
    client: 'Biconomy',
    category: 'Web3 / Hero Film',
    year: '2025',
    driveId: '1ued36GvXmvwvDrV9rYYlw1p3lMoAlyZE', // Biconomy_5.1_1.mp4
    color: '#0a1f1c',
    aspect: 'aspect-[16/9]',
    challenge: 'Build the visual language for Biconomy’s next chapter — abstract, infrastructure, alive.',
    outcome: 'Anchored the main hero film and a series of social cutdowns.',
    tools: ['Cinema 4D', 'Redshift', 'After Effects', 'Houdini'],
    role: 'Direction, FX, Animation',
  },
  {
    id: 'w6',
    title: 'Biconomy — Network',
    client: 'Biconomy',
    category: 'Web3 / Explainer',
    year: '2025',
    driveId: '1fZn4ZGandG5WfNQbhDwYZaWrpT0ijhb2', // Biconomy_Video_7.1.mp4
    color: '#1a120a',
    aspect: 'aspect-[9/16]',
    challenge: 'Explain Biconomy’s account abstraction stack in 60 seconds without flattening it into a flowchart.',
    outcome: 'Used as the technical hero film for partner pitches and developer outreach.',
    tools: ['Cinema 4D', 'After Effects'],
    role: 'Direction, Animation',
  },
  {
    id: 'w7',
    title: 'Bifrost — Network Motion',
    client: 'Bifrost',
    category: 'Web3 / Brand Film',
    year: '2025',
    driveId: '1M7h6EoJgnDhyGg1r1zo25wfBGct_anVq', // Bifrost_Video_3(Final)_6.mp4
    color: '#1f0a14',
    aspect: 'aspect-[16/9]',
    challenge: 'Lift Bifrost’s liquid staking story above the noise with a film that feels like infrastructure poetry.',
    outcome: 'Featured in the launch campaign and across category content.',
    tools: ['Houdini', 'Cinema 4D', 'After Effects'],
    role: 'Direction, FX, Animation',
  },
];

/* -----------------------------------------------------------
   CUSTOM CURSOR
----------------------------------------------------------- */
function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [variant, setVariant] = useState('default');

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => {
      const t = e.target;
      if (t.closest && t.closest('[data-cursor="view"]')) setVariant('view');
      else if (t.closest && t.closest('[data-cursor="play"]')) setVariant('play');
      else if (t.closest && t.closest('[data-cursor="link"]')) setVariant('link');
      else setVariant('default');
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [x, y]);

  const size = variant === 'view' || variant === 'play' ? 96 : variant === 'link' ? 44 : 14;
  const label = variant === 'view' ? 'View' : variant === 'play' ? 'Play' : '';

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[200] hidden md:flex items-center justify-center mix-blend-difference"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="rounded-full bg-white flex items-center justify-center text-black text-[10px] font-medium tracking-wider uppercase"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

/* -----------------------------------------------------------
   MAGNETIC
----------------------------------------------------------- */
function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  );
}

/* -----------------------------------------------------------
   FLOATING HERO CARD — Behance cover image with cursor 3D
----------------------------------------------------------- */
function FloatingCard({ data, mouseX, mouseY, index }) {
  const rotY = useTransform(mouseX, [-1, 1], [-16, 16]);
  const rotX = useTransform(mouseY, [-1, 1], [12, -12]);
  const tx = useTransform(mouseX, [-1, 1], [index % 2 === 0 ? -22 : 22, index % 2 === 0 ? 22 : -22]);
  const ty = useTransform(mouseY, [-1, 1], [-14, 14]);
  const sRotX = useSpring(rotX, { stiffness: 60, damping: 18, mass: 0.6 });
  const sRotY = useSpring(rotY, { stiffness: 60, damping: 18, mass: 0.6 });
  const sTx = useSpring(tx, { stiffness: 40, damping: 14, mass: 0.5 });
  const sTy = useSpring(ty, { stiffness: 40, damping: 14, mass: 0.5 });
  const { top, left, right, bottom, w, h, rot, z } = data.style;

  return (
    <motion.a
      href={data.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.12, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        top, left, right, bottom,
        width: w, height: h, zIndex: z,
        rotateX: sRotX, rotateY: sRotY, x: sTx, y: sTy,
        rotate: rot,
        transformStyle: 'preserve-3d',
      }}
      className="absolute hidden md:block rounded-2xl overflow-hidden glow border border-white/10 bg-white/[0.02] group"
    >
      <img
        src={data.cover}
        alt={data.title}
        loading="lazy"
        draggable="false"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
        <div className="text-[9px] uppercase tracking-[0.25em] text-white/70">{data.category}</div>
        <div className="text-sm text-white font-light mt-0.5">{data.title}</div>
      </div>
    </motion.a>
  );
}

/* -----------------------------------------------------------
   HERO
----------------------------------------------------------- */
function Hero() {
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handle = (e) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative w-full min-h-[110vh] overflow-hidden" style={{ perspective: '1500px' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(120,100,255,0.16),transparent_60%)]" />
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,140,90,0.10),transparent_60%)]" />
      </div>

      <div className="absolute inset-0">
        {BEHANCE.map((b, i) => (
          <FloatingCard key={b.id} data={b} mouseX={mouseX} mouseY={mouseY} index={i} />
        ))}
      </div>

      {/* Frosted blur adjustment layer behind hero text — permanently visible, seamlessly feathered */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] md:w-[80vw] h-[70vh] md:h-[64vh] pointer-events-none z-[5]"
        aria-hidden
      >
        <div
          className="absolute inset-0 backdrop-blur-xl"
          style={{
            WebkitMaskImage:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.42) 25%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.08) 72%, rgba(0,0,0,0) 92%)',
            maskImage:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.42) 25%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.08) 72%, rgba(0,0,0,0) 92%)',
          }}
        />
      </div>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 max-w-7xl mx-auto px-6 pt-[42vh] md:pt-[38vh] text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur text-[10px] uppercase tracking-[0.25em] text-white/60 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available · Bangalore, India
        </motion.div>

        <h1 className="text-[12vw] md:text-[7.5vw] leading-[0.9] tracking-[-0.03em] font-light">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="block shimmer-text"
            >
              Motion that
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block serif italic text-white/95"
            >
              ships product.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 max-w-xl mx-auto text-white/55 text-base md:text-lg leading-relaxed"
        >
          I’m Sumit — a motion graphics designer & filmmaker with 7+ years building product films and motion systems for SaaS, AI and Web3 brands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
        >
          <Magnetic strength={0.4}>
            <a href="#work" data-cursor="link" className="group inline-flex items-center gap-3 rounded-full bg-white text-black pl-6 pr-2 py-2 text-sm font-medium hover:bg-white/90 transition">
              See selected work
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-black text-white group-hover:rotate-45 transition-transform duration-500">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a href="#contact" data-cursor="link" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 hover:text-white hover:border-white/30 transition">
              Start a project <ArrowUpRight className="w-4 h-4" />
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40"
      >
        <span>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}

/* -----------------------------------------------------------
   MARQUEE
----------------------------------------------------------- */
function Marquee() {
  const items = ['SaaS', 'AI', 'Web3', 'Product Film', 'Brand Motion', 'Direction', 'System Design'];
  return (
    <section className="relative border-y border-white/[0.06] py-8 overflow-hidden bg-black">
      <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="flex gap-16 whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((it, i) => (
          <div key={i} className="flex items-center gap-16">
            <span className="text-3xl md:text-5xl serif italic text-white/30">{it}</span>
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* -----------------------------------------------------------
   REVEAL LINE
----------------------------------------------------------- */
function RevealLine({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <span ref={ref} className="block overflow-hidden">
      <motion.span
        initial={{ y: '110%' }}
        animate={inView ? { y: '0%' } : {}}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

/* -----------------------------------------------------------
   ABOUT
----------------------------------------------------------- */
function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  return (
    <section ref={ref} className="relative max-w-7xl mx-auto px-6 py-32 md:py-48">
      <motion.div style={{ y }} className="grid md:grid-cols-12 gap-12 items-end">
        <div className="md:col-span-2">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">01 — Studio</div>
        </div>
        <div className="md:col-span-9">
          <h2 className="text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight font-light">
            <RevealLine><span className="text-white/95">A one-person studio for</span></RevealLine>
            <RevealLine delay={0.1}><span className="serif italic text-white">SaaS, AI &amp; Web3 brands</span></RevealLine>
            <RevealLine delay={0.2}><span className="text-white/40">who refuse to look like everyone else.</span></RevealLine>
          </h2>
        </div>
      </motion.div>
    </section>
  );
}

/* -----------------------------------------------------------
   WORK CARD  (Drive thumbnail, opens case study)
----------------------------------------------------------- */
function WorkCard({ project, onOpen }) {
  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={() => onOpen(project)}
      data-cursor="play"
      className={`relative overflow-hidden rounded-2xl border border-white/[0.06] mb-5 md:mb-6 break-inside-avoid ${project.aspect} group`}
      style={{ backgroundColor: project.color }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
    >
      <motion.div layoutId={`media-${project.id}`} className="absolute inset-0">
        <img
          src={driveThumb(project.driveId, 1600)}
          alt={project.title}
          loading="lazy"
          draggable="false"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 pointer-events-none">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/60 mb-3">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <motion.h3 layoutId={`title-${project.id}`} className="text-xl md:text-2xl font-light tracking-tight text-white leading-tight">
          {project.title}
        </motion.h3>
        <motion.div layoutId={`client-${project.id}`} className="text-sm text-white/50 mt-1">
          {project.client}
        </motion.div>
      </div>

      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center text-white pointer-events-none">
        <Plus className="w-4 h-4" />
      </div>
    </motion.div>
  );
}

/* -----------------------------------------------------------
   WORK SECTION  —  CSS columns masonry (truly aligned)
----------------------------------------------------------- */
function Work({ onOpen }) {
  return (
    <section id="work" className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">02 — Selected Work</div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">
            <span className="text-white">Films, systems &amp;</span>{' '}
            <span className="serif italic text-white/70">moments.</span>
          </h2>
        </div>
        <div className="text-sm text-white/40 max-w-xs">
          A rolling selection from recent SaaS, AI and Web3 work. Click any film to play in full.
        </div>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 md:gap-6">
        {WORK.map((p) => (
          <WorkCard key={p.id} project={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
   CASE STUDY MODAL  (iframe-embeds the Drive video)
----------------------------------------------------------- */
function CaseStudy({ project, onClose, onOpen }) {
  const scrollerRef = useRef(null);

  // Reset modal scroll to top whenever the project changes
  useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
  }, [project?.id]);

  // ESC key to close (keyboard accessibility)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      ref={scrollerRef}
      data-lenis-prevent
      className="fixed inset-0 z-[120] bg-[#060606]/95 backdrop-blur-xl overflow-y-auto overscroll-contain"
      style={{ WebkitOverflowScrolling: 'touch' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <button onClick={onClose} data-cursor="link" className="fixed top-6 right-6 z-[130] w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition">
        <X className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-32">
        <motion.div
          layoutId={`card-${project.id}`}
          className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black"
          style={{ backgroundColor: project.color }}
        >
          <motion.div layoutId={`media-${project.id}`} className="absolute inset-0">
            <iframe
              src={drivePreview(project.driveId)}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="w-full h-full"
              style={{ border: 0 }}
              title={project.title}
            />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-10 mt-12">
          <div className="md:col-span-7">
            <motion.h1 layoutId={`title-${project.id}`} className="text-4xl md:text-6xl font-light tracking-tight leading-[1.05]">
              {project.title}
            </motion.h1>
            <motion.div layoutId={`client-${project.id}`} className="mt-3 text-white/50">
              {project.client} · {project.category} · {project.year}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="mt-12 space-y-10">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-3">The Challenge</div>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">{project.challenge}</p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-3">The Outcome</div>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">{project.outcome}</p>
              </div>
            </motion.div>
          </div>

          <motion.aside initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }} className="md:col-span-5 md:pl-10">
            <div className="sticky top-32 space-y-8 border-l border-white/10 pl-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">Role</div>
                <div className="text-white/90">{project.role}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">Tools</div>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs text-white/80">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">Year</div>
                <div className="text-white/90">{project.year}</div>
              </div>
              <div className="flex flex-col gap-3">
                <Magnetic strength={0.25}>
                  <a
                    href={driveOpen(project.driveId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white/80 hover:text-white hover:border-white/30 transition"
                  >
                    Open in Drive <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <a
                    href="#contact"
                    data-cursor="link"
                    onClick={onClose}
                    className="inline-flex items-center gap-3 rounded-full bg-white text-black px-5 py-3 text-sm font-medium hover:bg-white/90 transition"
                  >
                    Discuss a project like this <ArrowUpRight className="w-4 h-4" />
                  </a>
                </Magnetic>
              </div>
            </div>
          </motion.aside>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.8 }} className="mt-24">
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-6">More from the studio</div>
          <div className="grid md:grid-cols-3 gap-6">
            {WORK.filter((p) => p.id !== project.id).slice(0, 3).map((p) => (
              <button
                key={p.id}
                onClick={() => onOpen(p)}
                data-cursor="play"
                className="text-left group"
              >
                <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
                  <img src={driveThumb(p.driveId, 800)} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="mt-3 text-sm text-white">{p.title}</div>
                <div className="text-xs text-white/40">{p.client}</div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* -----------------------------------------------------------
   CONTACT
----------------------------------------------------------- */
function Contact() {
  return (
    <section id="contact" className="relative max-w-7xl mx-auto px-6 py-32 md:py-48 text-center">
      <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6">03 — Start something</div>
      <h2 className="text-5xl md:text-8xl font-light tracking-tight leading-[0.95]">
        <RevealLine><span className="text-white">Have a launch</span></RevealLine>
        <RevealLine delay={0.1}><span className="serif italic text-white/80">worth remembering?</span></RevealLine>
      </h2>

      <div className="mt-12 flex flex-col md:flex-row gap-4 items-center justify-center">
        <Magnetic strength={0.35}>
          <a href="mailto:hello@shutterbutter.studio" data-cursor="link" className="group inline-flex items-center gap-3 rounded-full bg-white text-black pl-6 pr-2 py-2 text-sm font-medium hover:bg-white/90 transition">
            hello@shutterbutter.studio
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white group-hover:rotate-45 transition-transform duration-500">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </Magnetic>
        <span className="text-white/30 text-sm">or</span>
        <Magnetic strength={0.25}>
          <a href="https://www.behance.net/Sumitlohar97" target="_blank" rel="noopener noreferrer" data-cursor="link" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 hover:text-white hover:border-white/30 transition">
            Full Behance <ArrowUpRight className="w-4 h-4" />
          </a>
        </Magnetic>
      </div>

      <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
        {[
          { k: '7yr', v: 'Practice' },
          { k: '40+', v: 'Films shipped' },
          { k: 'IN', v: 'Bangalore, India' },
        ].map((s) => (
          <div key={s.v} className="border-t border-white/10 pt-6 text-left">
            <div className="text-4xl serif italic text-white">{s.k}</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-2">{s.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
   NAV
----------------------------------------------------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-[90] transition-all duration-500 ${scrolled ? 'py-3 bg-black/40 backdrop-blur-md border-b border-white/[0.05]' : 'py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" data-cursor="link" className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white" />
          <span className="text-sm tracking-[0.2em] uppercase">Sumit Lohar</span>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-sm text-white/60">
          <a href="#work" data-cursor="link" className="hover:text-white transition">Work</a>
          <a href="https://www.behance.net/Sumitlohar97" target="_blank" rel="noopener noreferrer" data-cursor="link" className="hover:text-white transition">Behance</a>
          <a href="#contact" data-cursor="link" className="hover:text-white transition">Contact</a>
        </nav>
        <Magnetic strength={0.3}>
          <a href="#contact" data-cursor="link" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/80 hover:text-white hover:border-white/30 transition">
            Hire <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </Magnetic>
      </div>
    </motion.header>
  );
}

/* -----------------------------------------------------------
   FOOTER
----------------------------------------------------------- */
function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-white/40">
        <div>© 2025 — Sumit Lohar · Shutter Butter Studio</div>
        <div>Made in 60fps · Direction · Motion · Sound</div>
      </div>
    </footer>
  );
}

/* -----------------------------------------------------------
   PAGE ENTRY
----------------------------------------------------------- */
function PageEntry() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1700);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-101%' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[300] bg-black flex items-center justify-center"
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-center">
            <div className="serif italic text-5xl md:text-7xl text-white">Sumit Lohar</div>
            <div className="mt-3 text-[10px] uppercase tracking-[0.4em] text-white/40">Motion · Film · Direction</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -----------------------------------------------------------
   APP
----------------------------------------------------------- */
function App() {
  const [active, setActive] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    let id;
    function raf(time) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    }
    id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Pause Lenis while case-study modal is open so the modal can scroll natively.
  // Resume — and never leave the page in a "stuck" state — on close.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (active) {
      lenis.stop();
    } else {
      lenis.start();
      // Belt-and-suspenders: force-resume on next frame after exit anim
      const t = setTimeout(() => lenis.start(), 50);
      return () => clearTimeout(t);
    }
  }, [active]);

  // Safety net: never leave <html>/<body> with overflow:hidden after close
  useEffect(() => {
    if (!active) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, [active]);

  return (
    <LayoutGroup>
      <main className="relative">
        <div className="grain" />
        <CustomCursor />
        <PageEntry />
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Work onOpen={setActive} />
        <Contact />
        <Footer />

        <AnimatePresence mode="wait">
          {active && (
            <CaseStudy
              project={active}
              onClose={() => setActive(null)}
              onOpen={setActive}
            />
          )}
        </AnimatePresence>
      </main>
    </LayoutGroup>
  );
}

export default App;
