import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight, FaMapMarkerAlt, FaCode, FaTerminal, FaLayerGroup, FaPalette, FaHammer, FaRocket, FaMobileAlt, FaChartBar, FaDatabase } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/portfolioData';
import heroImage from '../assets/Gemini_Generated_Image_s0abzes0abzes0ab.png';
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
    const [hasAnimated, setHasAnimated] = useState(() => {
        return sessionStorage.getItem(`has_animated_${text}`) === 'true';
    });

    useEffect(() => {
        if (!hasAnimated) {
            sessionStorage.setItem(`has_animated_${text}`, 'true');
        }
    }, [text, hasAnimated]);

    const chars = Array.from(text);
    return (
        <span className={className} aria-label={text} style={{ display: 'inline-block', overflow: 'hidden', ...style }}>
            {chars.map((ch, i) => (
                <motion.span
                    key={i}
                    initial={hasAnimated ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                        duration: 0.7,
                        delay: delay + i * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`inline-block ${ch.trim() ? 'bg-[#e8e8e8] text-black px-1 md:px-[6px] mx-[2px]' : 'w-4 md:w-8'}`}
                    style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
                >
                    {ch}
                </motion.span>
            ))}
        </span>
    );
};

/* ─────────────────────────────────────────
   Floating tech elements around the image
───────────────────────────────────────── */
const FloatingElement = ({ icon: Icon, x, y, delay = 0, duration = 4, size = 'text-2xl' }) => (
    <motion.div
        className={`absolute z-30 pointer-events-none flex items-center justify-center bg-white/10 backdrop-blur-xl p-4 rounded-full border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]`}
        style={{ left: x, top: y }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
        }}
        transition={{ 
            opacity: { delay, duration: 1 },
            scale: { delay, duration: 1 },
            y: { duration, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: duration * 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
    >
        <div className={`${size} text-white`}>
            <Icon />
        </div>
    </motion.div>
);

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
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            >
                {[...items, ...items].map((item, i) => (
                    <span key={i} className="text-white dark:text-white text-[11px] uppercase tracking-[0.4em] font-black">
                        {item} <span className="text-white/50 mx-4">◆</span>
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
    const nameScale   = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
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
            className="relative min-h-screen overflow-hidden bg-black transition-colors duration-300"
        >
            {/* ── Grain ── */}
            <NoiseOverlay />

            {/* ── Solid background base ── */}
            <div className="absolute inset-0 z-0 bg-black transition-colors duration-300" />

            {/* ── Right-side portrait image ── */}
            {/* ── Center portrait image (z-40 puts it in front of text) ── */}
            <div className="absolute inset-0 z-40 flex justify-center items-end pointer-events-none">
                <motion.div
                    className="relative w-full h-full max-w-[850px]"
                    style={{
                        x: mxSlow,
                        y: mySlow,
                    }}
                >
                    <motion.img
                        src={heroImage}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-contain object-bottom drop-shadow-[0_0_1px_rgba(255,255,255,1)] drop-shadow-[0_0_3px_rgba(255,255,255,1)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                        style={{
                            scale: imgScale,
                            opacity: imgOpacity,
                        }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                    
                    {/* Floating Tech Icons Around Image - Hidden/Smaller on Mobile */}
                    <div className="hidden sm:block">
                        <FloatingElement icon={FaCode} x="5%" y="40%" delay={1.5} />
                        <FloatingElement icon={FaTerminal} x="85%" y="35%" delay={1.8} />
                        <FloatingElement icon={FaLayerGroup} x="0%" y="65%" delay={2.1} />
                        <FloatingElement icon={FaPalette} x="90%" y="60%" delay={2.4} />
                        <FloatingElement icon={FaMobileAlt} x="10%" y="20%" delay={2.7} />
                        <FloatingElement icon={FaChartBar} x="80%" y="15%" delay={3.0} />
                        <FloatingElement icon={FaDatabase} x="45%" y="10%" delay={3.3} />
                        <FloatingElement icon={FaHammer} x="15%" y="75%" delay={3.6} size="text-xl" />
                        <FloatingElement icon={FaRocket} x="75%" y="78%" delay={3.9} size="text-xl" />
                    </div>

                    {/* Strong fade at the bottom to blend with background */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to top, #000 0%, #000 10%, transparent 50%)' }}
                    />
                </motion.div>
                
                {/* Radial vignette for cinematic blackness around edges */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)' }}
                />
            </div>

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

            {/* ── GIANT Cinematic Title (Background Layer) ── */}
            <motion.div 
                className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
                style={{ y: textY, opacity: textOpacity }}
            >
                <div className="flex flex-col gap-2">
                    <motion.div style={{ x: mx, y: my, scale: nameScale }} className="flex flex-col items-center justify-center text-center w-full gap-1 md:gap-2">
                        <SplitText
                            text="EZ-ZOUEK"
                            delay={0.5}
                            className="block font-black uppercase leading-none tracking-tighter w-full"
                            style={{ fontSize: 'clamp(2.5rem, 15vw, 10rem)' }}
                        />
                        <SplitText
                            text="HAMZA"
                            delay={0.7}
                            className="block font-black uppercase leading-none tracking-tighter w-full"
                            style={{
                                fontSize: 'clamp(2.5rem, 15vw, 10rem)',
                            }}
                        />
                    </motion.div>
                </div>
            </motion.div>

            {/* ═══════════════════════════════════════
                FOREGROUND CONTENT (Interactive Layer)
            ═══════════════════════════════════════ */}
            <motion.div
                className="relative z-50 min-h-screen flex flex-col justify-between px-6 md:px-14 lg:px-20 pt-20 md:pt-28 pb-10 pointer-events-none"
                style={{ y: textY, opacity: textOpacity }}
            >
                {/* ── Top row: greeting + available badge ── */}
                <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 pointer-events-auto">
                    <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-white text-[11px] md:text-base uppercase tracking-[0.35em] font-bold text-center md:text-left"
                    >
                        {t.hero.greeting}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex items-center gap-2 border border-white/20 px-4 py-2 backdrop-blur-sm bg-black/30 rounded-full"
                    >
                        <motion.span
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 1.6, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"
                        />
                        <span className="text-white text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-black">
                            {t.hero.available}
                        </span>
                    </motion.div>
                </div>

                {/* ── Foreground Description ── */}
                <div className="flex flex-col gap-2 mt-auto mb-auto pt-8 md:pt-0 pointer-events-none">
                     {/* Placeholder to maintain spacing on desktop */}
                     <div className="hidden md:block" style={{ height: 'clamp(7rem, 22vw, 20rem)' }}></div>
                     {/* On mobile, we add a bit of space to not overlap with the background title too much */}
                     <div className="block md:hidden h-24 sm:h-32"></div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mt-10">
                    <div className="flex flex-col gap-6 pointer-events-auto w-full md:w-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3, duration: 0.8 }}
                            className="flex flex-col gap-4 max-w-[280px] md:max-w-[320px] mx-auto md:mx-0"
                        >
                            <div className="h-px flex-grow-0 w-12 bg-white/30 hidden md:block" />
                            <p className="text-white/80 text-[10px] md:text-[11px] uppercase tracking-widest font-bold leading-[1.8] text-justify">
                                Software Engineering Student, Web & Mobile Developer, Co-founder of W&H Agency.
                            </p>
                        </motion.div>

                        {/* Stats pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.7, duration: 0.8 }}
                            className="flex justify-center md:justify-start gap-3 md:gap-6"
                        >
                            {stats.map((s, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    className="border border-white/15 hover:border-white/50 backdrop-blur-sm px-3 md:px-5 py-2 md:py-3 text-center transition-all duration-300 min-w-[70px] md:min-w-[90px]"
                                >
                                    <div className="text-white font-black text-lg md:text-2xl leading-none">{s.value}</div>
                                    <div className="text-white/50 text-[8px] md:text-[9px] uppercase tracking-widest mt-1 font-bold">{s.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* CTAs + socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.9, duration: 0.8 }}
                        className="flex flex-col items-center md:items-end gap-5 w-full md:w-auto"
                    >
                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pointer-events-auto relative z-30 w-full sm:w-auto">
                            <motion.button
                                whileHover={{ backgroundColor: '#ffffff', color: '#000000', scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={scrollToProjects}
                                className="flex items-center justify-center gap-3 px-7 py-3.5 border border-white text-white font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 w-full sm:w-auto"
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
                                className="flex items-center justify-center gap-3 px-7 py-3.5 border border-white/30 text-white/70 font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 w-full sm:w-auto"
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
                        <div className="flex gap-5 relative z-30 pointer-events-auto">
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
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 hidden md:flex pointer-events-none"
            >
                <span className="text-white/30 text-[9px] uppercase tracking-[0.4em]">{t.hero.scroll}</span>
                <motion.div
                    animate={{ scaleY: [0, 1, 0], y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-px h-14 origin-top"
                    style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }}
                />
            </motion.div>


        </section>
    );
};

export default Hero;
