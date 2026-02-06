import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaGithub, FaLinkedin } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import { personalInfo, socialLinks } from '../data/portfolioData';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            // Configuration EmailJS (à remplacer par vos propres clés)
            // Pour configurer: https://www.emailjs.com/
            await emailjs.send(
                'YOUR_SERVICE_ID', // Remplacer par votre Service ID
                'YOUR_TEMPLATE_ID', // Remplacer par votre Template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_email: personalInfo.email,
                },
                'YOUR_PUBLIC_KEY' // Remplacer par votre Public Key
            );

            setStatus({
                type: 'success',
                message: 'Message envoyé avec succès ! Je vous répondrai bientôt.',
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.',
            });
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            title: 'Email',
            value: personalInfo.email,
            link: `mailto:${personalInfo.email}`,
        },
        {
            icon: FaPhone,
            title: 'Téléphone',
            value: personalInfo.phone,
            link: `tel:${personalInfo.phone}`,
        },
        {
            icon: FaMapMarkerAlt,
            title: 'Localisation',
            value: personalInfo.location,
            link: '#',
        },
    ];

    return (
        <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                        Me <span className="text-black dark:text-white">Contacter</span>
                    </h2>
                    <div className="w-24 h-1 bg-black dark:bg-white mx-auto"></div>
                    <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                        N'hésitez pas à me contacter pour toute opportunité ou collaboration
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                                Informations de contact
                            </h3>
                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <motion.a
                                        key={index}
                                        whileHover={{ x: 10 }}
                                        href={info.link}
                                        className="flex items-center gap-4 p-4 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors group"
                                    >
                                        <div className="p-4 bg-black dark:bg-white text-white dark:text-black">
                                            <info.icon size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">{info.title}</p>
                                            <p className="font-semibold text-black dark:text-white">{info.value}</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-xl font-bold text-black dark:text-white mb-4">
                                Réseaux sociaux
                            </h3>
                            <div className="flex gap-4">
                                {[
                                    { icon: FaGithub, link: socialLinks.github },
                                    { icon: FaLinkedin, link: socialLinks.linkedin },
                                    { icon: FaEnvelope, link: `mailto:${personalInfo.email}` },
                                ].map((social, index) => (
                                    <motion.a
                                        key={index}
                                        whileHover={{ y: -5 }}
                                        whileTap={{ scale: 0.9 }}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-black dark:hover:border-white transition-all"
                                    >
                                        <social.icon size={24} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-black dark:text-white mb-2 uppercase tracking-wider">
                                    Nom complet
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-black dark:focus:border-white transition-colors outline-none"
                                    placeholder="Votre nom"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-black dark:text-white mb-2 uppercase tracking-wider">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-black dark:focus:border-white transition-colors outline-none"
                                    placeholder="votre@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-black dark:text-white mb-2 uppercase tracking-wider">
                                    Sujet
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-black dark:focus:border-white transition-colors outline-none"
                                    placeholder="Sujet du message"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-black dark:text-white mb-2 uppercase tracking-wider">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-black dark:focus:border-white transition-colors outline-none resize-none"
                                    placeholder="Votre message..."
                                ></textarea>
                            </div>

                            {/* Status Message */}
                            {status.message && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-4 ${status.type === 'success'
                                            ? 'bg-black text-white dark:bg-white dark:text-black'
                                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-2 border-red-500'
                                        }`}
                                >
                                    {status.message}
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="loader w-5 h-5 border-2 border-white dark:border-black border-t-transparent"></div>
                                        Envoi en cours...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane />
                                        Envoyer le message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
