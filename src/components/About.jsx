import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

const About = () => {
    const { t } = useLanguage();

    // Fallback if lists are missing (safety check)
    const experiences = t.about.experiencesList || [];
    const formations = t.about.educationList || [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section id="about" className="section-padding bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-4">
                        {t.about.title} <span className="gradient-text">{t.about.titleHighlight}</span>
                    </h2>
                    <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
                        {t.about.subtitle}
                    </p>
                </motion.div>

                {/* Two Columns Layout */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Column - Expériences professionnelles */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-lg">
                                <FaBriefcase size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-black dark:text-white">
                                {t.about.experiences}
                            </h3>
                        </div>

                        {/* Experience Cards */}
                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                    className="bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 p-6 hover:border-black dark:hover:border-white transition-all"
                                >
                                    {/* Year and Location */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs font-semibold">
                                            <FaCalendar size={10} />
                                            {exp.year}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                                            <FaMapMarkerAlt size={10} />
                                            {exp.location}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h4 className="text-lg font-bold text-black dark:text-white mb-2">
                                        {exp.title}
                                    </h4>

                                    {/* Company */}
                                    <p className="text-black dark:text-white font-semibold mb-1">
                                        {exp.company}
                                    </p>

                                    {/* Subtitle */}
                                    {exp.subtitle && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            {exp.subtitle}
                                        </p>
                                    )}

                                    {/* Description */}
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                        {exp.description}
                                    </p>

                                    {/* Technologies */}
                                    {exp.technologies && (
                                        <div className="flex flex-wrap gap-2">
                                            {exp.technologies.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-3 py-1 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-black dark:text-white text-xs font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Formation */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-lg">
                                <FaGraduationCap size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-black dark:text-white">
                                {t.about.formation}
                            </h3>
                        </div>

                        {/* Formation Cards */}
                        <div className="space-y-6">
                            {formations.map((formation, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                    className="bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 p-6 hover:border-black dark:hover:border-white transition-all"
                                >
                                    {/* Year and Location */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs font-semibold">
                                            <FaCalendar size={10} />
                                            {formation.year}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                                            <FaMapMarkerAlt size={10} />
                                            {formation.location}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h4 className="text-lg font-bold text-black dark:text-white mb-2">
                                        {formation.title}
                                    </h4>

                                    {/* Institution */}
                                    <p className="text-black dark:text-white font-semibold mb-3">
                                        {formation.institution}
                                    </p>

                                    {/* Description */}
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {formation.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { number: "5+", label: t.about.stats.years },
                        { number: "3", label: t.about.stats.internships },
                        { number: "7+", label: t.about.stats.projects },
                        { number: "20+", label: t.about.stats.technologies },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="text-center p-6 bg-black dark:bg-white text-white dark:text-black"
                        >
                            <div className="text-4xl font-black mb-2">{stat.number}</div>
                            <div className="text-sm uppercase tracking-wider opacity-80">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default About;
