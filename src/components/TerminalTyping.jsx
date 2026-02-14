import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTerminal, FaCircle } from 'react-icons/fa';

const TerminalTyping = ({ text, speed = 50 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    // Typing effect
    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed]);

    // Blinking cursor
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl mx-auto"
        >
            {/* Terminal Window */}
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-700">
                {/* Terminal Header */}
                <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
                        </div>
                        <div className="ml-4 flex items-center gap-2 text-gray-400 text-sm">
                            <FaTerminal className="text-xs" />
                            <span className="font-mono">about_me.sh</span>
                        </div>
                    </div>
                    <div className="text-gray-500 text-xs font-mono hidden sm:block">
                        bash
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 font-mono text-sm sm:text-base">
                    {/* Command Prompt */}
                    <div className="flex items-start gap-2 mb-4">
                        <span className="text-green-400 select-none">➜</span>
                        <span className="text-blue-400 select-none">~</span>
                        <span className="text-gray-400">cat about_me.txt</span>
                    </div>

                    {/* Typing Output */}
                    <div className="text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                        {displayedText}
                        <span
                            className={`inline-block w-2 h-5 bg-green-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}
                            style={{ animation: 'blink 1s step-end infinite' }}
                        >
                        </span>
                    </div>

                    {/* Completion indicator */}
                    {currentIndex >= text.length && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 flex items-start gap-2"
                        >
                            <span className="text-green-400 select-none">➜</span>
                            <span className="text-blue-400 select-none">~</span>
                            <span className="text-gray-500 animate-pulse">_</span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Terminal Stats Bar (Optional) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-4 flex items-center justify-between text-xs font-mono text-gray-500 px-2"
            >
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <FaCircle className="text-green-400 text-[6px]" />
                        Active
                    </span>
                    <span>Lines: {text.split('\n').length}</span>
                </div>
                <span>UTF-8</span>
            </motion.div>
        </motion.div>
    );
};

export default TerminalTyping;
