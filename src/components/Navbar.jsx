import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes, FaEnvelope, FaChevronDown } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../LanguageContext';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const { t } = useLanguage();

    // Active section state for highlighting the current section in the vertical nav
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

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
            {/* Floating Header */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
                className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
            >
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-8">
                    <div className="flex items-start justify-between">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-2xl md:text-3xl font-black text-white cursor-pointer tracking-tighter pointer-events-auto mix-blend-difference"
                            onClick={() => scrollToSection('#home')}
                        >
                            EH.
                        </motion.div>

                        {/* Right Side Actions (Top Corner) */}
                        <div className="flex items-center gap-4 pointer-events-auto mix-blend-difference">
                            {/* Dark Mode Toggle */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 180 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleDarkMode}
                                className="p-3 text-white"
                            >
                                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Vertical Right Navigation (Floating Glass Pill) */}
            <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 z-50 bg-black/30 dark:bg-black/50 backdrop-blur-xl border border-white/10 dark:border-white/20 rounded-full py-6 px-3 shadow-2xl">
                {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                        <div key={index} className="group relative flex items-center justify-center">
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => scrollToSection(link.href)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-white/30 hover:bg-white/80'}`}
                            />
                            {/* Hover Tooltip */}
                            <div className="absolute right-8 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300">
                                <div className="bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm whitespace-nowrap shadow-lg">
                                    {link.name}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Navbar;
