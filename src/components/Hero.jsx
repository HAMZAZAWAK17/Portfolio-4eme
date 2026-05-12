import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/portfolioData';
import heroImage from '../assets/Gemini_Generated_Image_2725dz2725dz2725.png';
import { useLanguage } from '../LanguageContext';
import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────
   Tiny hook: track mouse position
───────────────────────────────────────── */
const useMouse = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    useEffect(() => {
        const move = (e) => {
            x.set(e.clientX / window.innerWidth - 0.5);
            y.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, [x, y]);
    return { x, y };
};

/* ─────────────────────────────────────────
   Character-split animated title
───────────────────────────────────────── */
const SplitText = ({ text, className, style = {}, delay = 0 }) => {
    const chars = Array.from(text);
    return (
        <span className={className} aria-label={text} style={{ display: 'inline-block', overflow: 'hidden', ...style }}>
            {chars.map((ch, i) => (
                <motion.span
                    key={i}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                        duration: 0.7,
                        delay: delay + i * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
                >
                    {ch}
                </motion.span>
            ))}
        </span>
    );
};

/* ─────────────────────────────────────────
   Noise canvas overlay
───────────────────────────────────────── */
const NoiseOverlay = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
);

/* ─────────────────────────────────────────
   Marquee strip
───────────────────────────────────────── */
const Marquee = ({ text, reverse = false }) => {
    const items = Array(8).fill(text);
    return (
        <div className="overflow-hidden whitespace-nowrap flex">
            <motion.div
                className="flex gap-12 shrink-0"
                animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            >
                {[...items, ...items].map((item, i) => (
                    <span key={i} className="text-white/10 dark:text-white/10 text-[11px] uppercase tracking-[0.4em] font-black">
                        {item} <span className="text-white/20 mx-4">◆</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

/* ─────────────────────────────────────────
   Main Hero Component
───────────────────────────────────────── */
const Hero = () => {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const mouse = useMouse();

    const springConfig = { stiffness: 80, damping: 20 };
    const mx = useSpring(useTransform(mouse.x, [-0.5, 0.5], [-12, 12]), springConfig);
    const my = useSpring(useTransform(mouse.y, [-0.5, 0.5], [-8, 8]), springConfig);
    const mxSlow = useSpring(useTransform(mouse.x, [-0.5, 0.5], [-6, 6]), springConfig);
    const mySlow = useSpring(useTransform(mouse.y, [-0.5, 0.5], [-4, 4]), springConfig);

    // Scroll-driven transforms
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
    const imgScale    = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
    const imgOpacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const textY       = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const bgScale     = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
    const overlayOp   = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.9]);
    const marqueeY    = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

    const scrollToProjects = () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    const scrollToContact  = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

    const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
    useEffect(() => {
        const obs = new MutationObserver(() =>
            setIsDark(document.documentElement.classList.contains('dark'))
        );
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => obs.disconnect();
    }, []);

    const stats = [
        { value: '3+', label: 'Stages' },
        { value: '9+', label: 'Projets' },
        { value: '5', label: 'Années' },
    ];

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden bg-black"
        >
            {/* ── Grain ── */}
            <NoiseOverlay />

            {/* ── Full-bleed Background Image with parallax scale ── */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ scale: bgScale }}
            >
                <motion.img
                    src={heroImage}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover object-top"
                    style={{
                        scale: imgScale,
                        opacity: imgOpacity,
                        x: mxSlow,
                        y: mySlow,
                    }}
                />
            </motion.div>

            {/* ── Gradient overlay (scroll-reactive opacity) ── */}
            <motion.div
                className="absolute inset-0 z-10"
                style={{
                    opacity: overlayOp,
                    background: isDark
                        ? 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.85) 100%)'
                        : 'linear-gradient(135deg, rgba(5,5,5,0.93) 0%, rgba(10,10,10,0.45) 45%, rgba(5,5,5,0.88) 100%)',
                }}
            />

            {/* ── Edge vignette ── */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
                }}
            />

            {/* ── Horizontal scan-line accent ── */}
            <motion.div
                className="absolute left-0 right-0 h-px bg-white/10 z-20"
                style={{ top: '35%' }}
                animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.04, 0.12, 0.04] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* ── Top marquee strip ── */}
            <motion.div
                className="absolute top-0 left-0 right-0 py-3 border-b border-white/5 z-30"
                style={{ y: marqueeY }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
            >
                <Marquee text="Full-Stack Developer · Casablanca · ReactJS · Laravel · Node.js · Flutter" />
            </motion.div>

            {/* ═══════════════════════════════════════
                MAIN CONTENT
            ═══════════════════════════════════════ */}
            <motion.div
                className="relative z-30 min-h-screen flex flex-col justify-between px-6 md:px-14 lg:px-20 pt-28 pb-10"
                style={{ y: textY, opacity: textOpacity }}
            >
                {/* ── Top row: greeting + available badge ── */}
                <div className="flex items-center justify-between">
                    <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-white/60 text-xs uppercase tracking-[0.35em] font-semibold"
                    >
                        {t.hero.greeting}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex items-center gap-2 border border-white/20 px-4 py-2 backdrop-blur-sm"
                    >
                        <motion.span
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 1.6, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
                        />
                        <span className="text-white/80 text-[10px] uppercase tracking-[0.3em] font-bold">
                            {t.hero.available}
                        </span>
                    </motion.div>
                </div>

                {/* ── GIANT Cinematic Title ── */}
                <div className="flex flex-col gap-2 mt-auto mb-auto pt-16 md:pt-0">
                    {/* Mouse-parallax container */}
                    <motion.div style={{ x: mx, y: my }}>
                        <SplitText
                            text={t.hero.title1}
                            delay={0.5}
                            className="block text-white font-black uppercase leading-none tracking-tighter"
                            style={{ fontSize: 'clamp(3.5rem, 11vw, 10rem)' }}
                        />
                        <SplitText
                            text={t.hero.title2}
                            delay={0.7}
                            className="block font-black uppercase leading-none tracking-tighter"
                            style={{
                                fontSize: 'clamp(3.5rem, 11vw, 10rem)',
                                color: 'transparent',
                                WebkitTextStroke: '1px rgba(255,255,255,0.5)',
                            }}
                        />
                    </motion.div>

                    {/* Subtitle line with divider */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 0.8 }}
                        className="flex items-center gap-4 mt-4"
                    >
                        <div className="h-px flex-grow-0 w-12 bg-white/30" />
                        <span className="text-white/50 text-sm uppercase tracking-widest font-medium">
                            {t.hero.subtitle}
                        </span>
                    </motion.div>

                    {/* Location */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.7 }}
                        className="flex items-center gap-2 mt-2 text-white/40"
                    >
                        <FaMapMarkerAlt className="text-xs" />
                        <span className="text-xs uppercase tracking-widest">{t.hero.location}</span>
                    </motion.div>
                </div>

                {/* ── Bottom row: stats + CTAs + social ── */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mt-10">

                    {/* Stats pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.7, duration: 0.8 }}
                        className="flex gap-6"
                    >
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.5)' }}
                                className="border border-white/15 backdrop-blur-sm px-5 py-3 text-center transition-all duration-300"
                            >
                                <div className="text-white font-black text-2xl leading-none">{s.value}</div>
                                <div className="text-white/40 text-[9px] uppercase tracking-widest mt-1 font-semibold">{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTAs + socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.9, duration: 0.8 }}
                        className="flex flex-col gap-5"
                    >
                        {/* CTA buttons */}
                        <div className="flex flex-wrap gap-3">
                            <motion.button
                                whileHover={{ backgroundColor: '#ffffff', color: '#000000', scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={scrollToProjects}
                                className="flex items-center gap-3 px-7 py-3.5 border border-white text-white font-bold text-xs uppercase tracking-widest transition-all duration-300"
                            >
                                {t.hero.viewProjects}
                                <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.4, repeat: Infinity }}
                                >
                                    <FaArrowRight className="text-[10px]" />
                                </motion.span>
                            </motion.button>

                            <motion.button
                                whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={scrollToContact}
                                className="flex items-center gap-3 px-7 py-3.5 border border-white/30 text-white/70 font-bold text-xs uppercase tracking-widest transition-all duration-300"
                            >
                                {t.hero.contactMe}
                                <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.4, repeat: Infinity, delay: 0.3 }}
                                >
                                    <FaArrowRight className="text-[10px]" />
                                </motion.span>
                            </motion.button>
                        </div>

                        {/* Social icons */}
                        <div className="flex gap-5">
                            {[
                                { icon: FaGithub,   link: socialLinks.github,              label: 'GitHub' },
                                { icon: FaLinkedin, link: socialLinks.linkedin,            label: 'LinkedIn' },
                                { icon: FaEnvelope, link: `mailto:${personalInfo.email}`,  label: 'Email' },
                            ].map((s, i) => (
                                <motion.a
                                    key={i}
                                    href={s.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    whileHover={{ y: -4, color: '#ffffff' }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-white/40 transition-colors text-lg"
                                >
                                    <s.icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 hidden md:flex"
            >
                <span className="text-white/30 text-[9px] uppercase tracking-[0.4em]">{t.hero.scroll}</span>
                <motion.div
                    animate={{ scaleY: [0, 1, 0], y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-px h-14 origin-top"
                    style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }}
                />
            </motion.div>

            {/* ── Corner index tag ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 right-6 md:right-14 z-40 text-white/20 text-[10px] uppercase tracking-widest font-black"
            >
                01 / HERO
            </motion.div>
        </section>
    );
};

export default Hero;
