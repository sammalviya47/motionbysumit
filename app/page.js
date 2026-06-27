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
import { ArrowUpRight, ArrowRight, X, Plus } from 'lucide-react';

/* DATA — Cloudinary demo videos in .webm (universally supported, codec-friendly) */
const C = (path) => `https://res.cloudinary.com/demo/video/upload/${path}.webm`;
const V = {
  v1: C('elephants'),
  v2: C('sea_turtle'),
  v3: C('dog'),
  v4: C('v1689789988/samples/dance-2'),
  v5: C('samples/cld-sample-video'),
  v6: C('e_hue:80/elephants'),
  v7: C('e_hue:200/sea_turtle'),
  v8: C('e_saturation:-60,e_hue:140/dog'),
  v9: C('e_blur:200,e_hue:300/v1689789988/samples/dance-2'),
  v10: C('e_negate/sea_turtle'),
  v11: C('e_hue:-90/samples/cld-sample-video'),
  v12: C('e_grayscale,e_brightness:30/elephants'),
};

const HERO_REELS = [
  { id: 'h1', src: V.v6, style: { top: '8%', left: '6%', w: 280, h: 360, rot: -8, z: 3 } },
  { id: 'h2', src: V.v2, style: { top: '14%', right: '8%', w: 300, h: 380, rot: 7, z: 4 } },
  { id: 'h3', src: V.v9, style: { bottom: '12%', left: '14%', w: 260, h: 340, rot: 6, z: 2 } },
  { id: 'h4', src: V.v4, style: { bottom: '10%', right: '16%', w: 260, h: 340, rot: -5, z: 2 } },
  { id: 'h5', src: V.v11, style: { top: '38%', left: '42%', w: 220, h: 290, rot: 2, z: 5 } },
];

const PROJECTS = [
  { id: 'p1', title: 'Nebula AI — Launch Film', client: 'Nebula AI', category: 'AI / Product Film', year: '2025', span: 'tall', src: V.v9, color: '#1a1a2e', challenge: 'Translate an abstract intelligence layer into a tactile, cinematic product film without resorting to clichéd particle systems.', outcome: 'A 60-second hero film with 92% retention on the launch page and a 3.4× lift in qualified demos in the first month.', tools: ['Cinema 4D', 'Redshift', 'After Effects', 'Houdini'], role: 'Direction, Design, Animation' },
  { id: 'p2', title: 'Helio — SaaS Brand Motion', client: 'Helio Cloud', category: 'SaaS / Brand Film', year: '2025', span: 'wide', src: V.v6, color: '#0a1a2a', challenge: 'Build a motion language that scales from a 6-second product loop to a 90-second category narrative.', outcome: 'Shipped a motion system used across 14 surfaces. Lifted homepage time-on-page by 41%.', tools: ['After Effects', 'Figma', 'Lottie', 'Webflow'], role: 'Motion Direction, System Design' },
  { id: 'p3', title: 'Lumen Protocol', client: 'Lumen Labs', category: 'Web3 / Explainer', year: '2024', span: 'short', src: V.v11, color: '#0d0a24', challenge: 'Explain a zk-rollup architecture in 75 seconds, without losing technical credibility.', outcome: '480k organic views in 6 weeks. Cited by three top-10 crypto publications.', tools: ['Blender', 'After Effects', 'Cavalry'], role: 'Concept, Animation' },
  { id: 'p4', title: 'Arc — Field Notes', client: 'The Browser Company', category: 'Product / Editorial', year: '2024', span: 'tall', src: V.v4, color: '#1f0a14', challenge: 'Translate hand-illustrated stills into a kinetic editorial that breathes on a long-form page.', outcome: 'Featured on the Arc release page; played a measurable role in a 2.1× sign-up week.', tools: ['After Effects', 'Procreate', 'Cavalry'], role: 'Animation Direction' },
  { id: 'p5', title: 'Vela — Series A Sizzle', client: 'Vela', category: 'AI / Investor Film', year: '2025', span: 'square', src: V.v7, color: '#0b1f1c', challenge: 'Compress 18 months of product evolution into a 45-second tone film for an investor roadshow.', outcome: 'Closed a $48M Series A. The film is still pinned on the founder\u2019s deck.', tools: ['After Effects', 'Cinema 4D', 'Octane'], role: 'Direction, Edit, Sound' },
  { id: 'p6', title: 'Orbit DAO — Governance', client: 'Orbit', category: 'Web3 / System Film', year: '2024', span: 'wide', src: V.v10, color: '#171a0d', challenge: 'Make on-chain governance feel like a living organism, not a flowchart.', outcome: 'Cited as the clearest explanation of meta-governance to date by a16z crypto.', tools: ['Houdini', 'Redshift', 'After Effects'], role: 'Direction, FX, Animation' },
  { id: 'p7', title: 'Pulse — Onboarding Loops', client: 'Pulse Health', category: 'SaaS / UI Motion', year: '2025', span: 'short', src: V.v2, color: '#0a1a24', challenge: 'Design 22 onboarding loops that load in under 80kb each and still feel uniquely Pulse.', outcome: 'Reduced first-task abandonment by 28%. Library now shipped across three products.', tools: ['After Effects', 'Lottie', 'Rive'], role: 'Motion System, Animation' },
  { id: 'p8', title: 'Mirage — AI Identity', client: 'Mirage', category: 'AI / Brand Identity', year: '2025', span: 'tall', src: V.v12, color: '#1a120a', challenge: 'Build a brand motion identity that performs as a 1-second sting and a 2-minute keynote piece.', outcome: 'Rolled out across keynote, web, social and product. Won a Brand New "Noted" mention.', tools: ['Cinema 4D', 'Octane', 'After Effects'], role: 'Motion Identity Director' },
];

/* CUSTOM CURSOR */
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

  const size = variant === 'view' ? 96 : variant === 'link' ? 44 : 14;

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
        {variant === 'view' && <span>View</span>}
      </motion.div>
    </motion.div>
  );
}

/* MAGNETIC */
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

/* IN-VIEW VIDEO */
function InViewVideo({ src, className = '', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    // Try playing once mounted
    const tryPlay = () => {
      const p = el.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    tryPlay();

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          try { el.pause(); } catch (e) {}
        }
      });
    }, { threshold: 0.05, rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, [src]);
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      className={className}
      {...rest}
    />
  );
}

/* FLOATING CARD */
function FloatingCard({ data, mouseX, mouseY, index }) {
  const rotY = useTransform(mouseX, [-1, 1], [-18, 18]);
  const rotX = useTransform(mouseY, [-1, 1], [12, -12]);
  const tx = useTransform(mouseX, [-1, 1], [index % 2 === 0 ? -24 : 24, index % 2 === 0 ? 24 : -24]);
  const ty = useTransform(mouseY, [-1, 1], [-16, 16]);
  const sRotX = useSpring(rotX, { stiffness: 60, damping: 18, mass: 0.6 });
  const sRotY = useSpring(rotY, { stiffness: 60, damping: 18, mass: 0.6 });
  const sTx = useSpring(tx, { stiffness: 40, damping: 14, mass: 0.5 });
  const sTy = useSpring(ty, { stiffness: 40, damping: 14, mass: 0.5 });
  const { top, left, right, bottom, w, h, rot, z } = data.style;

  return (
    <motion.div
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
      className="absolute hidden md:block rounded-2xl overflow-hidden glow border border-white/10 bg-white/[0.02]"
    >
      <InViewVideo src={data.src} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
}

/* HERO */
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
        {HERO_REELS.map((r, i) => (
          <FloatingCard key={r.id} data={r} mouseX={mouseX} mouseY={mouseY} index={i} />
        ))}
      </div>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 max-w-7xl mx-auto px-6 pt-[42vh] md:pt-[38vh] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur text-[10px] uppercase tracking-[0.25em] text-white/60 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Booking Q3 · 2025
        </motion.div>

        <h1 className="text-[14vw] md:text-[7.5vw] leading-[0.9] tracking-[-0.03em] font-light">
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
          I direct cinematic product films and motion systems for SaaS, AI and Web3 companies preparing to be noticed — and remembered.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
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

/* MARQUEE */
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

/* REVEAL LINE */
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

/* ABOUT */
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

/* PROJECT CARD */
function ProjectCard({ project, onOpen }) {
  const spanClass =
    project.span === 'tall' ? 'md:row-span-2 aspect-[3/4]' :
    project.span === 'wide' ? 'md:col-span-2 aspect-[16/9]' :
    project.span === 'square' ? 'aspect-square' :
    'aspect-[4/5]';

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={() => onOpen(project)}
      data-cursor="view"
      className={`masonry-item group relative overflow-hidden rounded-2xl border border-white/[0.06] ${spanClass}`}
      style={{ backgroundColor: project.color }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <motion.div layoutId={`media-${project.id}`} className="absolute inset-0">
        <InViewVideo src={project.src} className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 pointer-events-none" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/60 mb-3">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <motion.h3 layoutId={`title-${project.id}`} className="text-xl md:text-2xl font-light tracking-tight text-white">
          {project.title}
        </motion.h3>
        <motion.div layoutId={`client-${project.id}`} className="text-sm text-white/50 mt-1">
          {project.client}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center text-white pointer-events-none"
      >
        <Plus className="w-4 h-4" />
      </motion.div>
    </motion.div>
  );
}

/* PORTFOLIO */
function Portfolio({ onOpen }) {
  return (
    <section id="work" className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="flex items-end justify-between mb-12 md:mb-16">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">02 — Selected Work</div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">
            <span className="text-white">Films, systems &amp;</span>{' '}
            <span className="serif italic text-white/70">moments.</span>
          </h2>
        </div>
        <div className="hidden md:block text-sm text-white/40 max-w-xs">
          A rolling selection. Hover to peek, click to step inside the case study.
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 auto-rows-[260px] md:auto-rows-[280px]">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

/* CASE STUDY */
function CaseStudy({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[120] bg-[#060606]/95 backdrop-blur-xl overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button onClick={onClose} data-cursor="link" className="fixed top-6 right-6 z-[130] w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition">
        <X className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-32">
        <motion.div
          layoutId={`card-${project.id}`}
          className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/10"
          style={{ backgroundColor: project.color }}
        >
          <motion.div layoutId={`media-${project.id}`} className="absolute inset-0">
            <InViewVideo src={project.src} className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
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
              <Magnetic strength={0.3}>
                <a href="#contact" data-cursor="link" onClick={onClose} className="inline-flex items-center gap-3 rounded-full bg-white text-black px-5 py-3 text-sm font-medium hover:bg-white/90 transition">
                  Discuss a project like this <ArrowUpRight className="w-4 h-4" />
                </a>
              </Magnetic>
            </div>
          </motion.aside>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.8 }} className="mt-24">
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-6">Process Stills</div>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.filter((p) => p.id !== project.id).slice(0, 2).map((p) => (
              <div key={p.id} className="aspect-video rounded-2xl overflow-hidden border border-white/10">
                <InViewVideo src={p.src} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* CONTACT */
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
          <a href="mailto:hello@atlasmori.studio" data-cursor="link" className="group inline-flex items-center gap-3 rounded-full bg-white text-black pl-6 pr-2 py-2 text-sm font-medium hover:bg-white/90 transition">
            hello@atlasmori.studio
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white group-hover:rotate-45 transition-transform duration-500">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </Magnetic>
        <span className="text-white/30 text-sm">or</span>
        <Magnetic strength={0.25}>
          <a href="#" data-cursor="link" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 hover:text-white hover:border-white/30 transition">
            Book a 20-min intro <ArrowUpRight className="w-4 h-4" />
          </a>
        </Magnetic>
      </div>

      <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
        {[
          { k: '47', v: 'Films shipped' },
          { k: '14', v: 'Brand systems' },
          { k: '6yr', v: 'Studio practice' },
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

/* NAV */
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
          <span className="text-sm tracking-[0.2em] uppercase">Atlas Mori</span>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-sm text-white/60">
          <a href="#work" data-cursor="link" className="hover:text-white transition">Work</a>
          <a href="#" data-cursor="link" className="hover:text-white transition">Studio</a>
          <a href="#" data-cursor="link" className="hover:text-white transition">Process</a>
        </nav>
        <Magnetic strength={0.3}>
          <a href="#contact" data-cursor="link" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/80 hover:text-white hover:border-white/30 transition">
            Contact <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </Magnetic>
      </div>
    </motion.header>
  );
}

/* FOOTER */
function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-white/40">
        <div>© 2025 — Atlas Mori Studio</div>
        <div>Made in 60fps · Direction · Motion · Sound</div>
      </div>
    </footer>
  );
}

/* PAGE ENTRY */
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
            <div className="serif italic text-5xl md:text-7xl text-white">Atlas Mori</div>
            <div className="mt-3 text-[10px] uppercase tracking-[0.4em] text-white/40">Motion Studio</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* APP */
function App() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let id;
    function raf(time) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    }
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

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
        <Portfolio onOpen={setActive} />
        <Contact />
        <Footer />

        <AnimatePresence mode="wait">
          {active && <CaseStudy project={active} onClose={() => setActive(null)} />}
        </AnimatePresence>
      </main>
    </LayoutGroup>
  );
}

export default App;
