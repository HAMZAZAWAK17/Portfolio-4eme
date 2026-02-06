import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes, FaEnvelope, FaChevronDown } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../LanguageContext';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const { language, changeLanguage, t } = useLanguage();
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
    ];

    const currentLang = languages.find(lang => lang.code === language);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setLangDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
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

    const handleLanguageChange = (langCode) => {
        changeLanguage(langCode);
        setLangDropdownOpen(false);
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
                            {/* Language Dropdown */}
                            <div className="relative hidden md:block" ref={dropdownRef}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 text-black dark:text-white hover:border-black dark:hover:border-white transition-all"
                                >
                                    <span className="text-xl">{currentLang?.flag}</span>
                                    <span className="text-xs font-bold uppercase">{currentLang?.code}</span>
                                    <FaChevronDown className={`text-xs transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
                                </motion.button>

                                <AnimatePresence>
                                    {langDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full mt-2 right-0 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 shadow-lg min-w-[150px]"
                                        >
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => handleLanguageChange(lang.code)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors ${language === lang.code ? 'bg-gray-100 dark:bg-gray-900' : ''
                                                        }`}
                                                >
                                                    <span className="text-xl">{lang.flag}</span>
                                                    <span className="text-sm font-medium text-black dark:text-white">{lang.name}</span>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

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

                                {/* Language Selector Mobile */}
                                <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3 block">
                                        {language === 'ar' ? 'اللغة' : language === 'en' ? 'Language' : 'Langue'}
                                    </span>
                                    <div className="space-y-2">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLanguageChange(lang.code)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${language === lang.code
                                                    ? 'bg-black dark:bg-white text-white dark:text-black'
                                                    : 'border-2 border-gray-200 dark:border-gray-800 text-black dark:text-white hover:border-black dark:hover:border-white'
                                                    }`}
                                            >
                                                <span className="text-2xl">{lang.flag}</span>
                                                <span className="text-sm font-bold">{lang.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Email Button Mobile */}
                                <motion.a
                                    whileTap={{ scale: 0.95 }}
                                    href={`mailto:${personalInfo.email}`}
                                    className="flex items-center justify-center gap-2 px-6 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm uppercase tracking-wider mt-6"
                                >
                                    <FaEnvelope />
                                    {language === 'ar' ? 'إرسال بريد' : language === 'en' ? 'Send Email' : 'Envoyer un email'}
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
