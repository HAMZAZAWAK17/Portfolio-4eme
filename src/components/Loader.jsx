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
        <div className="fixed inset-0 bg-white dark:bg-black z-[9999] flex items-center justify-center flex-col">
            {/* Logo Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8 relative"
            >
                <h1 className="text-7xl font-black text-black dark:text-white tracking-tighter">EH.</h1>

                {/* Decorative dot */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute -right-4 top-0 w-3 h-3 bg-black dark:bg-white rounded-full"
                />
            </motion.div>

            {/* Progress Container */}
            <div className="w-64 relative">
                {/* Progress Bar Background */}
                <div className="h-1 w-full bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-full">
                    {/* Progress Bar Fill */}
                    <motion.div
                        className="h-full bg-black dark:bg-white"
                        style={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                    />
                </div>

                {/* Percentage */}
                <div className="flex justify-between mt-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Loading</span>
                    <span className="text-xs font-mono font-bold text-black dark:text-white">{Math.round(progress)}%</span>
                </div>
            </div>
        </div>
    );
};

export default Loader;
