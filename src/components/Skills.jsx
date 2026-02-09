import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaReact, FaPhp,
    FaLaravel, FaNodeJs, FaJava, FaGitAlt, FaFigma, FaCode, FaServer, FaTools
} from 'react-icons/fa';
import {
    SiTailwindcss, SiMysql, SiMongodb, SiExpress,
    SiFlutter, SiExpo, SiSpringboot,
    SiPostman, SiGithub
} from 'react-icons/si';
import { VSCodeIcon } from './CustomIcons';
import { useLanguage } from '../LanguageContext';
import { HiCode, HiDatabase, HiCommandLine } from 'react-icons/hi';

const CategoryCard = ({ title, skills, color, icon: HeaderIcon }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="flex-1 min-w-[300px] p-8 rounded-[2rem] bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:border-black/5 dark:hover:border-white/10 group"
        >
            <div className="flex items-center gap-4 mb-8">
                <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-12"
                    style={{ backgroundColor: `${color}15`, color: color }}
                >
                    <HeaderIcon className="text-2xl" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white">
                    {title}
                </h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        whileHover={{
                            scale: 1.35,
                            zIndex: 40,
                            boxShadow: "0 25px 30px -5px rgb(0 0 0 / 0.15), 0 10px 15px -6px rgb(0 0 0 / 0.1)"
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 12 }}
                        className="relative flex flex-col items-center justify-center aspect-square rounded-2xl bg-white dark:bg-black border border-gray-100 dark:border-white/5 shadow-sm transition-all duration-300 cursor-help group/item"
                    >
                        <skill.icon
                            className="text-2xl md:text-3xl transition-transform duration-300 group-hover/item:scale-110"
                            style={{ color: skill.color }}
                        />

                        {/* Instant Tooltip */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-[9px] font-bold rounded opacity-0 group-hover/item:opacity-100 transition-all pointer-events-none z-50 whitespace-nowrap">
                            {skill.name}
                        </div>

                        {/* Subtle Glow */}
                        <div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover/item:opacity-10 transition-opacity"
                            style={{ backgroundColor: skill.color }}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const { t } = useLanguage();

    const skillCategories = [
        {
            title: "Frontend",
            color: "#61DAFB",
            icon: HiCode,
            skills: [
                { name: "ReactJS", icon: FaReact, color: "#61DAFB" },
                { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
                { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
                { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
                { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
                { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
            ]
        },
        {
            title: "Backend",
            color: "#6DB33F",
            icon: HiDatabase,
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
        {
            title: "Tools & Mobile",
            color: "#F2C811",
            icon: HiCommandLine,
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
    ];

    return (
        <section id="skills" className="section-padding bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
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

                {/* Categories Row */}
                <div className="flex flex-wrap lg:flex-nowrap gap-6">
                    {skillCategories.map((category, idx) => (
                        <CategoryCard
                            key={idx}
                            title={category.title}
                            skills={category.skills}
                            color={category.color}
                            icon={category.icon}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
