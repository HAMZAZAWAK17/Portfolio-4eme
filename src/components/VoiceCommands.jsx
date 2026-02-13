import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

const VoiceCommands = () => {
    const { t } = useLanguage();
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const recognitionRef = useRef(null);

    useEffect(() => {
        // Check if browser supports Web Speech API
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            setIsSupported(true);
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();

            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                setTranscript(command);
                handleVoiceCommand(command);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                showFeedbackMessage('❌ Error: Could not understand. Try again!');
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const showFeedbackMessage = (message) => {
        setFeedback(message);
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 3000);
    };

    const handleVoiceCommand = (command) => {
        console.log('Voice command received:', command);

        // Navigation commands
        if (command.includes('home') || command.includes('top')) {
            scrollToSection('home');
            showFeedbackMessage('🏠 Going to Home');
        } else if (command.includes('about')) {
            scrollToSection('about');
            showFeedbackMessage('👤 Going to About');
        } else if (command.includes('skill')) {
            scrollToSection('skills');
            showFeedbackMessage('💻 Going to Skills');
        } else if (command.includes('project')) {
            scrollToSection('projects');
            showFeedbackMessage('🚀 Going to Projects');
        } else if (command.includes('service')) {
            scrollToSection('services');
            showFeedbackMessage('⚡ Going to Services');
        } else if (command.includes('certificate')) {
            scrollToSection('certificates');
            showFeedbackMessage('🏆 Going to Certificates');
        } else if (command.includes('github')) {
            scrollToSection('github');
            showFeedbackMessage('🐙 Going to GitHub Stats');
        } else if (command.includes('contact')) {
            scrollToSection('contact');
            showFeedbackMessage('📧 Going to Contact');
        }
        // Easter Eggs 🎉
        else if (command.includes('hello') || command.includes('hi')) {
            showFeedbackMessage('👋 Hello! I\'m Hamza\'s portfolio. Try saying "Go to projects"!');
        } else if (command.includes('who are you')) {
            showFeedbackMessage('🤖 I\'m a voice-controlled portfolio! Say commands like "show skills"');
        } else if (command.includes('tell me a joke')) {
            const jokes = [
                '😄 Why do programmers prefer dark mode? Because light attracts bugs!',
                '😂 Why did the developer go broke? Because he used up all his cache!',
                '🤣 How many programmers does it take to change a light bulb? None, that\'s a hardware problem!',
                '😆 A SQL query walks into a bar, walks up to two tables and asks... "Can I join you?"'
            ];
            showFeedbackMessage(jokes[Math.floor(Math.random() * jokes.length)]);
        } else if (command.includes('secret') || command.includes('easter egg')) {
            showFeedbackMessage('🥚 You found a secret! Try saying "tell me a joke" or "matrix mode"');
        } else if (command.includes('matrix')) {
            showFeedbackMessage('🟢 Matrix mode activated! (Just kidding... or am I? 😎)');
            // You could trigger a matrix rain effect here
        } else if (command.includes('dark mode')) {
            showFeedbackMessage('🌙 Try clicking the moon/sun icon in the navbar!');
        } else if (command.includes('hire') || command.includes('recruit')) {
            scrollToSection('contact');
            showFeedbackMessage('💼 Great choice! Let\'s get in touch!');
        } else if (command.includes('impressive') || command.includes('amazing') || command.includes('cool')) {
            showFeedbackMessage('😊 Thank you! Hamza worked hard on this!');
        } else if (command.includes('help')) {
            showFeedbackMessage('💡 Try: "go to projects", "show skills", "contact", or "tell me a joke"');
        } else {
            showFeedbackMessage('🤔 Command not recognized. Try "help" for available commands.');
        }
    };

    const toggleListening = () => {
        if (!isSupported) {
            showFeedbackMessage('❌ Voice commands not supported in this browser');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            try {
                recognitionRef.current.start();
                setIsListening(true);
                setTranscript('');
                showFeedbackMessage('🎤 Listening... Speak now!');
            } catch (error) {
                console.error('Error starting recognition:', error);
                showFeedbackMessage('❌ Could not start listening');
            }
        }
    };

    if (!isSupported) {
        return null; // Don't show the button if not supported
    }

    return (
        <>
            {/* Voice Command Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
                onClick={toggleListening}
                className={`fixed bottom-24 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${isListening
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    } text-white`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Voice Commands (Click to activate)"
            >
                {isListening ? (
                    <FaMicrophone className="text-2xl" />
                ) : (
                    <FaMicrophoneSlash className="text-2xl" />
                )}

                {/* Listening Animation */}
                {isListening && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-4 border-white"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                )}
            </motion.button>

            {/* Feedback Toast */}
            <AnimatePresence>
                {showFeedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.8 }}
                        className="fixed bottom-40 right-6 z-50 max-w-sm"
                    >
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-lg shadow-2xl border-2 border-white/20">
                            <div className="flex items-center gap-3">
                                <FaVolumeUp className="text-2xl flex-shrink-0" />
                                <p className="font-semibold text-sm">{feedback}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Transcript Display (for debugging) */}
            {transcript && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed bottom-6 left-6 z-40 bg-black/80 text-white px-4 py-2 rounded-lg text-xs"
                >
                    You said: "{transcript}"
                </motion.div>
            )}

            {/* Help Tooltip */}
            {!isListening && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 }}
                    className="fixed bottom-24 right-24 z-40 bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-lg text-xs font-semibold shadow-lg hidden md:block"
                >
                    🎤 Try voice commands!
                    <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-black dark:border-l-white"></div>
                </motion.div>
            )}
        </>
    );
};

export default VoiceCommands;
