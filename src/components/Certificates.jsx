import React from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../data/portfolioData';
import { FaPhp, FaReact, FaAward, FaExternalLinkAlt } from 'react-icons/fa';
import { SiUdemy, SiSololearn } from 'react-icons/si';

const iconMap = {
    FaPhp: FaPhp,
    FaReact: FaReact,
};

// Map platform names to icons if specific icons aren't provided in data
const platformIcons = {
    Sololearn: SiSololearn,
    Udemy: SiUdemy,
};

const Certificates = () => {
    return (
        <section id="certificates" className="py-20 bg-gray-50 dark:bg-black transition-colors duration-300 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-300 dark:bg-gray-700 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-black dark:text-white">
                        Certifications
                    </h2>
                    <div className="w-24 h-1 bg-black dark:bg-white mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Validation de mes compétences à travers des formations reconnues.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert, index) => {
                        const IconComponent = iconMap[cert.icon] || FaAward;
                        const PlatformIcon = platformIcons[cert.platform] || FaAward;

                        return (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
                            >
                                {/* Gradient Border Effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                <div className="relative flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl z-10 p-4">
                                    {/* Header with Icons */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                                            <IconComponent className="text-3xl text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-black transition-colors" />
                                        </div>
                                        {/* Platform Badge */}
                                        <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-700">
                                            <PlatformIcon className="text-sm text-gray-500 dark:text-gray-400" />
                                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{cert.platform}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-black dark:group-hover:text-white transition-colors">
                                            {cert.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                            Obtenu sur {cert.platform}
                                        </p>
                                    </div>

                                    {/* Footer / Link */}
                                    <motion.a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-flex items-center justify-center w-full py-3 px-4 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:bg-black hover:text-white dark:hover:bg-gray-200 dark:hover:text-black transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                                    >
                                        <span>Voir le certificat</span>
                                        <FaExternalLinkAlt className="ml-2 text-xs opacity-70 group-hover/btn:translate-x-1 transition-transform" />
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
