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
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl"
                    >
                        <h4 className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">My Stack</h4>
                        <h2 className="text-5xl md:text-8xl font-black text-black dark:text-white leading-[0.9] tracking-tighter">
                            {t.skills.title} <br/>
                            <span className="text-zinc-300 dark:text-zinc-800 italic">{t.skills.titleHighlight}</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gray-500 dark:text-gray-400 text-lg md:text-2xl max-w-md md:text-right font-medium leading-relaxed"
                    >
                        {t.skills.subtitle}
                    </motion.p>
                </div>

                {/* Infinite Marquee Container */}
                <div className="relative flex overflow-hidden py-20 bg-zinc-50/50 dark:bg-zinc-900/10 border-y border-zinc-100 dark:border-white/5">
                    <motion.div 
                        className="flex whitespace-nowrap gap-16 md:gap-32 px-16"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ 
                            duration: 40, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                    >
                        {marqueeSkills.map((skill, index) => (
                            <div key={index} className="flex flex-col items-center gap-8 group cursor-pointer">
                                {/* Icon Container (Premium Squircle) */}
                                <div className="w-28 h-28 md:w-40 md:h-40 bg-white dark:bg-zinc-900/50 rounded-[3rem] border border-zinc-100 dark:border-white/5 flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:bg-black group-hover:border-black dark:group-hover:bg-white dark:group-hover:border-white group-hover:shadow-3xl relative overflow-hidden">
                                    <img 
                                        src={skill.image} 
                                        alt={skill.name}
                                        className="w-14 h-14 md:w-20 md:h-20 object-contain grayscale group-hover:grayscale-0 group-hover:invert dark:group-hover:invert-0 transition-all duration-700 relative z-10" 
                                    />
                                    {/* Reveal Circle on Hover */}
                                    <div className="absolute inset-0 bg-white dark:bg-black opacity-0 group-hover:opacity-10 scale-0 group-hover:scale-150 transition-all duration-700 rounded-full" />
                                </div>
                                
                                {/* Label */}
                                <div className="text-center flex flex-col gap-2">
                                    <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-black dark:text-white transition-all group-hover:italic group-hover:tracking-[0.4em]">
                                        {skill.name}
                                    </span>
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-[1px] bg-zinc-300 dark:bg-zinc-800" />
                                        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
                                            TECH
                                        </span>
                                        <div className="w-4 h-[1px] bg-zinc-300 dark:bg-zinc-800" />
                                    </div>
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
