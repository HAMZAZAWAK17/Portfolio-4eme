import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCalendar, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

const About = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('experience');
    const containerRef = useRef(null);

    // Fallback if lists are missing
    const experiences = t.about.experiencesList || [];
    const formations = t.about.educationList || [];

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        },
        exit: {
            opacity: 0,
            transition: { staggerChildren: 0.1, staggerDirection: -1 }
        }
    };

    return (
        <section
            id="about"
            ref={containerRef}
            className="section-padding bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 transition-colors duration-500 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-black text-black dark:text-white mb-6 tracking-tighter">
                        {t.about.title} <span className="gradient-text">{t.about.titleHighlight}</span>
                    </h2>
                    <div className="w-20 h-2 bg-black dark:bg-white mx-auto mb-8"></div>
                    <p className="text-gray-500 dark:text-gray-400 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        {t.about.subtitle}
                    </p>
                </motion.div>

                {/* Cyber-Toggle System */}
                <div className="flex justify-center mb-24">
                    <div className="relative flex bg-gray-100 dark:bg-gray-900/50 p-2 rounded-2xl border border-gray-200 dark:border-gray-800 w-full max-w-lg backdrop-blur-xl">
                        <motion.div
                            className="absolute inset-y-2 bg-black dark:bg-white rounded-xl z-0 shadow-2xl"
                            initial={false}
                            animate={{
                                x: activeTab === 'experience' ? '0%' : '100%',
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 35 }}
                            style={{ width: 'calc(50% - 8px)' }}
                        />

                        <button
                            onClick={() => setActiveTab('experience')}
                            className={`flex-1 relative z-10 py-4 px-8 rounded-xl text-base font-black transition-all duration-500 flex items-center justify-center gap-3 ${activeTab === 'experience' ? 'text-white dark:text-black scale-105' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                                }`}
                        >
                            <FaBriefcase className={activeTab === 'experience' ? 'animate-pulse' : ''} />
                            <span className="uppercase tracking-widest">{t.about.experiences}</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('education')}
                            className={`flex-1 relative z-10 py-4 px-8 rounded-xl text-base font-black transition-all duration-500 flex items-center justify-center gap-3 ${activeTab === 'education' ? 'text-white dark:text-black scale-105' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                                }`}
                        >
                            <FaGraduationCap className={activeTab === 'education' ? 'animate-pulse' : ''} />
                            <span className="uppercase tracking-widest">{t.about.formation}</span>
                        </button>
                    </div>
                </div>

                {/* Interactive Timeline */}
                <div className="relative max-w-5xl mx-auto px-4">
                    {/* Animated Drawing Path */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-100 dark:bg-gray-900 transform md:-translate-x-1/2">
                        <motion.div
                            className="absolute top-0 left-0 right-0 bg-black dark:bg-white origin-top"
                            style={{ scaleY, height: '100%' }}
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative"
                        >
                            {(activeTab === 'experience' ? experiences : formations).map((item, index) => (
                                <TimelineItem
                                    key={index}
                                    item={item}
                                    index={index}
                                    type={activeTab}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Premium Bento Stats */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { number: "5+", label: t.about.stats.years, color: "from-blue-500/10" },
                        { number: "3", label: t.about.stats.internships, color: "from-purple-500/10" },
                        { number: "7+", label: t.about.stats.projects, color: "from-green-500/10" },
                        { number: "20+", label: t.about.stats.technologies, color: "from-orange-500/10" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`relative overflow-hidden p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl group`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${stat.color} to-transparent`} />
                            <div className="relative z-10 text-center">
                                <span className="text-6xl font-black text-black dark:text-white block mb-2 transition-transform duration-500 group-hover:scale-110">
                                    {stat.number}
                                </span>
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
                                    {stat.label}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TimelineItem = ({ item, index, type }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, x: isEven ? -100 : 100 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 20, stiffness: 100 } }
            }}
            className={`relative flex flex-col md:flex-row items-center justify-center w-full mb-16 md:mb-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
            {/* Timeline Node */}
            <div className="absolute left-4 md:left-1/2 w-8 h-8 md:w-10 md:h-10 bg-white dark:bg-black rounded-full border-4 border-black dark:border-white transform md:-translate-x-1/2 z-20 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                {type === 'experience' ? <FaBriefcase className="text-xs md:text-sm text-black dark:text-white" /> : <FaGraduationCap className="text-xs md:text-sm text-black dark:text-white" />}
            </div>

            {/* Content Side */}
            <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-20' : 'md:pl-20'}`}>
                <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative p-8 md:p-10 bg-gray-50 dark:bg-gray-900/40 border-2 border-transparent hover:border-black dark:hover:border-white transition-all duration-500 shadow-2xl overflow-hidden group rounded-None"
                >
                    {/* Decorative Background Icon */}
                    <div className="absolute -right-8 -bottom-8 opacity-[0.03] dark:opacity-[0.05] rotate-12 transition-transform duration-700 group-hover:scale-150">
                        {type === 'experience' ? <FaBriefcase size={200} /> : <FaGraduationCap size={200} />}
                    </div>

                    {/* Top Meta Info */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <span className="px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                            {item.year}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                            <FaMapMarkerAlt />
                            {item.location}
                        </div>
                    </div>

                    {/* Main Title */}
                    <h3 className="text-2xl md:text-3xl font-black text-black dark:text-white mb-2 leading-tight tracking-tighter">
                        {item.title}
                    </h3>

                    {/* Subtitle / Company */}
                    <div className="flex items-center gap-2 text-lg font-bold text-gray-600 dark:text-gray-300 mb-6">
                        <span className="w-6 h-[2px] bg-black dark:bg-white" />
                        {type === 'experience' ? item.company : item.institution}
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-base mb-8">
                        {item.description}
                    </p>

                    {/* Tech Badges for Experience */}
                    {type === 'experience' && item.technologies && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                            {item.technologies.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 text-[9px] font-black uppercase tracking-widest text-black dark:text-white group-hover:border-black dark:group-hover:border-white transition-all"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Visual Indicator for Education */}
                    {type === 'education' && (
                        <div className="flex justify-end mt-4">
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <FaChevronRight className="text-gray-300 dark:text-gray-700 group-hover:text-black dark:group-hover:text-white transition-colors" />
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Empty Side (Desktop only) */}
            <div className="hidden md:block md:w-1/2"></div>
        </motion.div>
    );
};

export default About;
