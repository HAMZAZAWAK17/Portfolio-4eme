import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaMapMarkerAlt, FaGlobe, FaLaptopHouse, FaCheckCircle } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

const Location = () => {
    const { t } = useLanguage();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Format time for Casablanca (UTC+1 usually, but let's just use local time for the demo as it's for the same timezone in Morocco)
    // Actually, to be precise, we can use Intl.DateTimeFormat
    const formatTime = (date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Africa/Casablanca'
        }).format(date);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }
        }
    };

    return (
        <section id="location" className="py-24 bg-white dark:bg-black transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Left Side: Map & Location */}
                    <motion.div variants={itemVariants} className="relative">
                        <div className="mb-12">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white mb-6 tracking-tighter uppercase italic">
                                {t.location.title} <span className="text-outline opacity-80">{t.location.titleHighlight}</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl font-medium">
                                {t.location.subtitle}
                            </p>
                        </div>

                        {/* Interactive Google Map Styled for B&W Theme */}
                        <div className="relative aspect-square md:aspect-video w-full bg-gray-50 dark:bg-zinc-900 border-2 border-black dark:border-white shadow-[10px_10px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_rgba(255,255,255,0.1)] overflow-hidden group">
                            <iframe
                                title="Casablanca Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106361.35515233!2d-7.66939462557438!3d33.57226315801966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778a113b1%3A0x10cb9d6a570618b0!2sCasablanca!5e0!3m2!1sfr!2sma!4v1710345678901!5m2!1sfr!2sma"
                                className="w-full h-full grayscale contrast-125 opacity-70 dark:opacity-60 dark:invert transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0 group-hover:dark:invert-0"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            
                            {/* Decorative Overlay for focused feel */}
                            <div className="absolute inset-0 pointer-events-none border-[20px] border-black/5 dark:border-white/5"></div>
                            
                            {/* Marker Label Overlay */}
                            <div className="absolute bottom-6 right-6 bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-black text-sm uppercase tracking-[0.2em] shadow-2xl transition-transform duration-500 group-hover:scale-110">
                                Casablanca, Morocco
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Clock & Availability */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        {/* Digital Clock Card */}
                        <div className="bg-black dark:bg-zinc-900 border border-black/5 dark:border-zinc-800 p-8 md:p-12 relative overflow-hidden group">
                           {/* Decorative Numbers Background */}
                           <div className="absolute top-0 right-0 text-[10rem] font-black text-white/5 dark:text-white/5 select-none leading-none -mr-10 -mt-10">
                                {time.getHours()}
                           </div>
                           
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 text-white/60 dark:text-gray-500 mb-6 uppercase tracking-[0.3em] text-xs font-black">
                                    <FaClock className="text-white dark:text-white" />
                                    {t.location.localTime}
                                </div>
                                <div className="text-6xl md:text-8xl font-black text-white dark:text-white tracking-tighter mb-4 tabular-nums">
                                    {formatTime(time)}
                                </div>
                                <p className="text-white/40 dark:text-gray-500 font-medium">
                                    Greenwich Mean Time (GMT+1)
                                </p>
                            </div>
                        </div>

                        {/* Availability Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Card 1: Status */}
                            <div className="p-8 border border-gray-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-colors duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                        {t.location.status}
                                    </span>
                                </div>
                                <p className="text-lg font-bold text-black dark:text-white">
                                    {t.location.available}
                                </p>
                            </div>

                            {/* Card 2: Work Model */}
                            <div className="p-8 border border-gray-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-colors duration-300">
                                <FaLaptopHouse className="text-2xl mb-4 text-black dark:text-white" />
                                <p className="text-lg font-bold text-black dark:text-white">
                                    {t.location.remote}
                                </p>
                            </div>

                            {/* Card 3: Mobility */}
                            <div className="p-8 border border-gray-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-colors duration-300">
                                <FaGlobe className="text-2xl mb-4 text-black dark:text-white" />
                                <p className="text-lg font-bold text-black dark:text-white">
                                    {t.location.mobility}
                                </p>
                            </div>

                            {/* Card 4: Open For */}
                            <div className="p-8 border border-gray-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-colors duration-300">
                                <FaCheckCircle className="text-2xl mb-4 text-black dark:text-white" />
                                <p className="text-lg font-bold text-black dark:text-white">
                                    {t.location.openFor}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Location;
