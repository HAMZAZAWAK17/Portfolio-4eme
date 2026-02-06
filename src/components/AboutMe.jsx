import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const AboutMe = () => {
    const { t } = useLanguage();
    const containerRef = useRef(null);

    // Split bio into words for independent animation
    const words = t.about.bio.split(' ');

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section
            id="about-me"
            ref={containerRef}
            className="relative min-h-[60vh] flex items-center justify-center bg-white dark:bg-black py-24 px-6 md:px-12 overflow-hidden"
        >
            <div className="max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4 font-bold">
                        {t.about.bioTitle}
                    </h2>
                    <div className="w-12 h-[2px] bg-black dark:bg-white mx-auto"></div>
                </motion.div>

                <div className="relative">
                    <p className="text-[clamp(1.5rem,4vw,3rem)] font-bold leading-[1.3] tracking-tight text-black dark:text-white flex flex-wrap justify-center gap-x-[0.3em] gap-y-[0.1em]">
                        {words.map((word, i) => {
                            const start = i / words.length;
                            const end = start + 1 / words.length;

                            // Each word reveals independently based on scroll
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const opacity = useTransform(scrollYProgress, [start * 0.5 + 0.1, end * 0.5 + 0.2], [0.1, 1]);

                            return (
                                <motion.span
                                    key={i}
                                    style={{ opacity }}
                                    className="inline-block"
                                >
                                    {word}
                                </motion.span>
                            );
                        })}
                    </p>
                </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.07] overflow-hidden whitespace-nowrap select-none font-black text-[20vw] uppercase">
                {t.about.bioTitle} {t.about.bioTitle}
            </div>
        </section>
    );
};

export default AboutMe;
