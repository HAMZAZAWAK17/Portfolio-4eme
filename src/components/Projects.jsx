import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    FaGithub, FaExternalLinkAlt, FaClock, FaTooth,
    FaCloudSun, FaRegNewspaper, FaChalkboardTeacher,
    FaTasks, FaPaperPlane, FaShieldAlt, FaDatabase, FaArrowRight, FaTimes, FaChevronRight, FaChevronLeft,
    FaLaravel, FaPhp, FaNodeJs, FaReact, FaGitAlt
} from 'react-icons/fa';
import { 
    SiFlutter, SiReact, SiNodedotjs, SiExpress, SiMysql, SiLaravel, SiPhp, 
    SiTailwindcss, SiGit, SiFirebase, SiDart, SiNextdotjs, SiMongodb, SiSpringboot 
} from 'react-icons/si';
import { projects, socialLinks } from '../data/portfolioData';
import { useLanguage } from '../LanguageContext';

const techIconMap = {
    // Frontend
    'ReactJS': SiReact,
    'React.js': SiReact,
    'Next.js': SiNextdotjs,
    'TailwindCSS': SiTailwindcss,
    // Backend
    'Node.js': SiNodedotjs,
    'Express.js': SiExpress,
    'Express': SiExpress,
    'Laravel': SiLaravel,
    'PHP': SiPhp,
    'Spring Boot': SiSpringboot,
    // Database
    'MySQL': SiMysql,
    'MongoDB': SiMongodb,
    'Firebase': SiFirebase,
    // Mobile
    'Flutter': SiFlutter,
    'Dart': SiDart,
    // Tools
    'Git': SiGit,
};

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

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(true)}
                className="group relative cursor-pointer pt-6"
            >
                {/* Folder Back with Tab (Reference Style) */}
                <div className="relative aspect-[4/3] bg-[#2a2a2a] dark:bg-[#1a1a1a] rounded-2xl rounded-tl-none border border-white/5 shadow-2xl">
                    {/* Tab with rounded corner transition */}
                    <div className="absolute -top-5 left-0 h-5 w-32 bg-[#2a2a2a] dark:bg-[#1a1a1a] rounded-t-xl border-t border-l border-r border-white/5" />
                    
                    {/* Peeking "Feuille" (Sheet of Paper) */}
                    <div className="absolute inset-x-5 top-0 h-40 z-0">
                        <motion.div 
                            className="w-full h-full bg-white rounded-t-sm shadow-2xl p-2 relative overflow-hidden"
                            initial={{ y: 30, opacity: 0, rotate: 0 }}
                            whileHover={{ y: -45, opacity: 1, rotate: -2 }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        >
                            <div className="w-full h-full overflow-hidden rounded-t-sm border border-zinc-200 relative">
                                <motion.img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full absolute top-0 left-0 object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                                    initial={{ y: "0%" }}
                                    whileHover={{ y: "-60%" }}
                                    transition={{ duration: 5, ease: "linear" }}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Folder Front Face (Dark & Professional) */}
                    <motion.div 
                        className="absolute inset-0 z-10 bg-[#1a1a1a] dark:bg-[#0a0a0a] p-8 flex flex-col justify-between shadow-[-5px_0_30px_rgba(0,0,0,0.6)] rounded-2xl border border-white/10 origin-bottom"
                        style={{ backfaceVisibility: 'hidden' }}
                        initial={{ rotateX: 0 }}
                        whileHover={{ rotateX: -20 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 bg-white/5 border border-white/10 text-white rounded-xl">
                                    <IconComponent className="text-2xl" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                                    CASE_{project.id.toString().padStart(2, '0')}
                                </span>
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-black text-white uppercase leading-[0.9] mb-4 tracking-tighter">
                                {project.title}
                            </h3>
                            <p className="text-white/40 text-[11px] md:text-xs line-clamp-3 font-medium leading-relaxed italic">
                                "{project.description}"
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-6">
                            {project.technologies.slice(0, 3).map((tech, i) => {
                                const TechIcon = techIconMap[tech];
                                return (
                                    <div key={i} className="group/tech relative p-2 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all">
                                        {TechIcon ? <TechIcon className="text-xs" /> : <span className="text-[9px] font-black uppercase">{tech}</span>}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Team Members (Collaborative Projects) */}
                        {project.team && (
                            <div className="mt-4 flex items-center -space-x-3 overflow-visible">
                                {project.team.map((member, i) => (
                                    <div key={i} className="group/member relative">
                                        <img 
                                            src={member.image} 
                                            alt={member.name}
                                            className="w-8 h-8 rounded-full border-2 border-[#222] object-cover hover:z-30 transition-transform hover:scale-125"
                                        />
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-[8px] font-black uppercase tracking-tighter rounded opacity-0 group-hover/member:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                            {member.name}
                                        </div>
                                    </div>
                                ))}
                                <span className="ml-5 text-[8px] font-black text-white/20 uppercase tracking-widest">Team Project</span>
                            </div>
                        )}
                        
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
                                <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 text-[10px] text-white font-black uppercase tracking-[0.2em]">
                                    Scroll to explore case
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
                                                {project.technologies.map((tech, i) => {
                                                    const TechIcon = techIconMap[tech];
                                                    return (
                                                        <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/90">
                                                            {TechIcon && <TechIcon className="text-sm" />}
                                                            <span className="text-xs font-bold uppercase tracking-widest">{tech}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {project.team && (
                                            <div>
                                                <h5 className="text-white/30 font-bold uppercase tracking-widest text-[10px] mb-4">Project Team</h5>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {project.team.map((member, i) => (
                                                        <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
                                                            <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full border border-white/20 object-cover" />
                                                            <span className="text-white/90 text-[10px] font-black uppercase tracking-widest">{member.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-4 mt-12 pt-10 border-t border-white/5">
                                    <motion.a 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        href={project.github} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-4 px-8 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all duration-500"
                                    >
                                        <FaGithub size={20} />
                                        {t.projects.viewCode}
                                    </motion.a>
                                    {project.demo && (
                                        <motion.a 
                                            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                            whileTap={{ scale: 0.98 }}
                                            href={project.demo} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-4 px-8 py-5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all duration-500"
                                        >
                                            <FaExternalLinkAlt size={18} />
                                            {t.projects.viewDemo}
                                        </motion.a>
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
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <h4 className="text-black dark:text-white/40 font-black uppercase tracking-[0.4em] text-xs mb-4">Case Studies</h4>
                        <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter leading-none">
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
