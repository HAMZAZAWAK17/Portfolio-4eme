import { motion } from 'framer-motion';
import { certifications } from '../data/portfolioData';
import { FaReact, FaPython, FaAward, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';
import { SiUdemy } from 'react-icons/si';

const iconMap = {
    FaPython: FaPython,
    FaReact: FaReact,
};

const Certificates = () => {
    return (
        <section id="certificates" className="section-padding bg-white dark:bg-black transition-colors duration-500 overflow-hidden relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 dark:from-gray-900/20 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-black text-black dark:text-white mb-6 tracking-tighter">
                        Mes <span className="gradient-text">Certifications</span>
                    </h2>
                    <div className="w-24 h-2 bg-black dark:bg-white mb-6"></div>
                    <p className="text-gray-500 dark:text-gray-400 text-xl max-w-2xl font-medium">
                        Reconnaissance officielle de mon expertise technique et de mon engagement pour l'apprentissage continu.
                    </p>
                </motion.div>

                {/* Big Cards Layout */}
                <div className="flex flex-col gap-12 lg:gap-24">
                    {certifications.map((cert, index) => {
                        const IconComponent = iconMap[cert.icon] || FaAward;
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
                            >
                                {/* Image Container (The bigger part) */}
                                <div className="w-full lg:w-3/5 group relative">
                                    <div className="absolute inset-0 bg-black dark:bg-white translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6" />
                                    <div className="relative overflow-hidden border-2 border-black dark:border-white aspect-[16/10] bg-gray-100 dark:bg-gray-800">
                                        <motion.img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="w-full lg:w-2/5">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-4 bg-black dark:bg-white text-white dark:text-black">
                                            <IconComponent size={32} />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">
                                            {cert.platform}
                                        </span>
                                    </div>

                                    <h3 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-6 leading-none tracking-tighter transition-colors">
                                        {cert.title}
                                    </h3>

                                    <div className="flex items-center gap-2 text-gray-400 font-bold mb-8 italic">
                                        <FaCalendarAlt />
                                        <span>{cert.date}</span>
                                    </div>

                                    <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl leading-relaxed mb-10 font-medium">
                                        {cert.description}
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-black dark:text-white font-black uppercase tracking-widest group/link"
                                        >
                                            <span className="border-b-4 border-black dark:border-white pb-1 group-hover:pb-2 transition-all">
                                                Télécharger PDF
                                            </span>
                                            <FaExternalLinkAlt className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Certificates;
