import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';

// Import all custom 3D / tech images
import biIcon from '../assets/bi.png';
import csharpIcon from '../assets/csharp.png';
import gitIcon from '../assets/git.png';
import javaIcon from '../assets/java3d.png';
import nodeIcon from '../assets/node.png';
import reactIcon from '../assets/reactjs3d.png';
import reactNativeIcon from '../assets/reactnatif3d.png';
import vsIcon from '../assets/vs.png';
import laravelIcon from '../assets/laravel3d.png';
import flutterIcon from '../assets/flutter3d.png';
import expressIcon from '../assets/express3d.png';
import cursorIcon from '../assets/cursor3d.png';
import mongodbIcon from '../assets/MONGODB.png';
import springbootIcon from '../assets/SPRINGBOOT.png';
import intellijIcon from '../assets/sticker_intellijidea (2).png';

const allSkills = [
    { name: "ReactJS", image: reactIcon, color: "#61DAFB" },
    { name: "React Native", image: reactNativeIcon, color: "#61DAFB" },
    { name: "NodeJS", image: nodeIcon, color: "#339933" },
    { name: "Express", image: expressIcon, color: "#808080" },
    { name: "Laravel", image: laravelIcon, color: "#FF2D20" },
    { name: "Spring Boot", image: springbootIcon, color: "#6DB33F" },
    { name: "MongoDB", image: mongodbIcon, color: "#47A248" },
    { name: "Flutter", image: flutterIcon, color: "#02569B" },
    { name: "Java", image: javaIcon, color: "#f89820" },
    { name: "C#", image: csharpIcon, color: "#9b4f96" },
    { name: "Git", image: gitIcon, color: "#F05032" },
    { name: "Power BI", image: biIcon, color: "#F2C811" },
    { name: "VS Code", image: vsIcon, color: "#007ACC" },
    { name: "IntelliJ IDEA", image: intellijIcon, color: "#FE315D" },
    { name: "Cursor", image: cursorIcon, color: "#ffffff" },
];

const Skills = () => {
    const { t } = useLanguage();
    
    // Duplicate skills to ensure seamless infinite loop
    const marqueeSkills = [...allSkills, ...allSkills, ...allSkills];

    return (
        <section id="skills" className="py-24 bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden select-none">
            <div className="max-w-[100vw]">
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

                {/* Infinite Marquee Container */}
                <div className="relative flex overflow-hidden py-10">
                    <motion.div 
                        className="flex whitespace-nowrap gap-12 md:gap-20"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ 
                            duration: 30, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                    >
                        {marqueeSkills.map((skill, index) => (
                            <div key={index} className="flex flex-col items-center gap-6 group">
                                {/* Icon Container (Squircle Style) */}
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 dark:bg-zinc-900/50 rounded-[2rem] border border-gray-100 dark:border-white/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-zinc-800 group-hover:shadow-2xl">
                                    <img 
                                        src={skill.image} 
                                        alt={skill.name}
                                        className="w-12 h-12 md:w-16 md:h-16 object-contain grayscale group-hover:grayscale-0 transition-all duration-500" 
                                    />
                                </div>
                                
                                {/* Label */}
                                <div className="text-center flex flex-col gap-1">
                                    <span className="text-xs md:text-sm font-black uppercase tracking-widest text-black dark:text-white">
                                        {skill.name}
                                    </span>
                                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
                                        Technology
                                    </span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
