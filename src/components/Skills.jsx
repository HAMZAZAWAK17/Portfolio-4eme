import { motion } from 'framer-motion';
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

    return (
        <section id="skills" className="py-32 bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
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

                {/* Infinite 3D Carousel Row */}
                <div className="relative w-full py-10 flex overflow-hidden group">
                    {/* Fade Edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-white dark:from-black to-transparent z-20 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-white dark:from-black to-transparent z-20 pointer-events-none" />
                    
                    <motion.div
                        className="flex gap-8 md:gap-12 shrink-0 pr-8 md:pr-12"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 45, ease: "linear", repeat: Infinity }}
                    >
                        {[...allSkills, ...allSkills].map((skill, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ 
                                    scale: 1.1,
                                    y: -20,
                                    rotateY: -10,
                                    rotateX: 10,
                                }}
                                style={{
                                    transformStyle: "preserve-3d",
                                    perspective: "1000px"
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="w-44 h-44 md:w-56 md:h-56 shrink-0 relative flex flex-col items-center justify-center rounded-[2rem] bg-gray-50 dark:bg-zinc-900/40 border border-gray-100 dark:border-white/5 cursor-pointer shadow-lg hover:shadow-2xl"
                            >
                                {/* Subtle 3D inner border glow */}
                                <div className="absolute inset-0 rounded-[2rem] border-[0.5px] border-white/50 dark:border-white/10 pointer-events-none" style={{ transform: "translateZ(1px)" }} />
                                
                                {/* Icon with floating 3D effect */}
                                <motion.div style={{ transform: "translateZ(40px)" }} className="flex flex-col items-center gap-6">
                                    <skill.icon 
                                        className="text-5xl md:text-7xl transition-transform duration-500" 
                                        style={{ color: skill.color, filter: `drop-shadow(0px 10px 15px ${skill.color}40)` }} 
                                    />
                                    <span className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-black/80 dark:text-white/80">
                                        {skill.name}
                                    </span>
                                </motion.div>
                                
                                {/* Massive Background Glow on Hover */}
                                <div 
                                    className="absolute -inset-4 rounded-[2.5rem] opacity-0 hover:opacity-20 transition-opacity duration-500 blur-2xl -z-10 pointer-events-none"
                                    style={{ backgroundColor: skill.color }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
