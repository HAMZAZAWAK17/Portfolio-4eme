import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = () => {
    const [progress, setProgress] = useState(0);

    // Simulate progress
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.random() * 10;
                if (next > 100) {
                    clearInterval(interval);
                    return 100;
                }
                return next;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center flex-col overflow-hidden">
            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

            {/* Logo Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12 relative z-20"
            >
                <h1 className="text-8xl md:text-[10rem] font-black text-white tracking-tighter leading-none select-none">
                    EH<span className="opacity-10">.</span>
                </h1>
                
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-[2px] bg-white absolute -bottom-4 left-0"
                />
            </motion.div>

            {/* Progress Container */}
            <div className="w-64 md:w-80 relative z-20">
                <div className="flex justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">System Initialization</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">{Math.round(progress)}%</span>
                </div>
                
                {/* Progress Bar Background */}
                <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
                    {/* Progress Bar Fill */}
                    <motion.div
                        className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    />
                </div>
            </div>

            {/* Decorative elements */}
            <motion.div 
                animate={{ 
                    rotate: 360,
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none"
            />
        </div>
    );
};

export default Loader;
