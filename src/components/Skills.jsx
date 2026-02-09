import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
    FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaReact, FaPhp,
    FaLaravel, FaNodeJs, FaJava, FaGitAlt, FaFigma
} from 'react-icons/fa';
import {
    SiTailwindcss, SiMysql, SiMongodb, SiExpress,
    SiFlutter, SiExpo, SiIonic, SiSpringboot,
    SiPostman, SiGithub
} from 'react-icons/si';
import { VSCodeIcon } from './CustomIcons';
import { useLanguage } from '../LanguageContext';
import Iridescence from './Iridescence';

const SkillIcon = ({ skill, index, total, radius, isOrbiting, direction }) => {
    const angle = (index / total) * 360;
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;

    return (
        <motion.div
            className="absolute top-1/2 left-1/2 group/icon"
            style={{
                x: x - 28,
                y: y - 28,
                zIndex: 20
            }}
            whileHover={{ scale: 1.3, rotate: 5, zIndex: 50 }}
        >
            {/* Connection Line to Center (Visible on hover) */}
            <div
                className="absolute top-1/2 left-1/2 w-[1px] h-[170px] bg-gradient-to-t from-transparent via-current to-transparent opacity-0 group-hover/icon:opacity-20 transition-opacity duration-300 origin-bottom pointer-events-none"
                style={{
                    color: skill.color,
                    transform: `rotate(${angle + 90}deg) translateY(-85px)`
                }}
            />

            <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-xl transition-all duration-300 group-hover/icon:border-white/40 group-hover/icon:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:group-hover/icon:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <skill.icon
                    className="text-2xl md:text-3xl transition-transform duration-300 group-hover/icon:scale-110"
                    style={{ color: skill.color }}
                />

                {/* Tooltip */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold rounded uppercase tracking-widest opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none shadow-lg">
                    {skill.name}
                </div>
            </div>
        </motion.div>
    );
};

const CelestialOrbit = ({ title, skills, color, direction = "normal" }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [radius, setRadius] = useState(170);
    const containerRef = useRef(null);

    useEffect(() => {
        const updateRadius = () => setRadius(window.innerWidth < 768 ? 120 : 170);
        updateRadius();
        window.addEventListener('resize', updateRadius);
        return () => window.removeEventListener('resize', updateRadius);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] flex items-center justify-center perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated Orbit Rings */}
            <div className="absolute inset-4 rounded-full border border-white/5 dark:border-white/5 pointer-events-none" />
            <div className="absolute inset-12 rounded-full border border-dashed border-white/10 dark:border-white/10 animate-[spin_100s_linear_infinite] pointer-events-none" />

            {/* Rotating Satellites Container */}
            <motion.div
                className="absolute inset-0"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{
                    rotate: isHovered ? 0 : (direction === "normal" ? 360 : -360)
                }}
                transition={{
                    duration: 45,
                    repeat: Infinity,
                    ease: "linear",
                    paused: isHovered
                }}
            >
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${isHovered ? 0 : (direction === "normal" ? -360 : 360)}deg)`
                        }}
                    >
                        <SkillIcon
                            skill={skill}
                            index={index}
                            total={skills.length}
                            radius={radius}
                            direction={direction}
                        />
                    </div>
                ))}
            </motion.div>

            {/* Central Core */}
            <div className="relative group/core z-10 transition-transform duration-500 hover:scale-105">
                <div
                    className="absolute inset-[-30px] rounded-full blur-3xl opacity-20 transition-all duration-700 group-hover/core:opacity-40"
                    style={{ backgroundColor: color }}
                />

                <div
                    className="relative flex flex-col items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-2xl border border-white/10 dark:border-white/5 shadow-2xl overflow-hidden transition-all duration-500"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                    <span className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-center px-4 leading-tight group-hover/core:scale-110 transition-transform duration-500" style={{ color }}>
                        {title}
                    </span>
                    <div className="mt-4 w-12 h-1 rounded-full bg-white/20 transition-all duration-500 group-hover/core:w-20" style={{ backgroundColor: color }} />

                    {/* Decorative Scanner Line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20 animate-[scan_4s_ease-in-out_infinite]" />
                </div>
            </div>

            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-50px); opacity: 0; }
                    50% { opacity: 0.5; }
                    100% { transform: translateY(250px); opacity: 0; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .perspective-1000 { perspective: 1000px; }
            `}</style>
        </div>
    );
};

const Skills = () => {
    const { t } = useLanguage();

    const skillCategories = {
        frontend: {
            title: "Front End",
            color: "#61DAFB",
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
            title: "Back End",
            color: "#6DB33F",
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
        tools: {
            title: "Tools & Mobile",
            color: "#F2C811",
            skills: [
                { name: "Flutter", icon: SiFlutter, color: "#02569B" },
                { name: "Expo", icon: SiExpo, color: "#000020" },
                { name: "Git", icon: FaGitAlt, color: "#F05032" },
                { name: "GitHub", icon: SiGithub, color: "#181717" },
                { name: "Postman", icon: SiPostman, color: "#FF6C37" },
                { name: "Figma", icon: FaFigma, color: "#F24E1E" },
                { name: "VS Code", icon: VSCodeIcon, color: "#007ACC" },
            ]
        }
    };

    return (
        <section id="skills" className="relative section-padding bg-white dark:bg-black overflow-hidden py-32">
            {/* Premium Background Layer */}
            <div className="absolute inset-0 z-0">
                <Iridescence
                    color={typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? [0.2, 0.2, 0.2] : [0.8, 0.8, 0.8]}
                    mouseReact={false}
                    amplitude={0.05}
                    speed={0.5}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 font-['Outfit']">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-32"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-10 backdrop-blur-md">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-70">Tech Continuum 2026</span>
                    </div>

                    <h2 className="text-6xl md:text-9xl font-black text-black dark:text-white uppercase tracking-tighter mb-10 bg-clip-text text-transparent bg-gradient-to-b from-black to-black/40 dark:from-white dark:to-white/20">
                        {t.skills.title} <br className="md:hidden" />
                        <span className="text-outline">{t.skills.titleHighlight}</span>
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                        {t.skills.subtitle}
                    </p>
                </motion.div>

                {/* Celestial Grid */}
                <div className="flex flex-wrap items-center justify-center gap-24 xl:gap-0 xl:justify-between">
                    <CelestialOrbit
                        title="Front End"
                        skills={skillCategories.frontend.skills}
                        color={skillCategories.frontend.color}
                        direction="normal"
                    />
                    <CelestialOrbit
                        title="Back End"
                        skills={skillCategories.backend.skills}
                        color={skillCategories.backend.color}
                        direction="reverse"
                    />
                    <CelestialOrbit
                        title="Tools"
                        skills={skillCategories.tools.skills}
                        color={skillCategories.tools.color}
                        direction="normal"
                    />
                </div>
            </div>
        </section>
    );
};

export default Skills;
