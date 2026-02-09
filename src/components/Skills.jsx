import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
    FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaReact, FaPhp,
    FaLaravel, FaNodeJs, FaJava, FaCode, FaGitAlt, FaDocker, FaFigma
} from 'react-icons/fa';
import {
    SiTailwindcss, SiMysql, SiMongodb, SiExpress, SiCanva,
    SiFlutter, SiExpo, SiIonic, SiSpringboot,
    SiEclipseide, SiIntellijidea, SiPostman, SiGithub
} from 'react-icons/si';
import { MdDashboard, MdPhoneIphone } from 'react-icons/md';
import { PowerBIIcon, VSCodeIcon } from './CustomIcons';
import { useLanguage } from '../LanguageContext';

const SkillOrbit = ({ title, skills, color, direction = "normal" }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [activeSkill, setActiveSkill] = useState(null);

    return (
        <div
            className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setActiveSkill(null); }}
        >
            <style>
                {`
                    @keyframes orbit {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes pulse-glow {
                        0%, 100% { opacity: 0.3; transform: scale(1); }
                        50% { opacity: 0.6; transform: scale(1.1); }
                    }
                    @keyframes float-slow {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                `}
            </style>

            {/* Premium Background Glow */}
            <div
                className="absolute inset-0 rounded-full blur-[100px] transition-all duration-700 opacity-20 group-hover:opacity-40"
                style={{ backgroundColor: color }}
            />

            {/* Outer Orbit Path */}
            <div
                className="absolute inset-0 rounded-full border border-dashed opacity-10 transition-all duration-500 group-hover:opacity-30 group-hover:scale-110"
                style={{ borderColor: color, animation: `orbit 100s linear infinite ${direction === 'reverse' ? 'reverse' : 'normal'}` }}
            />

            {/* Inner Orbit Path */}
            <div
                className="absolute inset-[15%] rounded-full border border-dotted opacity-20 transition-all duration-500 group-hover:opacity-40"
                style={{ borderColor: color, animation: `orbit 80s linear infinite ${direction === 'reverse' ? 'normal' : 'reverse'}` }}
            />

            {/* Rotating Orbit Container */}
            <div
                className="absolute inset-0"
                style={{
                    animation: `orbit 60s linear infinite`,
                    animationDirection: direction,
                    animationPlayState: isHovered ? 'paused' : 'running'
                }}
            >
                {skills.map((skill, index) => {
                    const angle = (index / skills.length) * 360;
                    // Responsive radius
                    const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 130 : 170;
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * radius;
                    const y = Math.sin(rad) * radius;

                    return (
                        <div
                            key={index}
                            className="absolute top-1/2 left-1/2 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:scale-125 hover:rotate-6 hover:border-white/40 transition-all duration-500 cursor-pointer z-20 group/icon"
                            style={{
                                transform: `translate(${x - 32}px, ${y - 32}px)`,
                            }}
                            onMouseEnter={() => setActiveSkill(skill)}
                            onMouseLeave={() => setActiveSkill(null)}
                        >
                            {/* Icon Glow */}
                            <div
                                className="absolute inset-0 rounded-2xl md:rounded-3xl blur-md opacity-0 group-hover/icon:opacity-50 transition-opacity duration-300"
                                style={{ backgroundColor: skill.color }}
                            />

                            {/* Counter-rotate to keep icon upright */}
                            <div
                                style={{
                                    animation: `orbit 60s linear infinite reverse`,
                                    animationDirection: direction === 'normal' ? 'reverse' : 'normal',
                                    animationPlayState: isHovered ? 'paused' : 'running'
                                }}
                                className="relative flex items-center justify-center w-full h-full"
                            >
                                <skill.icon
                                    className="text-xl md:text-3xl transition-all duration-300 group-hover/icon:scale-110"
                                    style={{
                                        color: skill.color,
                                        filter: `drop-shadow(0 0 8px ${skill.color}40)`
                                    }}
                                />
                            </div>

                            {/* Tooltip */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 dark:bg-white/90 text-white dark:text-black text-xs font-bold rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-white/10 dark:border-black/10">
                                {skill.name}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Central Information Hub */}
            <div className="relative z-30 group/center">
                {/* Pulsing Aura */}
                <div
                    className="absolute inset-[-20px] rounded-full blur-2xl opacity-20 transition-all duration-500 group-hover/center:opacity-40"
                    style={{ backgroundColor: color, animation: 'pulse-glow 4s ease-in-out infinite' }}
                />

                <div
                    className="relative flex flex-col items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-full backdrop-blur-2xl bg-white/5 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-2xl transition-all duration-500 overflow-hidden"
                    style={{
                        boxShadow: activeSkill ? `0 0 60px ${activeSkill.color}30` : `0 0 40px ${color}20`
                    }}
                >
                    <AnimatePresence mode="wait">
                        {activeSkill ? (
                            <motion.div
                                key="skill"
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                                transition={{ type: "spring", damping: 15 }}
                                className="flex flex-col items-center justify-center text-center p-4"
                            >
                                <activeSkill.icon
                                    className="text-5xl md:text-7xl mb-4 filter drop-shadow-lg"
                                    style={{ color: activeSkill.color }}
                                />
                                <span className="text-xl md:text-2xl font-black tracking-tight text-black dark:text-white">
                                    {activeSkill.name}
                                </span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="title"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex flex-col items-center justify-center text-center w-full h-full p-4"
                            >
                                <span
                                    className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] leading-tight"
                                    style={{
                                        color: color,
                                        textShadow: `0 0 20px ${color}40`
                                    }}
                                >
                                    {title}
                                </span>
                                <div className="mt-4 w-12 h-1 rounded-full opacity-50" style={{ backgroundColor: color }} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const Skills = () => {
    const { t } = useLanguage();

    // Define categories locally with icons
    const skillCategories = {
        frontend: {
            title: "Frontend",
            color: "#61DAFB", // React Blue
            skills: [
                { name: "ReactJS", icon: FaReact, color: "#61DAFB" },
                { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
                { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
                { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
                { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
                { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
            ]
        },
        backend: {
            title: "Backend",
            color: "#6DB33F", // Spring Green
            skills: [
                { name: "NodeJS", icon: FaNodeJs, color: "#339933" },
                { name: "Laravel", icon: FaLaravel, color: "#FF2D20" },
                { name: "PHP", icon: FaPhp, color: "#777BB4" },
                { name: "Java", icon: FaJava, color: "#007396" },
                { name: "Spring", icon: SiSpringboot, color: "#6DB33F" },
                { name: "MySQL", icon: SiMysql, color: "#4479A1" },
                { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
                { name: "Express", icon: SiExpress, color: "#000000" },
            ]
        },
        mobileTools: {
            title: "Tools",
            color: "#F2C811", // Yellow
            skills: [
                { name: "Flutter", icon: SiFlutter, color: "#02569B" },
                { name: "Expo", icon: SiExpo, color: "#000020" },
                { name: "Ionic", icon: SiIonic, color: "#3880FF" },
                { name: "Git", icon: FaGitAlt, color: "#F05032" },
                { name: "GitHub", icon: SiGithub, color: "#181717" },
                { name: "Postman", icon: SiPostman, color: "#FF6C37" },
                { name: "Figma", icon: FaFigma, color: "#F24E1E" },
                { name: "VS Code", icon: VSCodeIcon, color: "#007ACC" },
            ]
        }
    };

    return (
        <section id="skills" className="relative section-padding bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center text-center mb-24"
                >
                    <div className="flex items-center gap-6 mb-4">
                        <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-black dark:border-white">
                            <div className="w-4 h-4 rounded-full bg-black dark:bg-white animate-pulse"></div>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-black dark:text-white uppercase tracking-tighter">
                            {t.skills.title} <span className="text-outline text-black dark:text-white opacity-40">{t.skills.titleHighlight}</span>
                        </h2>
                    </div>
                    <div className="w-32 h-1.5 bg-black dark:bg-white mb-8"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        {t.skills.subtitle}
                    </p>
                </motion.div>

                {/* Orbits Grid */}
                <div className="flex flex-wrap items-center justify-center gap-16 lg:gap-24">
                    <SkillOrbit
                        title="Front End"
                        skills={skillCategories.frontend.skills}
                        color={skillCategories.frontend.color}
                        direction="normal"
                    />
                    <SkillOrbit
                        title="Back End"
                        skills={skillCategories.backend.skills}
                        color={skillCategories.backend.color}
                        direction="reverse"
                    />
                    <SkillOrbit
                        title="Tools"
                        skills={skillCategories.mobileTools.skills}
                        color={skillCategories.mobileTools.color}
                        direction="normal"
                    />
                </div>
            </div>
        </section>
    );
};

export default Skills;
