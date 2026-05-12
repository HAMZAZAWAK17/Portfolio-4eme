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

            {/* Vertical Right Navigation */}
            <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50 pointer-events-auto mix-blend-difference items-end">
                {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ x: -5 }}
                            onClick={() => scrollToSection(link.href)}
                            className={`group flex items-center gap-3 text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                        >
                            <span className="hidden md:block">{link.name}</span>
                            {/* Small line/dot indicator */}
                            <div className={`h-px transition-all duration-300 bg-white ${isActive ? 'w-8' : 'w-4 group-hover:w-6'}`} />
                        </motion.button>
                    );
                })}
            </div>
        </>
    );
};

export default Navbar;
