import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCalendar, FaMapMarkerAlt, FaChevronRight, FaChevronLeft, FaCode, FaRocket, FaTerminal } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';
import { projects, skills } from '../data/portfolioData';
import TerminalTyping from './TerminalTyping';

const About = () => {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const bioRef = useRef(null);

    // Dynamic Stats Calculation
    const experiences = t.about.experiencesList || [];
    const formations = t.about.educationList || [];
    const internalProjectsCount = projects.length;
    const internShipsCount = experiences.filter(exp => exp.title.toLowerCase().includes('stage') || exp.title.toLowerCase().includes('internship')).length;

    // Calculate total techs from skills data
    const totalTechsCount = Object.values(skills).flat().length;

    // Split bio into words for reveal
    const words = (t.about.bio || "").split(' ');

    const { scrollYProgress: bioProgress } = useScroll({
        target: bioRef,
        offset: ["start end", "center center"]
    });

    const combinedTimeline = [
        ...experiences.map(exp => ({ ...exp, type: 'experience' })),
        ...formations.map(edu => ({ ...edu, type: 'education' }))
    ].sort((a, b) => {
        const yearA = parseInt(a.year.match(/\d{4}/)?.[0] || 0);
        const yearB = parseInt(b.year.match(/\d{4}/)?.[0] || 0);
        return yearB - yearA;
    });

    const nextStep = () => {
        if (currentIndex < combinedTimeline.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <section id="about" className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 transition-colors duration-500 overflow-hidden">
            {/* 1. Who Am I - Terminal Typing Effect */}
            <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-4 font-black">
                        {t.about.bioTitle}
                    </h2>
                    <div className="w-12 h-[2px] bg-black dark:bg-white mx-auto"></div>
                </motion.div>

                <TerminalTyping text={t.about.bio} speed={30} />
            </div>

            <div className="section-padding max-w-7xl mx-auto">
                {/* 2. Timeline Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-black text-black dark:text-white mb-6 tracking-tighter">
                        {t.about.title} <span className="gradient-text">{t.about.titleHighlight}</span>
                    </h2>
                    <div className="w-20 h-2 bg-black dark:bg-white mx-auto mb-8"></div>
                    <p className="text-gray-500 dark:text-gray-400 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        {t.about.subtitle}
                    </p>
                </motion.div>

                {/* 3. Horizontal Interactive Timeline */}
                <div className="relative group/timeline">
                    {/* Navigation Buttons - Repositioned for mobile */}
                    <div className="flex justify-between items-center md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 md:right-0 z-30 pointer-events-none md:-mx-8 mb-8 md:mb-0">
                        <NavButton onClick={prevStep} disabled={currentIndex === 0} icon={<FaChevronLeft />} />
                        <NavButton onClick={nextStep} disabled={currentIndex === combinedTimeline.length - 1} icon={<FaChevronRight />} />
                    </div>

                    <div className="min-h-[450px] md:min-h-[500px] flex items-center justify-center relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                className="w-full max-w-4xl"
                            >
                                <TimelineCard item={combinedTimeline[currentIndex]} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-12 flex justify-center items-center gap-3">
                        {combinedTimeline.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-1 transition-all duration-500 rounded-full ${index === currentIndex
                                    ? 'w-16 bg-black dark:bg-white'
                                    : 'w-4 bg-gray-200 dark:bg-gray-800'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* 4. Logical Dynamic Stats */}
                <div className="mt-40">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-900 overflow-hidden rounded-3xl shadow-2xl dark:shadow-[0_0_80px_rgba(255,255,255,0.15)]">
                        <StatItem
                            number={internalProjectsCount}
                            label={t.about.stats.projects}
                            icon={<FaRocket />}
                        />
                        <StatItem
                            number={internShipsCount}
                            label={t.about.stats.internships}
                            icon={<FaBriefcase />}
                        />
                        <StatItem
                            number={`${totalTechsCount}+`}
                            label={t.about.stats.technologies}
                            icon={<FaCode />}
                        />
                        <StatItem
                            number="5"
                            label={t.about.stats.years}
                            icon={<FaCalendar />}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const NavButton = ({ onClick, disabled, icon }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`p-4 md:p-6 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white pointer-events-auto transition-all duration-500 shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.1)] md:dark:shadow-[8px_8px_0px_rgba(255,255,255,0.1)] active:translate-x-1 active:translate-y-1 active:shadow-none ${disabled ? 'opacity-0 scale-50' : 'opacity-100 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] md:hover:shadow-[12px_12px_0px_rgba(0,0,0,1)]'
            }`}
    >
        {icon}
    </button>
);

const StatItem = ({ number, label, icon }) => (
    <div className="bg-white dark:bg-black p-6 md:p-10 flex flex-col items-center justify-center group hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-500 relative overflow-hidden border-r last:border-r-0 border-gray-100 dark:border-gray-900 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
        {/* Intensive White Ombre Fade (Dark Mode only) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.1] to-transparent opacity-0 dark:opacity-100 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <div className="text-gray-200 dark:text-gray-800 text-2xl md:text-3xl mb-4 transition-colors group-hover:text-black dark:group-hover:text-white relative z-10">
            {icon}
        </div>
        <div className="text-4xl md:text-6xl font-black text-black dark:text-white mb-2 tracking-tighter relative z-10">
            {number}
        </div>
        <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 text-center relative z-10">
            {label}
        </div>
    </div>
);

const TimelineCard = ({ item }) => {
    const isExp = item.type === 'experience';

    return (
        <div className="relative p-6 md:p-20 bg-gray-50 dark:bg-gray-900/50 border-2 border-black dark:border-white shadow-[10px_10px_0px_rgba(0,0,0,1)] md:shadow-[20px_20px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_rgba(255,255,255,0.1)] md:dark:shadow-[20px_20px_0px_rgba(255,255,255,0.1)] overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                {isExp ? <FaBriefcase size={200} className="md:size-[300px]" /> : <FaGraduationCap size={200} className="md:size-[300px]" />}
            </div>

            <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8">
                    <span className="px-4 md:px-6 py-1.5 md:py-2 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-[10px] md:text-xs">
                        {item.year}
                    </span>
                    <span className={`px-4 md:px-6 py-1.5 md:py-2 border-2 border-black dark:border-white font-black uppercase tracking-widest text-[9px] md:text-[10px] ${isExp ? 'text-blue-500' : 'text-purple-500'}`}>
                        {isExp ? 'Expérience' : 'Formation'}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-gray-400 ml-auto">
                        <FaMapMarkerAlt />
                        {item.location}
                    </div>
                </div>

                <h3 className="text-2xl md:text-6xl font-black text-black dark:text-white mb-4 tracking-tighter leading-tight md:leading-none">
                    {item.title}
                </h3>

                <div className="flex items-center gap-3 md:gap-4 text-base md:text-2xl font-bold text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
                    <div className="w-8 md:w-12 h-1 bg-black dark:bg-white" />
                    {isExp ? item.company : item.institution}
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-xl leading-relaxed mb-8 md:mb-10 max-w-3xl font-medium">
                    {item.description}
                </p>

                {isExp && item.technologies && (
                    <div className="flex flex-wrap gap-2 md:gap-3">
                        {item.technologies.map((tech, i) => (
                            <span
                                key={i}
                                className="px-3 md:px-4 py-1 md:py-1.5 bg-white dark:bg-black border-2 border-black dark:border-white text-[8px] md:text-[10px] font-black uppercase tracking-widest text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default About;
