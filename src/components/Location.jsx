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
                                {t.location.title} <span className="text-outline text-transparent opacity-80">{t.location.titleHighlight}</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl font-medium">
                                {t.location.subtitle}
                            </p>
                        </div>

                        {/* Interactive SVG Map (Stylized) */}
                        <div className="relative aspect-square md:aspect-video w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden">
                            {/* Abstract Morocco Map SVG */}
                            <svg viewBox="0 0 500 400" className="w-[80%] h-[80%] opacity-20 dark:opacity-40 filter drop-shadow-2xl">
                                <path 
                                    d="M100,250 L120,230 L150,225 L180,240 L210,235 L240,245 L270,230 L300,210 L330,190 L360,170 L390,150 L410,140 L430,120 L450,110 L460,90 L470,70 L480,50 L450,40 L400,35 L350,45 L300,60 L250,80 L200,110 L150,150 L120,200 L100,250 Z" 
                                    fill="currentColor" 
                                    className="text-black dark:text-white"
                                />
                                {/* Add some dots for major cities */}
                                <circle cx="380" cy="150" r="3" fill="currentColor" /> {/* Tanger */}
                                <circle cx="320" cy="200" r="3" fill="currentColor" /> {/* Rabat */}
                                <circle cx="280" cy="260" r="3" fill="currentColor" /> {/* Marrakech */}
                                <circle cx="450" cy="100" r="3" fill="currentColor" /> {/* Oujda */}
                            </svg>

                            {/* Casablanca Pulse Point */}
                            <div className="absolute top-[52%] left-[64%] -translate-x-1/2 -translate-y-1/2">
                                <span className="relative flex h-16 w-16">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black dark:bg-white opacity-20"></span>
                                    <span className="relative inline-flex items-center justify-center rounded-full h-16 w-16 bg-black dark:bg-white">
                                        <FaMapMarkerAlt className="text-white dark:text-black text-2xl" />
                                    </span>
                                </span>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap bg-black dark:bg-white text-white dark:text-black px-4 py-2 font-black text-xs uppercase tracking-widest shadow-xl">
                                    Casablanca, Morocco
                                </div>
                            </div>

                            {/* Decorative Grid Lines */}
                            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.03] pointer-events-none">
                                {[...Array(36)].map((_, i) => (
                                    <div key={i} className="border-[0.5px] border-black dark:border-white"></div>
                                ))}
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
