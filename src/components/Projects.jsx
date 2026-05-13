import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    FaGithub, FaExternalLinkAlt, FaClock, FaTooth,
    FaCloudSun, FaRegNewspaper, FaChalkboardTeacher,
    FaTasks, FaPaperPlane, FaShieldAlt, FaDatabase, FaArrowRight, FaTimes, FaChevronRight, FaChevronLeft
} from 'react-icons/fa';
import { SiFlutter } from 'react-icons/si';
import { projects, socialLinks } from '../data/portfolioData';
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

/* ─────────────────────────────────────────
   PROJECT FOLDER COMPONENT
───────────────────────────────────────── */
const ProjectFolder = ({ project, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();
    const IconComponent = iconMap[project.icon] || FaTasks;

    // Animation Variants
    const folderVariants = {
        closed: { rotateX: 0, y: 0 },
        hover: { rotateX: -25, y: 10 }
    };

    const sheetVariants = (i) => ({
        closed: { y: 20, opacity: 0, rotate: 0 },
        hover: { 
            y: -40 - (i * 15), 
            opacity: 1, 
            rotate: (i - 1) * 5,
            transition: { delay: i * 0.05, type: "spring", stiffness: 200, damping: 20 }
        }
    });

    const displayImages = project.gallery ? [project.image, ...project.gallery.slice(0, 2)] : [project.image];

    return (
        <>
            <motion.div
                layout
                initial="closed"
                whileHover="hover"
                animate="closed"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(true)}
                className="group relative cursor-pointer pt-8"
            >
                {/* Folder Back with Tab */}
                <div className="relative aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 rounded-2xl rounded-tl-none border border-black/5 dark:border-white/5 shadow-xl">
                    {/* Refined Tab */}
                    <div className="absolute -top-5 left-0 h-5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-t-xl border-t border-l border-r border-black/5 dark:border-white/5">
                        <div className="absolute -right-5 bottom-0 w-5 h-5 bg-transparent rounded-bl-full shadow-[-5px_5px_0_5px_#e4e4e7] dark:shadow-[-5px_5px_0_5px_#27272a] pointer-events-none" />
                    </div>
                    
                    {/* Fanned Out Sheets (Multiple Images) */}
                    {displayImages.map((img, i) => (
                        <div key={i} className="absolute inset-x-8 top-0 h-40 z-0">
                            <motion.div 
                                variants={sheetVariants(i)}
                                className="w-full h-full bg-white p-1.5 shadow-xl rounded-sm origin-bottom border border-zinc-200"
                            >
                                <img 
                                    src={img} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                            </motion.div>
                        </div>
                    ))}

                    {/* Folder Front Face (Cleaner 'Normal' Style) */}
                    <motion.div 
                        variants={folderVariants}
                        className="absolute inset-0 z-10 bg-white dark:bg-zinc-900 p-7 flex flex-col justify-between shadow-[-10px_0_30px_rgba(0,0,0,0.1)] rounded-2xl border border-black/5 dark:border-white/10 origin-bottom"
                        style={{ backfaceVisibility: 'hidden' }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    >
                        <div>
                            <div className="flex items-center gap-4 mb-5">
                                <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white rounded-xl">
                                    <IconComponent className="text-2xl" />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
                                    {project.category}
                                </span>
                            </div>
                            
                            <h3 className="text-2xl font-black text-black dark:text-white uppercase leading-none mb-3 tracking-tighter">
                                {project.title}
                            </h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-3 font-medium leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.technologies.slice(0, 3).map((tech, i) => (
                                <span key={i} className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        
                        {/* Interactive Hint */}
                        <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-2 text-black dark:text-white font-black text-[10px] uppercase tracking-widest">
                                Open Folder <FaChevronRight size={10} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/5 border border-white/10 text-white rounded-lg">
                                    <IconComponent className="text-xl" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                                    P_{project.id.toString().padStart(2, '0')}
                                </span>
                            </div>
                            
                            <h3 className="text-xl md:text-2xl font-black text-white uppercase leading-tight mb-3 tracking-tighter">
                                {project.title}
                            </h3>
                            <p className="text-white/50 text-xs md:text-sm line-clamp-3 font-medium leading-relaxed italic">
                                "{project.description}"
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.technologies.slice(0, 3).map((tech, i) => (
                                <span key={i} className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 bg-white/5 text-white/70 border border-white/10 rounded-md">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        
                        {/* Interactive Hint */}
                        <div className="absolute bottom-5 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-2 text-white font-black text-[9px] uppercase tracking-[0.3em] bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                                View Case <FaChevronRight className="text-[8px]" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* FULL SCREEN PROJECT DETAILS MODAL */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 lg:p-20 overflow-hidden"
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setIsOpen(false)} />
                        
                        {/* Close Button */}
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-10 right-10 z-[110] text-white/50 hover:text-white transition-colors p-4"
                        >
                            <FaTimes size={32} />
                        </button>

                        <motion.div 
                            layoutId={`project-${project.id}`}
                            className="relative w-full max-w-7xl h-full bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 flex flex-col md:flex-row"
                        >
                            {/* Left Side: Image Gallery (The Swipe Up Animation) */}
                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-black overflow-y-auto no-scrollbar scroll-smooth snap-y snap-mandatory">
                                <div className="p-4 md:p-10 space-y-8">
                                    {(project.gallery || [project.image]).map((img, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                            className="snap-center"
                                        >
                                            <img 
                                                src={img} 
                                                alt={`${project.title} screenshot ${i}`}
                                                className="w-full rounded-2xl shadow-2xl border border-white/5"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                                
                                {/* Floating Label for Gallery */}
                                <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] text-white font-black uppercase tracking-widest">
                                    Scroll to explore gallery
                                </div>
                            </div>

                            {/* Right Side: Details */}
                            <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-16 flex flex-col justify-between bg-zinc-900">
                                <div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-16 h-16 bg-white flex items-center justify-center rounded-2xl">
                                            <IconComponent className="text-3xl text-black" />
                                        </div>
                                        <div>
                                            <h4 className="text-white/50 font-black uppercase tracking-widest text-xs mb-1">Project Overview</h4>
                                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                                                {project.title}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div>
                                            <h5 className="text-white/30 font-bold uppercase tracking-widest text-[10px] mb-4">About the project</h5>
                                            <p className="text-white/70 text-lg leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div>
                                            <h5 className="text-white/30 font-bold uppercase tracking-widest text-[10px] mb-4">Technologies used</h5>
                                            <div className="flex flex-wrap gap-3">
                                                {project.technologies.map((tech, i) => (
                                                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/90 text-xs font-bold uppercase tracking-widest">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-white/5">
                                    <a 
                                        href={project.github} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-zinc-200 transition-colors"
                                    >
                                        <FaGithub size={18} />
                                        {t.projects.viewCode}
                                    </a>
                                    {project.demo && (
                                        <a 
                                            href={project.demo} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-3 px-8 py-5 border border-white/20 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/5 transition-colors"
                                        >
                                            <FaExternalLinkAlt size={16} />
                                            {t.projects.viewDemo}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
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
        <section id="projects" className="section-padding bg-zinc-50 dark:bg-black border-t border-gray-200 dark:border-zinc-900 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Title */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <h4 className="text-black dark:text-white/40 font-black uppercase tracking-[0.4em] text-xs mb-4">Case Studies</h4>
                        <h2 className="text-5xl md:text-7xl font-black text-black dark:text-white uppercase tracking-tighter leading-none">
                            {t.projects.title} <br/>
                            <span className="text-zinc-300 dark:text-zinc-800 italic">{t.projects.titleHighlight}</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2"
                    >
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setFilter(category.id)}
                                className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 border ${
                                    filter === category.id 
                                    ? 'bg-black text-white dark:bg-white dark:text-black border-transparent' 
                                    : 'bg-transparent text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, idx) => (
                            <ProjectFolder key={project.id} project={project} index={idx} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* No Projects Message */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-gray-600 dark:text-gray-400 text-lg uppercase tracking-widest font-black">
                            {t.projects.noProjects}
                        </p>
                    </motion.div>
                )}

                {/* Discover All My Projects Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 pt-20 border-t border-zinc-200 dark:border-zinc-900 flex flex-col items-center"
                >
                    <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-10"
                    >
                        <span className="text-4xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter group-hover:italic transition-all">
                            {t.github.viewAll}
                        </span>
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-black dark:border-white flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white transition-all group-hover:rotate-45">
                            <FaArrowRight className="text-2xl md:text-4xl text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-all" />
                        </div>
                    </a>
                    
                    <div className="mt-10 flex gap-4 overflow-hidden">
                         {[...Array(10)].map((_, i) => (
                            <span key={i} className="text-zinc-200 dark:text-zinc-800 font-black uppercase text-[10px] tracking-[0.5em] whitespace-nowrap animate-marquee">
                                +50 Repositories on GitHub • 
                            </span>
                         ))}
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default Projects;
