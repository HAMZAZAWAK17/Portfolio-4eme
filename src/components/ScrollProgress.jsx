import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Progress Bar - Black & White */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-black dark:bg-white origin-left z-50"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Scroll Percentage Indicator */}
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="fixed bottom-8 left-8 bg-black dark:bg-white text-white dark:text-black p-4 w-16 h-16 flex items-center justify-center font-bold text-sm z-40"
                >
                    {Math.round(scrollYProgress.get() * 100)}%
                </motion.div>
            )}
        </>
    );
};

export default ScrollProgress;
