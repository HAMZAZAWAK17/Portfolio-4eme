import { motion } from 'framer-motion';
import { FaHeart, FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/portfolioData';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black dark:bg-white text-white dark:text-black relative border-t-2 border-white dark:border-black">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative z-10">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-3xl font-black mb-4">EH.</h3>
                        <p className="text-gray-400 dark:text-gray-600 mb-4">
                            Développeur Full-Stack passionné par la création de solutions web modernes et performantes.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: FaGithub, link: socialLinks.github },
                                { icon: FaLinkedin, link: socialLinks.linkedin },
                                { icon: FaEnvelope, link: `mailto:${personalInfo.email}` },
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    whileHover={{ y: -3 }}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-white dark:bg-black text-black dark:text-white border-2 border-white dark:border-black hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:hover:text-black transition-colors"
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 uppercase tracking-wider">Liens rapides</h4>
                        <ul className="space-y-2">
                            {['Accueil', 'À propos', 'Compétences', 'Projets', 'Contact'].map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={`#${link.toLowerCase().replace('à propos', 'about').replace('compétences', 'skills').replace('projets', 'projects').replace('accueil', 'home')}`}
                                        className="text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-black transition-colors underline-effect"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-2 text-gray-400 dark:text-gray-600">
                            <li className="hover:text-white dark:hover:text-black transition-colors">{personalInfo.email}</li>
                            <li className="hover:text-white dark:hover:text-black transition-colors">{personalInfo.phone}</li>
                            <li className="hover:text-white dark:hover:text-black transition-colors">{personalInfo.location}</li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t-2 border-gray-800 dark:border-gray-200 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 dark:text-gray-600 text-sm">
                            © {currentYear} {personalInfo.name}. Tous droits réservés.
                        </p>
                        <p className="text-gray-400 dark:text-gray-600 text-sm flex items-center gap-2">
                            Fait avec <FaHeart className="text-white dark:text-black" /> et ReactJS
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="absolute bottom-8 right-8 p-4 bg-white dark:bg-black text-black dark:text-white border-2 border-white dark:border-black hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:hover:text-black transition-colors"
            >
                <FaArrowUp size={20} />
            </motion.button>
        </footer>
    );
};

export default Footer;
