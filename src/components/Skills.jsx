import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaReact, FaPhp,
    FaLaravel, FaNodeJs, FaJava, FaGitAlt, FaFigma
} from 'react-icons/fa';
import { SiTailwindcss, SiMysql, SiMongodb, SiExpress, SiFlutter, SiExpo, SiSpringboot, SiPostman, SiGithub, SiDotnet } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { VSCodeIcon } from './CustomIcons';
import { useLanguage } from '../LanguageContext';

const allSkills = [
    { name: "ReactJS", icon: FaReact, color: "#61DAFB" },
    { name: "NodeJS", icon: FaNodeJs, color: "#339933" },
    { name: "Flutter", icon: SiFlutter, color: "#02569B" },
    { name: "Laravel", icon: FaLaravel, color: "#FF2D20" },
    { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
    { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
    { name: "PHP", icon: FaPhp, color: "#777BB4" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "Spring", icon: SiSpringboot, color: "#6DB33F" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Express", icon: SiExpress, color: "#000000" },
    { name: "C#", icon: TbBrandCSharp, color: "#239120" },
    { name: ".NET", icon: SiDotnet, color: "#512BD4" },
    { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
    { name: "Expo", icon: SiExpo, color: "#000020" },
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
    { name: "GitHub", icon: SiGithub, color: "#181717" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "Figma", icon: FaFigma, color: "#F24E1E" },
    { name: "VS Code", icon: VSCodeIcon, color: "#007ACC" },
];

const Skills = () => {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(Math.floor(allSkills.length / 2));

    const handleDragEnd = (e, { offset, velocity }) => {
        const swipe = offset.x;
        // Swipe left -> Next item
        if (swipe < -50) {
            setActiveIndex((prev) => Math.min(prev + 1, allSkills.length - 1));
        } 
        // Swipe right -> Prev item
        else if (swipe > 50) {
            setActiveIndex((prev) => Math.max(prev - 1, 0));
        }
    };

    return (
        <section id="skills" className="py-32 bg-white dark:bg-black transition-colors duration-500 overflow-hidden select-none">
            <div className="max-w-[100vw] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-2 text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold mb-4">
                            <span className="w-8 h-[1px] bg-zinc-300 dark:bg-zinc-800" />
                            My Expertise
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-black dark:text-white leading-tight">
                            {t.skills.title} <span className="opacity-30 italic">{t.skills.titleHighlight}</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-sm md:text-right"
                    >
                        {t.skills.subtitle}
                    </motion.p>
                </div>

                {/* 3D Coverflow Carousel */}
                <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1200px] mt-10">
                    
                    {/* Invisible Drag Overlay */}
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
                    />

                    {/* Cards */}
                    {allSkills.map((skill, index) => {
                        const offset = index - activeIndex;
                        const absOffset = Math.abs(offset);
                        const isVisible = absOffset <= 4; // Only render cards somewhat close to center

                        if (!isVisible) return null;

                        return (
                            <motion.div
                                key={index}
                                animate={{
                                    x: offset * 130, // Spacing between cards
                                    scale: 1 - absOffset * 0.15, // Scale down the further they are
                                    rotateY: offset * -25, // Angle them towards the center (Coverflow effect)
                                    z: -absOffset * 100, // Push them back in 3D space
                                    opacity: absOffset >= 3 ? 0 : 1 - absOffset * 0.2, // Fade out edges
                                    zIndex: 40 - absOffset, // Ensure center card is always on top
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className={`absolute w-56 h-72 md:w-64 md:h-80 flex flex-col items-center justify-center rounded-[2.5rem] border transition-colors ${
                                    offset === 0 
                                        ? 'bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-white/10 shadow-2xl' 
                                        : 'bg-white dark:bg-black border-gray-100 dark:border-white/5 shadow-md'
                                }`}
                                style={{
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {/* Subtle Glow for active card */}
                                {offset === 0 && (
                                    <div 
                                        className="absolute -inset-4 rounded-[2.5rem] opacity-20 blur-2xl -z-10 pointer-events-none transition-all"
                                        style={{ backgroundColor: skill.color }}
                                    />
                                )}
                                
                                <skill.icon 
                                    className="text-7xl md:text-8xl mb-8 drop-shadow-lg" 
                                    style={{ color: skill.color }} 
                                />
                                <span className="text-lg md:text-xl font-black uppercase tracking-[0.2em] text-black dark:text-white">
                                    {skill.name}
                                </span>
                            </motion.div>
                        );
                    })}

                    {/* Indicators */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-40 pointer-events-none">
                        {allSkills.map((_, i) => (
                            <div 
                                key={i} 
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === activeIndex 
                                        ? 'w-6 bg-black dark:bg-white' 
                                        : 'w-1.5 bg-black/20 dark:bg-white/20'
                                }`} 
                            />
                        ))}
                    </div>
                </div>
                
                {/* Drag Hint */}
                <div className="text-center mt-8 text-xs font-bold uppercase tracking-widest text-black/30 dark:text-white/30 flex items-center justify-center gap-2">
                    <span className="w-10 h-px bg-black/20 dark:bg-white/20" />
                    Swipe or Drag
                    <span className="w-10 h-px bg-black/20 dark:bg-white/20" />
                </div>
            </div>
        </section>
    );
};

export default Skills;
