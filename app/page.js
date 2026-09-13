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
import { ArrowUpRight, ArrowRight, X, Plus, ExternalLink, Mail } from 'lucide-react';

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
    title: 'KOSH Money',
    client: 'KOSH · Spacekayak',
    category: 'Fintech / Product Film',
    cover: 'https://mir-s3-cdn-cf.behance.net/projects/404/b40888252230717.Y3JvcCw4MDgsNjMyLDAsMA.jpg',
    href: 'https://www.behance.net/gallery/252230717/KOSH-Money-Global-Finance-Product-Launch-Film',
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

/* Behance CDN media (real project banners from sumit's Behance) */
const B = 'https://mir-s3-cdn-cf.behance.net/project_modules';
const COVER = 'https://mir-s3-cdn-cf.behance.net/projects/404';
const YT_THUMB = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

const WORK = [
  {
    id: 'w1',
    pid: '245007383',
    yt: '8YhT7TTeV8g',
    title: 'Sarvam AI — Bulbul',
    client: 'Sarvam AI',
    category: 'AI / Product Films',
    year: '2025',
    banner: `${COVER}/d24355245007383.Y3JvcCwxMDgwLDg0NCwwLDExNw.png`,
    href: 'https://www.behance.net/gallery/245007383/Sarvam-AI-Product-Launch-Videos',
    aspect: 'aspect-video',
    color: '#1a1a2e',
    challenge: 'A series of product launch videos for Sarvam AI, presented at the India AI Summit — Sarvam Akshar, Bulbul, Studio and Samvaad — each showcasing distinct AI capabilities.',
    outcome: 'Delivered as launch reels used across the AI Summit stage, launch pages, social and product UI. Gradient shape animations shipped into the product/web system.',
    tools: ['After Effects', 'Premiere Pro', 'Figma'],
    role: 'Motion Direction, Animation, Edit',
  },
  {
    id: 'w2',
    pid: '245035043',
    yt: 'JlcXL_kodMg',
    title: 'Stylumia — Orbix Launch',
    client: 'Stylumia AI',
    category: 'AI / Retail / GenAI',
    year: '2025',
    banner: `${COVER}/382dc2245035043.Y3JvcCw4MDgsNjMyLDAsMA.jpg`,
    href: 'https://www.behance.net/gallery/245035043/Stylumia',
    aspect: 'aspect-video',
    color: '#0a1a2a',
    challenge: 'Motion graphics for the launch of Orbix — Stylumia’s GenAI retail intelligence product — plus a 24-hour turnaround showcase film for the Stylumia × Increff booth in the USA.',
    outcome: 'Hi-fidelity GIF animations shipped across the Orbix website; the collaborative film delivered on time for the US booth activation.',
    tools: ['After Effects', 'Premiere Pro'],
    role: 'Motion Design, Animation',
  },
  {
    id: 'w3',
    pid: '244958177',
    yt: 'fws5vy2tKqM',
    title: 'Nerve AI — Product Launch Video',
    client: 'Nerve',
    category: 'AI / Storytelling Film',
    year: '2025',
    banner: `${COVER}/e6819c244958177.Y3JvcCw5OTksNzgyLDQ2MCww.png`,
    href: 'https://www.behance.net/gallery/244958177/Nerve-AI-Product-Launch-Video',
    aspect: 'aspect-video',
    color: '#0d0a24',
    challenge: 'A 3:20 product storytelling film featuring Nerve’s co-founders — combining live-action, illustration and motion to move beyond the talking-head format.',
    outcome: 'Anchored the Nerve launch page and social cutdowns. Set the tonal foundation for their brand’s ongoing motion identity.',
    tools: ['After Effects', 'Premiere Pro', 'Illustrator'],
    role: 'Direction, Animation, Edit',
  },
  {
    id: 'w4',
    pid: '244951459',
    yt: 'LoephbJNciI',
    title: 'Assurekit — Website Motion',
    client: 'Assurekit',
    category: 'SaaS / UI Motion / GIFs',
    year: '2025',
    banner: `${COVER}/f25f29244951459.Y3JvcCwxMzUxLDEwNTcsMCwxMDA.png`,
    href: 'https://www.behance.net/gallery/244951459/Assurekit-Website-Motion-Graphics-GIF-Animations',
    aspect: 'aspect-video',
    color: '#1f0a14',
    challenge: 'Transform static website sections of an insurance-tech SaaS into dynamic touchpoints — a set of loopable, brand-aligned motion GIFs communicating features, workflows and platform benefits.',
    outcome: 'Shipped 8–9 optimised motion GIFs across the Assurekit website that reduce information friction and lift feature comprehension.',
    tools: ['After Effects', 'Figma'],
    role: 'Motion System, Animation',
  },
  {
    id: 'w5',
    pid: '242815819',
    yt: 'DY9BeoEbiOQ',
    title: 'BASE — Motiongraphics Explainer',
    client: 'Coinbase · BASE',
    category: 'Web3 / Explainer',
    year: '2024',
    banner: `${B}/max_3840_webp/72b4ea242815819.6974a283172e7.jpg`,
    href: 'https://www.behance.net/gallery/242815819/BASE-Motiongraphics-Explainer',
    aspect: 'aspect-video',
    color: '#0b1f1c',
    challenge: 'A concise motion graphics film for Fluid Studio explaining BASE, Coinbase’s L2 blockchain — communicating its purpose, benefits and impact on Web3 builders in one clean narrative.',
    outcome: 'Delivered a polished explainer that clarifies what BASE is and why it matters — used across digital platforms by Fluid Studio.',
    tools: ['After Effects', 'Premiere Pro', 'Illustrator'],
    role: 'Motion Direction, Animation',
  },
  {
    id: 'w6',
    pid: '243268695',
    yt: 'CkzavSmDx4o',
    title: 'Beratrax — UI Motion',
    client: 'Beratrax',
    category: 'Web3 / UI Motion',
    year: '2024',
    banner: `${B}/1400_webp/39e6ee243268695.697dfdcf1e20d.jpg`,
    href: 'https://www.behance.net/gallery/243268695/Beratrax',
    aspect: 'aspect-video',
    color: '#171a0d',
    challenge: 'A UI motion piece for Beratrax that translates the crypto product’s surface into a kinetic, on-brand walkthrough.',
    outcome: 'Shipped as the product’s main motion asset; reused across decks, socials and marketing surfaces.',
    tools: ['After Effects', 'Premiere Pro', 'Illustrator', 'Photoshop'],
    role: 'Motion Design, UI Animation',
  },
  {
    id: 'w7',
    pid: '243270555',
    yt: 'eZvknV72oZw',
    title: 'App UI Overview — Motion',
    client: 'Confidential',
    category: 'SaaS / UI Motion',
    year: '2024',
    banner: `${B}/1400_webp/62ed5d243270555.697e07691571a.jpg`,
    href: 'https://www.behance.net/gallery/243270555/App-UI-overview-Motion-graphics',
    aspect: 'aspect-video',
    color: '#0a1a24',
    challenge: 'A short-form motion overview of a product’s app UI — designed to feel product-accurate, kinetic, and light enough for the marketing site.',
    outcome: 'Delivered as a hero motion piece for the app’s launch. Shortened cutdowns adapted for social.',
    tools: ['After Effects', 'Premiere Pro', 'Illustrator'],
    role: 'Motion Design, UI Animation',
  },
  {
    id: 'w8',
    pid: '252230717',
    yt: 'GpOhuZlv5EU',
    title: 'KOSH Money — Global Finance Launch',
    client: 'KOSH · Spacekayak',
    category: 'Fintech / Product Film',
    year: '2026',
    banner: `${COVER}/b40888252230717.Y3JvcCw4MDgsNjMyLDAsMA.jpg`,
    href: 'https://www.behance.net/gallery/252230717/KOSH-Money-Global-Finance-Product-Launch-Film',
    aspect: 'aspect-video',
    color: '#0a1614',
    challenge: 'A launch film for KOSH — a global finance platform for freelancers, creators and distributed teams — blending live-action, cinematic storytelling and premium glassmorphism UI to introduce the product and its stablecoin-powered infrastructure.',
    outcome: 'Delivered as the launch film — including 2nd DOP contribution on set and a 1,200-layer After Effects build of the animated glass UI sequences that visualise the platform’s core features.',
    tools: ['Premiere Pro', 'After Effects', 'Illustrator', 'Photoshop', 'Figma', 'Mocha'],
    role: '2nd DOP, Editing, Motion Graphics',
  },
  {
    id: 'w9',
    pid: '253025327',
    yt: '73E89XSTEsg',
    title: 'Polygon Gigagas — Roadmap Motion',
    client: 'Polygon · Spacekayak',
    category: 'Web3 / Motion Presentation',
    year: '2026',
    banner: `${COVER}/93cd40253025327.Y3JvcCw5NjIsNzUyLDQ3OCwxNjQ.png`,
    href: 'https://www.behance.net/gallery/253025327/Polygon-Gigagas-Roadmap-Motion-Presentation',
    aspect: 'aspect-video',
    color: '#140a28',
    challenge: 'Transform Polygon’s dense Gigagas roadmap content into a visually engaging motion presentation — communicating the L2 vision with modern typography, smooth transitions and a clean, premium technology-first language.',
    outcome: 'Delivered the entire motion presentation within a single day — a tight, roadmap-ready film aligned to Polygon’s brand identity.',
    tools: ['After Effects', 'Figma'],
    role: 'Motion Design, Animation, Edit',
  },
  {
    id: 'w10',
    pid: '253023237',
    yt: '3VuKs4V0_vA',
    title: 'FO-X — Launch Event Opening',
    client: 'FO-X · Fluid Studio',
    category: 'Web3 / Event Opening',
    year: '2026',
    banner: `${COVER}/9577cb253023237.Y3JvcCwxMjI3LDk2MCwzNDYsMA.png`,
    href: 'https://www.behance.net/gallery/253023237/FO-X-Launch-Event-Opening',
    aspect: 'aspect-video',
    color: '#0a1024',
    challenge: 'A 20-second high-energy opening film for FO-X’s product launch event in China — built to reflect the brand’s futuristic identity and build anticipation before the on-stage reveal.',
    outcome: 'End-to-end motion, sound design and music timing — a cinematic opener that anchored the live event with bold typography, kinetic transitions and a synchronised audiovisual arc.',
    tools: ['After Effects', 'Premiere Pro', 'Illustrator'],
    role: 'Motion Graphics, Sound Design, Edit',
  },
  {
    id: 'w11',
    pid: '253021697',
    yt: 'IYcdwnOtSxk',
    title: 'Pomo — AI Marketing Launch Film',
    client: 'Pomo AI · Spacekayak',
    category: 'AI / SaaS / Launch Film',
    year: '2026',
    banner: `${COVER}/04c53e253021697.Y3JvcCw5MzAsNzI3LDQ4NiwxNzU.png`,
    href: 'https://www.behance.net/gallery/253021697/Pomo',
    aspect: 'aspect-video',
    color: '#1a1208',
    challenge: 'A premium product launch film for Pomo AI — an AI-powered marketing platform — combining cinematic live-action footage shot in Los Angeles with kinetic branded motion graphics for a modern, AI-first SaaS launch.',
    outcome: 'Full-post treatment: editorial, integrated motion graphics and sound design — a fast-paced launch film that feels premium and communicates the product with clarity.',
    tools: ['After Effects', 'Illustrator', 'Figma', 'Premiere Pro'],
    role: 'Edit, Motion Graphics, Sound Design',
  },
  {
    id: 'w12',
    pid: '253025931',
    yt: 'bBu0HyYkjrw',
    title: 'Summer.fi — Intro Animation Concept',
    client: 'Summer.fi (concept)',
    category: 'Web3 / Brand Motion',
    year: '2026',
    banner: `${COVER}/dd8e2c253025931.Y3JvcCwxMTgwLDkyMywzNjgsNzg.png`,
    href: 'https://www.behance.net/gallery/253025931/Summerfi-Intro-Animation-Concept',
    aspect: 'aspect-video',
    color: '#241608',
    challenge: 'A self-initiated intro animation concept for Summer.fi — a weekend creative exercise exploring premium brand animation, modern transitions and sound design in the visual language of the Summer.fi identity.',
    outcome: 'A tight two-day exploration shipped as a concept piece — refining motion techniques while showcasing a premium, brand-aligned Web3 aesthetic.',
    tools: ['After Effects', 'Illustrator'],
    role: 'Concept, Motion Design, Animation',
  },
  {
    id: 'w13',
    pid: '253024051',
    yt: 'y9jkgr1rIlc',
    title: 'Ewigbyte — Funding Announcement',
    client: 'Ewigbyte · Fluid Studio',
    category: 'Web3 / Social Motion',
    year: '2026',
    banner: `${COVER}/6256b7253024051.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png`,
    href: 'https://www.behance.net/gallery/253024051/Ewigbyte-Funding-Announcement',
    aspect: 'aspect-video',
    color: '#0a1428',
    challenge: 'A short social-first announcement for Ewigbyte celebrating a funding milestone — clean, modern and energetic while staying on-brand across platforms.',
    outcome: 'Fully designed, animated and delivered within a three-hour turnaround — a fast, high-quality announcement piece for the brand’s socials.',
    tools: ['After Effects', 'Photoshop'],
    role: 'Motion Design, Animation, Sound',
  },
  {
    id: 'w14',
    pid: '252221119',
    yt: 'B3qqapjmu9s',
    title: 'QBeast — Website UI Motion',
    client: 'QBeast · Spacekayak',
    category: 'SaaS / UI Motion / GIFs',
    year: '2026',
    banner: `${COVER}/6d3506252221119.Y3JvcCw4MDgsNjMyLDAsMA.jpg`,
    href: 'https://www.behance.net/gallery/252221119/QBeast-Website-UI-Motion-Graphics',
    aspect: 'aspect-video',
    color: '#0f0f1a',
    challenge: 'Design a set of lightweight, looping abstract shape animations for the QBeast website — adding subtle motion and personality without compromising web performance.',
    outcome: 'Delivered a family of on-brand loopable GIFs shipped across the QBeast site — quiet motion that lifts the browsing experience.',
    tools: ['After Effects', 'Figma'],
    role: 'Motion Design, UI Animation',
  },
  {
    id: 'w15',
    yt: 'XaScies0vu4',
    title: 'Basecamp',
    client: 'Basecamp',
    category: 'Product Film',
    year: '2025',
    banner: YT_THUMB('XaScies0vu4'),
    href: 'https://youtu.be/XaScies0vu4',
    aspect: 'aspect-video',
    color: '#0f120a',
    challenge: 'Basecamp — a launch-ready motion piece delivered end-to-end with editorial, animation and sound design.',
    outcome: 'Shipped for launch surfaces and social cutdowns.',
    tools: ['After Effects', 'Premiere Pro'],
    role: 'Motion Design, Edit',
  },
  {
    id: 'w16',
    yt: 'fTnuLwL3XDg',
    title: 'Hybrid After Party — Token 2049 Dubai',
    client: 'Token 2049',
    category: 'Web3 / Event Film',
    year: '2025',
    banner: YT_THUMB('fTnuLwL3XDg'),
    href: 'https://youtu.be/fTnuLwL3XDg',
    aspect: 'aspect-video',
    color: '#150a1f',
    challenge: 'Event opener / after-movie for Hybrid After Party at Token 2049 Dubai — cinematic pacing, live-action integration and dynamic type.',
    outcome: 'Delivered as the event’s hero film — used across launch surfaces and socials.',
    tools: ['Premiere Pro', 'After Effects'],
    role: 'Direction, Edit, Motion',
  },
  {
    id: 'w17',
    yt: 'mlGEQQD7VqA',
    title: 'Dvara for NFH',
    client: 'Dvara · NFH',
    category: 'Impact / Explainer',
    year: '2025',
    banner: YT_THUMB('mlGEQQD7VqA'),
    href: 'https://youtu.be/mlGEQQD7VqA',
    aspect: 'aspect-video',
    color: '#0a1a1c',
    challenge: 'A story-first explainer for Dvara × NFH translating a complex impact mission into a clear, human, watchable film.',
    outcome: 'Anchored the campaign and reused across partner channels.',
    tools: ['After Effects', 'Premiere Pro'],
    role: 'Edit, Motion, Sound Design',
  },
  {
    id: 'w18',
    yt: '8XnuRgBntsM',
    title: 'Lovble',
    client: 'Lovble',
    category: 'Brand Film',
    year: '2025',
    banner: YT_THUMB('8XnuRgBntsM'),
    href: 'https://youtu.be/8XnuRgBntsM',
    aspect: 'aspect-video',
    color: '#1a0a1a',
    challenge: 'A short, brand-forward motion piece for Lovble — playful pacing, on-brand color and tightly synchronised sound design.',
    outcome: 'Shipped as the brand’s hero film across launch pages and socials.',
    tools: ['After Effects', 'Illustrator'],
    role: 'Motion Design, Sound',
  },
  {
    id: 'w19',
    yt: 'LLVnCnfxHD8',
    title: 'HyperSignal — Vol. 1',
    client: 'HyperSignal',
    category: 'Web3 / Brand Motion',
    year: '2025',
    banner: YT_THUMB('LLVnCnfxHD8'),
    href: 'https://youtu.be/LLVnCnfxHD8',
    aspect: 'aspect-video',
    color: '#0a1024',
    challenge: 'A brand-forward motion film for HyperSignal — the first volume in a series exploring the product’s identity, tone and kinetic language.',
    outcome: 'Delivered as the anchor visual for the launch campaign.',
    tools: ['After Effects', 'Illustrator'],
    role: 'Motion Design, Animation',
  },
  {
    id: 'w20',
    yt: 'HK-2vYa4EoU',
    title: 'HyperSignal',
    client: 'HyperSignal',
    category: 'Web3 / Product Film',
    year: '2025',
    banner: YT_THUMB('HK-2vYa4EoU'),
    href: 'https://youtu.be/HK-2vYa4EoU',
    aspect: 'aspect-video',
    color: '#0a1a24',
    challenge: 'The core product film for HyperSignal — translating the platform’s promise into a tight, kinetic and on-brand narrative.',
    outcome: 'Anchored the launch page and reused across social cutdowns.',
    tools: ['After Effects', 'Premiere Pro', 'Illustrator'],
    role: 'Direction, Motion, Edit',
  },
  {
    id: 'w21',
    yt: 'NfqeGSH_-1w',
    title: 'Sarvam AI — Samvaad',
    client: 'Sarvam AI',
    category: 'AI / Product Film',
    year: '2025',
    banner: YT_THUMB('NfqeGSH_-1w'),
    href: 'https://www.behance.net/gallery/245007383/Sarvam-AI-Product-Launch-Videos',
    aspect: 'aspect-video',
    color: '#1a1a2e',
    challenge: 'One of four films for Sarvam AI’s India AI Summit launch — Samvaad — showcasing the platform’s conversational AI capabilities.',
    outcome: 'Delivered as a launch reel used across the AI Summit stage, launch pages and social.',
    tools: ['After Effects', 'Premiere Pro', 'Figma'],
    role: 'Motion Direction, Animation, Edit',
  },
  {
    id: 'w22',
    yt: 'QdVLgGfIyLg',
    title: 'Sarvam AI — Studio',
    client: 'Sarvam AI',
    category: 'AI / Product Film',
    year: '2025',
    banner: YT_THUMB('QdVLgGfIyLg'),
    href: 'https://www.behance.net/gallery/245007383/Sarvam-AI-Product-Launch-Videos',
    aspect: 'aspect-video',
    color: '#1e1a2e',
    challenge: 'One of four films for Sarvam AI’s India AI Summit launch — Studio — showcasing the platform’s creative product surface.',
    outcome: 'Delivered as a launch reel used across the AI Summit stage, launch pages and social.',
    tools: ['After Effects', 'Premiere Pro', 'Figma'],
    role: 'Motion Direction, Animation, Edit',
  },
];

/* -----------------------------------------------------------
   CURSOR TRAIL  —  premium purple comet-tail on <canvas>
----------------------------------------------------------- */
function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip on touch / no-hover devices
    const canHover =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canHover) return;

    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const points = []; // ring of {x,y,t}
    const MAX_AGE = 520; // ms trail lifetime
    let speedEma = 0;
    let last = { x: -9999, y: -9999, t: performance.now() };

    const onMove = (e) => {
      const now = performance.now();
      const dt = Math.max(1, now - last.t);
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist = Math.hypot(dx, dy);
      const v = dist / dt; // px per ms
      speedEma = speedEma * 0.75 + v * 0.25;

      points.push({ x: e.clientX, y: e.clientY, t: now });
      // Cap buffer to avoid unbounded growth on very fast motion
      if (points.length > 90) points.shift();

      last = { x: e.clientX, y: e.clientY, t: now };
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // Multi-pass "afterburn" — outer soft glow → mid glow → hot core
    // No filter blur (expensive) — we synthesise glow with wide low-alpha strokes.
    const passes = [
      { widthMul: 5.5, alphaMul: 0.06, hot: false }, // outer plasma
      { widthMul: 3.0, alphaMul: 0.16, hot: false }, // mid glow
      { widthMul: 1.6, alphaMul: 0.42, hot: false }, // near core (purple)
      { widthMul: 0.7, alphaMul: 0.95, hot: true },  // hot white-purple core
    ];

    let raf;
    const draw = () => {
      const now = performance.now();

      // prune old points
      while (points.length && now - points[0].t > MAX_AGE) points.shift();

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      if (points.length >= 2) {
        // 0..1 speed multiplier (v ~ 0.5-4 px/ms typical)
        const sMul = Math.min(1, speedEma / 2.2);
        const baseWidth = 2.2 + 6.0 * sMul; // fast = thicker
        const brightness = 0.55 + 0.45 * sMul; // fast = brighter

        ctx.globalCompositeOperation = 'lighter';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (const pass of passes) {
          for (let i = 1; i < points.length; i++) {
            const p0 = points[i - 1];
            const p1 = points[i];
            const age = (now - (p0.t + p1.t) / 2) / MAX_AGE; // 0=newest 1=oldest
            const life = 1 - age;
            if (life <= 0) continue;

            // width tapers toward tail, alpha fades quadratic
            const w = baseWidth * pass.widthMul * (0.35 + 0.65 * life);
            const alpha = life * life * pass.alphaMul * brightness;
            if (alpha < 0.003) continue;

            // segment gradient — deeper purple at tail, brighter at head
            const grad = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
            if (pass.hot) {
              // Hot core: white → violet
              grad.addColorStop(0, `rgba(180, 140, 255, ${alpha * 0.55})`);
              grad.addColorStop(1, `rgba(240, 230, 255, ${alpha})`);
            } else {
              grad.addColorStop(0, `rgba(82, 28, 184, ${alpha * 0.55})`);
              grad.addColorStop(1, `rgba(119, 57, 227, ${alpha})`);
            }
            ctx.strokeStyle = grad;
            ctx.lineWidth = w;

            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            // quadratic through mid-point to next → smooth ribbon (no chain of circles)
            if (i < points.length - 1) {
              const p2 = points[i + 1];
              const mx = (p1.x + p2.x) / 2;
              const my = (p1.y + p2.y) / 2;
              ctx.quadraticCurveTo(p1.x, p1.y, mx, my);
            } else {
              ctx.lineTo(p1.x, p1.y);
            }
            ctx.stroke();
          }
        }

        ctx.globalCompositeOperation = 'source-over';
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[190] hidden md:block"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

/* -----------------------------------------------------------
   CUSTOM CURSOR — small white core with purple aurora glow
----------------------------------------------------------- */
function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 45, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 900, damping: 45, mass: 0.25 });
  const [hover, setHover] = useState(false);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const t = e.target;
      const isInteractive =
        t && t.closest && !!t.closest('a, button, [data-cursor], [role="button"], input, textarea, select, label');
      setHover(isInteractive);
    };
    const click = () => setBurst((b) => b + 1);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', click);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', click);
    };
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[210] hidden md:block"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      aria-hidden
    >
      {/* Core dot */}
      <motion.div
        animate={{
          width: hover ? 22 : 8,
          height: hover ? 22 : 8,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
        className="rounded-full"
        style={{
          background: '#FFFFFF',
          boxShadow: hover
            ? '0 0 22px 6px rgba(119,57,227,0.85), 0 0 60px 14px rgba(82,28,184,0.55), 0 0 120px 26px rgba(82,28,184,0.25)'
            : '0 0 14px 3px rgba(119,57,227,0.75), 0 0 34px 8px rgba(82,28,184,0.35), 0 0 70px 16px rgba(82,28,184,0.15)',
        }}
      />

      {/* Click ripple */}
      <AnimatePresence>
        <motion.span
          key={burst}
          initial={{ opacity: 0.55, scale: 0.4 }}
          animate={{ opacity: 0, scale: 3.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: 40,
            height: 40,
            background:
              'radial-gradient(circle, rgba(180,140,255,0.55) 0%, rgba(119,57,227,0.35) 40%, rgba(82,28,184,0) 70%)',
          }}
        />
      </AnimatePresence>
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
   SERVICES
----------------------------------------------------------- */
const SERVICES = [
  {
    n: '01',
    title: 'Product Films',
    accent: 'launch-ready.',
    desc: 'Narrative launch films, feature reveals and hero videos — engineered to move product, not just pixels.',
    tags: ['Direction', 'Storyboard', 'Animation', 'Edit'],
  },
  {
    n: '02',
    title: 'UI Motion',
    accent: 'kinetic & precise.',
    desc: 'Product-accurate UI animations, loopable GIFs and motion systems that ship straight into websites and marketing surfaces.',
    tags: ['UI Motion', 'GIF Systems', 'After Effects'],
  },
  {
    n: '03',
    title: 'Brand Motion',
    accent: 'living identities.',
    desc: 'Motion identity systems — logo animations, transitions, and reusable motion tokens that scale across a brand.',
    tags: ['Identity', 'Systems', 'Guidelines'],
  },
  {
    n: '04',
    title: 'Explainers',
    accent: 'complexity → clarity.',
    desc: 'Explainer films for Web3, AI and infra products — turning technical narratives into human, watchable stories.',
    tags: ['Web3', 'AI', 'Illustration'],
  },
];

function Services() {
  const ref = useRef(null);
  return (
    <section id="services" ref={ref} className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="grid md:grid-cols-12 gap-8 items-end mb-14 md:mb-20">
        <div className="md:col-span-2">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">02 — Services</div>
        </div>
        <div className="md:col-span-10">
          <h2 className="text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight font-light">
            <RevealLine><span className="text-white">What I make —</span></RevealLine>
            <RevealLine delay={0.1}><span className="serif italic text-white/70">and how it ships.</span></RevealLine>
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.n} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ s, i }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-10% 0px' });
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="link"
      className="group relative bg-black p-8 md:p-10 lg:p-14 hover:bg-white/[0.015] transition-colors duration-500"
    >
      <div className="flex items-start justify-between mb-8">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">{s.n}</div>
        <ArrowUpRight className="w-4 h-4 text-white/25 group-hover:text-white/80 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
      </div>

      <h3 className="text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight font-light">
        <span className="text-white">{s.title}</span>{' '}
        <span className="serif italic text-white/55 block md:inline">{s.accent}</span>
      </h3>

      <p className="mt-6 text-white/55 text-base md:text-lg leading-relaxed max-w-md font-light">
        {s.desc}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {s.tags.map((t) => (
          <span
            key={t}
            className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs text-white/70"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
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
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] aspect-video group"
      style={{ backgroundColor: project.color }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
    >
      <motion.div layoutId={`media-${project.id}`} className="absolute inset-0">
        <img
          src={project.banner}
          alt={project.title}
          loading="lazy"
          draggable="false"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 pointer-events-none">
        <motion.h3
          layoutId={`title-${project.id}`}
          className="text-[13px] md:text-sm font-light tracking-tight text-white/95 leading-snug"
        >
          {project.title}
        </motion.h3>
      </div>

      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Plus className="w-3.5 h-3.5" />
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
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">03 — Selected Work</div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">
            <span className="text-white">Films, systems &amp;</span>{' '}
            <span className="serif italic text-white/70">moments.</span>
          </h2>
        </div>
        <div className="text-sm text-white/40 max-w-xs">
          A rolling selection from recent SaaS, AI and Web3 work. Click any film to play in full.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {WORK.map((p) => (
          <WorkCard key={p.id} project={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
   YOUTUBE VIDEO EMBED  (lazy iframe, autoplay muted, respects UX rules)
----------------------------------------------------------- */
function YoutubeVideo({ ytId, title }) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Wait for the shared-layout morph to settle before injecting the iframe
    const t = setTimeout(() => setMounted(true), 450);
    return () => clearTimeout(t);
  }, [ytId]);

  const src = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1&color=white`;

  return (
    <>
      {mounted && (
        <iframe
          src={src}
          title={title}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{
            border: 0,
            transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1)',
            opacity: loaded ? 1 : 0,
          }}
          className="absolute inset-0 w-full h-full"
        />
      )}

      {/* Play affordance while iframe warms up */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur border border-white/25 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-white ml-1" />
          </div>
        </div>
      )}
    </>
  );
}

/* -----------------------------------------------------------
   BEHANCE VIDEO EMBED  (mounts after layout-morph, fades in on load)
----------------------------------------------------------- */
function BehanceVideo({ pid, title }) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Let the shared-layout morph play, then mount the iframe
    const t = setTimeout(() => setMounted(true), 450);
    return () => clearTimeout(t);
  }, [pid]);

  return (
    <>
      {mounted && (
        <iframe
          src={`https://www.behance.net/embed/project/${pid}?ilo0=1`}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          title={title}
          onLoad={() => setLoaded(true)}
          style={{
            border: 0,
            transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1)',
            opacity: loaded ? 1 : 0,
          }}
          className="absolute inset-0 w-full h-full"
        />
      )}

      {/* Play affordance while iframe warms up */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur border border-white/25 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-white ml-1" />
          </div>
        </div>
      )}
    </>
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
      onClick={(e) => {
        // Click-outside close: only trigger when clicking the backdrop itself (not inner content)
        if (e.target === e.currentTarget) onClose();
      }}
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
            <img
              src={project.banner}
              alt={project.title}
              draggable="false"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* YouTube video embed — layered on top, fades in on load so the shared-layout
              banner image morph reads cleanly first. */}
          {project.yt && (
            <YoutubeVideo ytId={project.yt} title={project.title} />
          )}
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
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white/80 hover:text-white hover:border-white/30 transition"
                  >
                    View on Behance <ExternalLink className="w-3.5 h-3.5" />
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
                  <img src={p.banner} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
      <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6">04 — Start something</div>
      <h2 className="text-5xl md:text-8xl font-light tracking-tight leading-[1.05] pb-4 md:pb-6">
        <RevealLine><span className="text-white">Have a launch</span></RevealLine>
        <RevealLine delay={0.1}><span className="serif italic text-white/80 inline-block pb-2 md:pb-3">worth remembering?</span></RevealLine>
      </h2>

      <div className="mt-12 flex flex-col md:flex-row gap-4 items-center justify-center">
        <Magnetic strength={0.35}>
          <a href="mailto:sammalviya47@gmail.com?subject=Project%20Inquiry" data-cursor="link" className="group inline-flex items-center gap-3 rounded-full bg-white text-black pl-6 pr-2 py-2 text-sm font-medium hover:bg-white/90 transition">
            sammalviya47@gmail.com
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white group-hover:rotate-45 transition-transform duration-500">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </Magnetic>
        <span className="text-white/30 text-sm">or</span>
        <Magnetic strength={0.25}>
          <a href="https://www.behance.net/Sumitlohar97" target="_blank" rel="noopener noreferrer" data-cursor="link" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 hover:text-white hover:border-white/30 transition">
            Behance <ArrowUpRight className="w-4 h-4" />
          </a>
        </Magnetic>
      </div>

      <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
        {[
          { k: '7yr', v: 'Practice' },
          { k: '40+', v: 'Projects shipped' },
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
   BEHANCE ICON  (small inline SVG for nav)
----------------------------------------------------------- */
function BehanceIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M6.94 4.5c.7 0 1.34.06 1.92.19.58.13 1.07.34 1.48.61.41.28.73.65.96 1.12.22.47.34 1.05.34 1.73 0 .74-.17 1.36-.51 1.86-.34.5-.84.91-1.5 1.22.9.26 1.58.72 2.03 1.37.45.66.66 1.45.66 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.68 1-1.17 1.34-.49.34-1.05.6-1.68.75-.63.16-1.29.24-1.98.24H0V4.5h6.94zm-.35 5.1c.57 0 1.05-.14 1.4-.4.36-.27.53-.7.53-1.3 0-.34-.06-.6-.19-.82a1.3 1.3 0 0 0-.5-.51 2.03 2.03 0 0 0-.7-.26 4.1 4.1 0 0 0-.8-.07H3.24v3.36h3.35zm.2 5.28c.31 0 .61-.03.89-.09.28-.06.53-.16.74-.29.21-.14.38-.32.5-.55.13-.22.2-.51.2-.86 0-.68-.2-1.16-.58-1.45-.38-.29-.87-.44-1.5-.44H3.24v3.68h3.55zM17.9 15c.42.4 1 .6 1.72.6.51 0 .94-.14 1.3-.42.36-.28.58-.58.66-.9h2.48c-.4 1.24-1 2.13-1.84 2.66-.83.53-1.83.79-3 .79-.83 0-1.57-.13-2.23-.4a4.6 4.6 0 0 1-1.68-1.12 5 5 0 0 1-1.06-1.79 6.6 6.6 0 0 1-.36-2.31c0-.82.12-1.58.37-2.28.25-.7.6-1.31 1.06-1.81.46-.51 1.02-.9 1.66-1.19.64-.29 1.35-.43 2.14-.43.9 0 1.68.17 2.35.53.66.35 1.2.82 1.62 1.4.42.6.72 1.26.9 2.02.19.75.25 1.55.19 2.38h-7.1c0 .8.29 1.58.7 1.98zm3.06-5.42c-.33-.36-.83-.55-1.5-.55-.44 0-.81.08-1.1.23-.29.15-.53.34-.7.55-.17.22-.29.46-.36.72a3.1 3.1 0 0 0-.12.72h4.42c-.06-.65-.27-1.16-.63-1.52zM14 5.32h6v1.5h-6v-1.5z" />
    </svg>
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
          <a href="#services" data-cursor="link" className="hover:text-white transition">Services</a>
          <a href="#contact" data-cursor="link" className="hover:text-white transition">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <Magnetic strength={0.25}>
            <a
              href="https://www.behance.net/Sumitlohar97"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/80 hover:text-white hover:border-white/30 transition"
            >
              <BehanceIcon className="w-3.5 h-3.5" />
              Behance
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="mailto:sammalviya47@gmail.com?subject=Project%20Inquiry"
              data-cursor="link"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/80 hover:text-white hover:border-white/30 transition"
            >
              <Mail className="w-3.5 h-3.5" />
              Hire
            </a>
          </Magnetic>
        </div>
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
        <div>© 2025 — Sumit Lohar</div>
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
        <CursorTrail />
        <CustomCursor />
        <PageEntry />
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Services />
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
