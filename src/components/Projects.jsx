import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaClock } from 'react-icons/fa';
import { projects } from '../data/portfolioData';
import { useLanguage } from '../LanguageContext';

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
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 overflow-hidden hover:border-black dark:hover:border-white transition-colors"
                            >
                                {/* Project Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* In Progress Badge */}
                                    {project.inProgress && (
                                        <div className="absolute top-4 right-4 bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-xs font-bold flex items-center gap-1 uppercase z-10">
                                            <FaClock />
                                            {t.projects.inProgress}
                                        </div>
                                    )}

                                    {/* Hover Buttons */}
                                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                        <motion.a
                                            initial={{ y: 20, opacity: 0 }}
                                            whileHover={{ scale: 1.1 }}
                                            animate={filter ? { y: 0, opacity: 1 } : {}} // Hack to trigger animation on hover if needed, or rely on CSS group-hover
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shadow-xl"
                                            title={t.projects.viewCode}
                                        >
                                            <FaGithub size={20} />
                                        </motion.a>
                                        {project.demo && (
                                            <motion.a
                                                whileHover={{ scale: 1.1 }}
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shadow-xl"
                                                title={t.projects.viewDemo}
                                            >
                                                <FaExternalLinkAlt size={20} />
                                            </motion.a>
                                        )}
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 text-xs font-medium uppercase tracking-wider"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

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
