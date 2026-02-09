import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGithub, FaExternalLinkAlt, FaClock, FaTooth,
    FaCloudSun, FaRegNewspaper, FaChalkboardTeacher,
    FaTasks, FaPaperPlane, FaShieldAlt, FaDatabase
} from 'react-icons/fa';
import { SiFlutter } from 'react-icons/si';
import { projects } from '../data/portfolioData';
import { useLanguage } from '../LanguageContext';

const iconMap = {
    FaTooth: FaTooth,
    SiFlutter: SiFlutter,
    FaCloudSun: FaCloudSun,
    FaRegNewspaper: FaRegNewspaper,
    FaChalkboardTeacher: FaChalkboardTeacher,
    FaTasks: FaTasks,
    FaPaperPlane: FaPaperPlane,
    FaShieldAlt: FaShieldAlt,
    FaDatabase: FaDatabase,
};

const Projects = () => {
    const { t } = useLanguage();
    const [filter, setFilter] = useState('all');

    const categories = [
        { id: 'all', name: t.projects.all },
        { id: 'frontend', name: t.projects.frontend },
        { id: 'fullstack', name: t.projects.fullstack },
        { id: 'mobile', name: t.projects.mobile || "Mobile" },
        { id: 'backend', name: t.projects.backend || "Backend" },
    ];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.category === filter);

    return (
        <section id="projects" className="section-padding bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                        {t.projects.title} <span className="text-black dark:text-white">{t.projects.titleHighlight}</span>
                    </h2>
                    <div className="w-24 h-1 bg-black dark:bg-white mx-auto"></div>
                    <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                        {t.projects.subtitle}
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setFilter(category.id)}
                            className={`relative px-6 py-3 font-semibold uppercase tracking-wider text-sm transition-colors duration-300 ${filter === category.id
                                ? 'text-white dark:text-black'
                                : 'text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300'
                                }`}
                        >
                            {/* Animated Background for Active State */}
                            {filter === category.id && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-black dark:bg-white rounded-none -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {/* Border for inactive state */}
                            {filter !== category.id && (
                                <div className="absolute inset-0 border-2 border-black dark:border-white opacity-20 hover:opacity-100 transition-opacity duration-300" />
                            )}
                            {category.name}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => {
                            const IconComponent = iconMap[project.icon] || FaTasks;

                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 overflow-hidden hover:border-black dark:hover:border-white transition-all duration-300"
                                >
                                    {/* Project Icon Container */}
                                    <div className="relative h-56 overflow-hidden bg-gray-50 dark:bg-gray-900 group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors duration-500">
                                        {/* Animated Background Elements */}
                                        <div className="absolute inset-0 overflow-hidden opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-black dark:bg-white blur-3xl animate-pulse"></div>
                                            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-black dark:bg-white blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                                        </div>

                                        <div className="relative h-full flex items-center justify-center p-8">
                                            <motion.div
                                                whileHover={{ scale: 1.2, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                className="text-7xl md:text-8xl text-black dark:text-white filter drop-shadow-lg"
                                            >
                                                <IconComponent />
                                            </motion.div>
                                        </div>

                                        {/* In Progress Badge */}
                                        {project.inProgress && (
                                            <div className="absolute top-4 right-4 bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-xs font-bold flex items-center gap-1 uppercase z-10">
                                                <FaClock />
                                                {t.projects.inProgress}
                                            </div>
                                        )}

                                        {/* Hover Overlay with Buttons */}
                                        <div className="absolute inset-0 bg-black/60 dark:bg-black/80 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                                            <motion.a
                                                whileHover={{ scale: 1.1, y: -5 }}
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex flex-col items-center gap-2 text-white dark:text-white hover:text-gray-300 transition-colors"
                                            >
                                                <div className="p-4 rounded-full border-2 border-white/50 hover:border-white transition-colors">
                                                    <FaGithub size={24} />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-widest">{t.projects.viewCode}</span>
                                            </motion.a>

                                            {project.demo && (
                                                <motion.a
                                                    whileHover={{ scale: 1.1, y: -5 }}
                                                    href={project.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex flex-col items-center gap-2 text-white dark:text-white hover:text-gray-300 transition-colors"
                                                >
                                                    <div className="p-4 rounded-full border-2 border-white/50 hover:border-white transition-colors">
                                                        <FaExternalLinkAlt size={24} />
                                                    </div>
                                                    <span className="text-xs font-bold uppercase tracking-widest">{t.projects.viewDemo}</span>
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-bold text-black dark:text-white">
                                                {project.title}
                                            </h3>
                                            <span className="text-[10px] px-2 py-0.5 border border-black dark:border-white text-black dark:text-white font-black uppercase tracking-tighter">
                                                {project.category}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-gray-50 dark:bg-gray-900 text-[10px] font-bold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800 uppercase tracking-widest group-hover:border-black dark:group-hover:border-white group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* No Projects Message */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Aucun projet dans cette catégorie
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Projects;
