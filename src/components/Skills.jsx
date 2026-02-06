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
            className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px] flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setActiveSkill(null); }}
        >
            <style>
                {`
                    @keyframes orbit {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>

            {/* Background Circle */}
            <div
                className="absolute inset-0 rounded-full border-2 border-dashed opacity-20 transition-all duration-300"
                style={{
                    borderColor: color,
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                }}
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
                    const radius = 145; // Increased radius
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * radius;
                    const y = Math.sin(rad) * radius;

                    return (
                        <div
                            key={index}
                            className="absolute top-1/2 left-1/2 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-black rounded-full shadow-lg border-2 border-gray-100 dark:border-gray-800 hover:scale-125 hover:border-black dark:hover:border-white transition-all duration-300 cursor-pointer z-20"
                            style={{
                                transform: `translate(${x - 28}px, ${y - 28}px)`, // -28 is half of w-14 (56px)
                            }}
                            onMouseEnter={() => setActiveSkill(skill)}
                            onMouseLeave={() => setActiveSkill(null)}
                        >
                            {/* Counter-rotate to keep icon upright */}
                            <div
                                style={{
                                    animation: `orbit 60s linear infinite reverse`,
                                    animationDirection: direction === 'normal' ? 'reverse' : 'normal',
                                    animationPlayState: isHovered ? 'paused' : 'running'
                                }}
                                className="flex items-center justify-center w-full h-full"
                            >
                                <skill.icon
                                    className="text-xl md:text-2xl transition-colors duration-300"
                                    style={{ color: skill.color }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Central Information Hub */}
            <div
                className="relative z-30 flex flex-col items-center justify-center w-36 h-36 md:w-44 md:h-44 rounded-full bg-white dark:bg-black border-4 shadow-2xl transition-all duration-300 overflow-hidden"
                style={{
                    borderColor: color,
                    boxShadow: activeSkill ? `0 0 40px ${activeSkill.color}40` : `0 0 20px ${color}20`
                }}
            >
                <AnimatePresence mode="wait">
                    {activeSkill ? (
                        <motion.div
                            key="skill"
                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col items-center justify-center text-center p-2"
                        >
                            <activeSkill.icon
                                className="text-4xl md:text-5xl mb-2 filter drop-shadow-md"
                                style={{ color: activeSkill.color }}
                            />
                            <span
                                className="text-sm md:text-base font-bold text-black dark:text-white"
                            >
                                {activeSkill.name}
                            </span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="title"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-center text-center w-full h-full p-2 group cursor-default"
                        >
                            <span
                                className="text-lg md:text-2xl font-black uppercase tracking-widest break-words w-full"
                                style={{ color: color }}
                            >
                                {title}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
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
        <section id="skills" className="section-padding bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-4">
                        {t.skills.title} <span className="gradient-text">{t.skills.titleHighlight}</span>
                    </h2>
                    <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        {t.skills.subtitle}
                    </p>
                </motion.div>

                {/* Orbits Grid */}
                <div className="flex flex-wrap xl:flex-nowrap items-center justify-center gap-8 lg:gap-12">
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
