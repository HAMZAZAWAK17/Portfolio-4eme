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
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
                    <div className="flex items-center justify-between h-20 md:h-24">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-2xl md:text-3xl font-black text-black dark:text-white cursor-pointer tracking-tighter"
                            onClick={() => scrollToSection('#home')}
                        >
                            EH.
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(link.href);
                                    }}
                                    href={link.href}
                                    className="relative text-black dark:text-white hover:opacity-60 font-medium transition-all cursor-pointer text-sm uppercase tracking-wider group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4 md:gap-6">

                            {/* Email Button */}
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={`mailto:${personalInfo.email}`}
                                className="hidden md:flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold text-xs uppercase tracking-wider transition-all hover:opacity-80"
                            >
                                <FaEnvelope />
                                <span className="hidden xl:inline">{t.nav.email}</span>
                            </motion.a>

                            {/* Dark Mode Toggle */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 180 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleDarkMode}
                                className="p-2 md:p-3 text-black dark:text-white"
                            >
                                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                            </motion.button>

                            {/* Mobile Menu Button */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden text-black dark:text-white"
                            >
                                {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
                            className="fixed top-0 right-0 border-l bottom-0 w-full max-w-sm bg-white dark:bg-black border-gray-200 dark:border-gray-800 z-50 lg:hidden overflow-y-auto"
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
