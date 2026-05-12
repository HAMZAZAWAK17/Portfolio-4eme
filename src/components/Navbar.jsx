import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes, FaEnvelope, FaChevronDown } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../LanguageContext';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
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
            setMobileMenuOpen(false);
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

                        {/* Right Side Actions (Floating Button Container) */}
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

                            {/* Sidebar Menu Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setMobileMenuOpen(true)}
                                className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors duration-300"
                            >
                                <FaBars size={20} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Sidebar Menu (Now used on all screen sizes) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-[#0a0a0a] border-l border-black/10 dark:border-white/10 z-50 overflow-y-auto shadow-2xl"
                        >
                            {/* Close Button */}
                            <div className="flex justify-end p-6">
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-black dark:text-white"
                                >
                                    <FaTimes size={24} />
                                </motion.button>
                            </div>

                            {/* Menu Links */}
                            <div className="flex flex-col px-6 pb-6 space-y-6">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={index}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        whileHover={{ x: 10 }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(link.href);
                                        }}
                                        href={link.href}
                                        className="text-black dark:text-white hover:opacity-60 font-bold text-2xl cursor-pointer uppercase tracking-wider transition-all"
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}


                                {/* Email Button Mobile */}
                                <motion.a
                                    whileTap={{ scale: 0.95 }}
                                    href={`mailto:${personalInfo.email}`}
                                    className="flex items-center justify-center gap-2 px-6 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm uppercase tracking-wider mt-6"
                                >
                                    <FaEnvelope />
                                    Send Email
                                </motion.a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
