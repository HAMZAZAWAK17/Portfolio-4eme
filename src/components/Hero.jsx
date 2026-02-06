import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight, FaCode } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/portfolioData';
import profileImage from '../assets/profile.jpg';
import { useLanguage } from '../LanguageContext';
import { useState, useEffect } from 'react';
import Iridescence from './Iridescence';

import TrueFocus from './TrueFocus';



const Hero = () => {
    const { t } = useLanguage();
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    const scrollToProjects = () => {
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    // Subtle grey scale colors based on theme
    const iridescenceColor = isDark ? [0.4, 0.4, 0.4] : [0.7, 0.7, 0.7];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, 0.05, 0.01, 0.9],
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.6, 0.05, 0.01, 0.9],
            },
        },
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black">
            {/* Parallax Background Elements */}
            <motion.div style={{ y: y1 }} className="absolute top-20 left-10 w-64 h-64 bg-gray-100 dark:bg-gray-800 rounded-full blur-3xl opacity-30 -z-10" />
            <motion.div style={{ y: y2 }} className="absolute bottom-20 right-10 w-96 h-96 bg-gray-200 dark:bg-gray-700 rounded-full blur-3xl opacity-30 -z-10" />

            {/* Iridescence Background */}
            <div className="absolute inset-0 z-0">
                <Iridescence
                    color={iridescenceColor}
                    mouseReact={true}
                    amplitude={0.1}
                    speed={0.5}
                />
            </div>

            {/* Main Content Container */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative z-20"
                    >
                        {/* Greeting Text */}
                        <motion.div variants={itemVariants} className="mb-8 md:mb-12">
                            <p className="text-base md:text-lg text-black dark:text-white font-normal inline-block border-b-2 border-black dark:border-white pb-1">
                                {t.hero.greeting}
                            </p>
                        </motion.div>

                        {/* Main Title Section */}
                        <div className="relative mb-12">
                            <motion.div variants={itemVariants}>
                                <TrueFocus
                                    sentence={`${t.hero.title1} ${t.hero.title2} ${t.hero.subtitle}`}
                                    manualMode={false}
                                    blurAmount={5}
                                    borderColor={isDark ? "#ffffff" : "#000000"}
                                    glowColor={isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.2)"}
                                    animationDuration={0.5}
                                    pauseBetweenAnimations={1}
                                />
                            </motion.div>
                        </div>

                        {/* Location */}
                        <motion.p
                            variants={itemVariants}
                            className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-lg"
                        >
                            {t.hero.location}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-4 mb-12"
                        >
                            <motion.button
                                whileHover={{ x: 5, backgroundColor: '#000', color: '#fff' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={scrollToProjects}
                                className="group relative px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 shadow-xl"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {t.hero.viewProjects}
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <FaArrowRight className="text-xs" />
                                    </motion.span>
                                </span>
                            </motion.button>

                            <motion.button
                                whileHover={{ x: 5, backgroundColor: '#000', color: '#fff' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={scrollToContact}
                                className="group px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white font-semibold text-sm uppercase tracking-wider transition-all duration-300 dark:hover:bg-white dark:hover:text-black"
                            >
                                <span className="flex items-center gap-2">
                                    {t.hero.contactMe}
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                                    >
                                        <FaArrowRight className="text-xs" />
                                    </motion.span>
                                </span>
                            </motion.button>
                        </motion.div>

                        {/* Social Icons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex gap-6"
                        >
                            {[
                                { icon: FaGithub, link: socialLinks.github, label: 'GitHub' },
                                { icon: FaLinkedin, link: socialLinks.linkedin, label: 'LinkedIn' },
                                { icon: FaEnvelope, link: `mailto:${personalInfo.email}`, label: 'Email' },
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-xl md:text-2xl"
                                    aria-label={social.label}
                                >
                                    <social.icon />
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Floating Profile Image Card */}
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative flex items-center justify-center lg:justify-end"
                    >
                        {/* Floating Animation Container */}
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative"
                        >
                            {/* Main Image Card */}
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                transition={{ duration: 0.4 }}
                                className="relative bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl"
                                style={{
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                }}
                            >
                                {/* Profile Image */}
                                <div className="relative w-[280px] h-[350px] md:w-[320px] md:h-[400px] lg:w-[380px] lg:h-[480px] rounded-2xl overflow-hidden">
                                    <img
                                        src={profileImage}
                                        alt={personalInfo.name}
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Glassmorphism Badge - Bottom */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2 }}
                                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full backdrop-blur-md bg-white/90 dark:bg-black/90 border border-gray-200 dark:border-gray-700 shadow-lg min-w-max"
                                >
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        >
                                            <FaCode className="text-black dark:text-white text-sm" />
                                        </motion.div>
                                        <span className="text-black dark:text-white font-bold text-sm uppercase tracking-wider">
                                            {t.hero.badge}
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Badge DISPONIBLE - Top Right */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.2 }}
                                    className="absolute -top-4 -right-4 bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-bold text-xs uppercase tracking-wider shadow-lg z-10"
                                >
                                    {t.hero.available}
                                </motion.div>

                                {/* Decorative Elements */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.5 }}
                                    className="absolute -top-3 -left-3 w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-lg"
                                >
                                    <motion.span
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-2xl"
                                    >
                                        ✨
                                    </motion.span>
                                </motion.div>
                            </motion.div>

                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest text-black dark:text-white font-medium">
                    {t.hero.scroll}
                </span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-16 bg-black dark:bg-white"
                />
            </motion.div>
        </section>
    );
};

export default Hero;
