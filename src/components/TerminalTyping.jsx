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
            className="w-full max-w-5xl mx-auto"
        >
            {/* Terminal Window */}
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-800 flex flex-col min-h-[450px] sm:min-h-[500px]">
                {/* Terminal Header */}
                <div className="bg-gray-800/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] shadow-inner"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] shadow-inner"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] shadow-inner"></div>
                        </div>
                        <div className="ml-6 flex items-center gap-3 text-gray-300 font-medium">
                            <FaTerminal className="text-sm opacity-70" />
                            <span className="font-mono text-sm tracking-tight">bash — about_me.sh — 120x40</span>
                        </div>
                    </div>
                    <div className="text-gray-500 text-xs font-mono hidden md:block">
                        {currentIndex < text.length ? 'Typing...' : 'Completed'}
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-8 md:p-12 font-mono text-lg md:text-2xl flex-grow overflow-y-auto custom-scrollbar">
                    {/* Command Prompt */}
                    <div className="flex items-start gap-4 mb-6">
                        <span className="text-green-400 select-none font-bold">➜</span>
                        <span className="text-blue-400 select-none font-bold">~</span>
                        <span className="text-gray-200">cat about_me.txt</span>
                    </div>

                    {/* Typing Output */}
                    <div className="text-gray-100 leading-relaxed whitespace-pre-wrap break-words min-h-[1.5em]">
                        {displayedText}
                        <span
                            className={`inline-block w-2.5 h-6 md:h-8 bg-green-400 ml-2 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                            style={{ boxShadow: '0 0 10px rgba(74, 222, 128, 0.5)' }}
                        >
                        </span>
                    </div>

                    {/* Completion indicator */}
                    {currentIndex >= text.length && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-10 flex items-start gap-4"
                        >
                            <span className="text-green-400 select-none font-bold">➜</span>
                            <span className="text-blue-400 select-none font-bold">~</span>
                            <span className="text-gray-500 animate-pulse font-bold">_</span>
                        </motion.div>
                    )}
                </div>

                {/* Status Bar */}
                <div className="bg-gray-800/30 px-6 py-2 border-t border-gray-700 flex items-center justify-between text-xs font-mono text-gray-500 uppercase tracking-widest">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${currentIndex < text.length ? 'bg-yellow-400' : 'bg-green-400'} animate-pulse`} />
                            {currentIndex < text.length ? 'Status: Busy' : 'Status: Ready'}
                        </span>
                        <span className="hidden sm:inline">Ln: {text.split('\n').length}</span>
                        <span className="hidden sm:inline">Col: {displayedText.split('\n').pop()?.length || 0}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>UTF-8</span>
                        <span className="text-blue-400">Master</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </motion.div>
    );
};

export default TerminalTyping;
