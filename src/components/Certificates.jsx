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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h4 className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Verification</h4>
                    <h2 className="text-5xl md:text-8xl font-black text-black dark:text-white mb-8 tracking-tighter leading-none">
                        Mes <span className="text-zinc-300 dark:text-zinc-800 italic">Certifications</span>
                    </h2>
                    <div className="w-24 h-[2px] bg-black dark:bg-white mx-auto mb-10"></div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
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
                                    <div className="relative overflow-hidden border border-zinc-100 dark:border-white/5 aspect-[16/10] bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] shadow-2xl transition-all duration-700 group-hover:scale-[1.02]">
                                        <motion.img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                                        
                                        {/* Floating platform label */}
                                        <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 text-[10px] text-white font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all">
                                            {cert.platform}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="w-full lg:w-2/5 flex flex-col items-start">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-5 bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white rounded-2xl">
                                            <IconComponent size={28} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                                                {cert.platform}
                                            </span>
                                            <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">
                                                <FaCalendarAlt size={10} />
                                                <span>{cert.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-3xl md:text-5xl font-black text-black dark:text-white mb-6 leading-[0.9] tracking-tighter uppercase">
                                        {cert.title}
                                    </h3>

                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-10 font-medium italic">
                                        "{cert.description}"
                                    </p>

                                    <motion.a
                                        whileHover={{ x: 10 }}
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 text-black dark:text-white font-black uppercase tracking-[0.3em] text-[10px] group/link"
                                    >
                                        <span className="border-b-[3px] border-black dark:border-white pb-2">
                                            Télécharger PDF
                                        </span>
                                        <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-full group-hover/link:bg-black group-hover/link:text-white dark:group-hover/link:bg-white dark:group-hover/link:text-black transition-all">
                                            <FaExternalLinkAlt size={12} />
                                        </div>
                                    </motion.a>
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
