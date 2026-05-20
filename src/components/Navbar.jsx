import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes, FaEnvelope, FaChevronDown } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../LanguageContext';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const { t } = useLanguage();

    // Active section state for highlighting the current section in the vertical nav
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Simple active section detection
            const sections = document.querySelectorAll('section[id]');
            let current = 'home';
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const navLinks = [
        { name: t.nav.home, href: '#home' },
        { name: t.nav.about, href: '#about' },
        { name: t.nav.skills, href: '#skills' },
        { name: t.nav.projects, href: '#projects' },
        { name: t.nav.services, href: '#services' },
        { name: t.nav.contact, href: '#contact' },
    ];

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-3' : 'pt-10'}`}
            >
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 transition-all duration-700">
                    <div className={`flex items-center justify-between px-6 md:px-8 py-4 rounded-[2rem] transition-all duration-700 ${
                        scrolled
                            ? 'bg-black/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                            : 'bg-transparent border-transparent'
                    }`}>

                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`text-xl md:text-2xl font-black cursor-pointer tracking-tighter transition-colors duration-500 flex items-center gap-2 ${scrolled ? 'text-white' : 'text-white mix-blend-difference'}`}
                            onClick={() => scrollToSection('#home')}
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] inline-block" />
                            EH.
                        </motion.div>

                        {/* Center Nav Links — only visible when scrolled */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.95, pointerEvents: scrolled ? 'auto' : 'none' }}
                            transition={{ duration: 0.3 }}
                            className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1.5"
                        >
                            {navLinks.map((link, index) => {
                                const isActive = activeSection === link.href.substring(1);
                                return (
                                    <motion.button
                                        key={index}
                                        onClick={() => scrollToSection(link.href)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${
                                            isActive
                                                ? 'text-black'
                                                : 'text-white/50 hover:text-white'
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-pill"
                                                className="absolute inset-0 bg-white rounded-full"
                                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{link.name}</span>
                                    </motion.button>
                                );
                            })}
                        </motion.div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-3">
                            {/* Dark Mode Toggle */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 180 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleDarkMode}
                                className={`p-2.5 rounded-full transition-all duration-500 ${
                                    scrolled
                                        ? 'text-white/70 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10'
                                        : 'text-white mix-blend-difference'
                                }`}
                            >
                                {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
                            </motion.button>

                            {/* Contact CTA — only when scrolled */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.8, pointerEvents: scrolled ? 'auto' : 'none' }}
                                transition={{ duration: 0.3 }}
                                onClick={() => scrollToSection('#contact')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden sm:flex items-center gap-2 px-5 py-2 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:bg-white/90"
                            >
                                <FaEnvelope size={10} />
                                Hire me
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Vertical Right Navigation removed as requested */}
        </>
    );
};

export default Navbar;
