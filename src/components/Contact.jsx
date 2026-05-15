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
                    className="text-center mb-24"
                >
                    <h4 className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Get in touch</h4>
                    <h2 className="text-5xl md:text-8xl font-black text-black dark:text-white mb-8 tracking-tighter leading-none">
                        Me <span className="text-zinc-300 dark:text-zinc-800 italic">Contacter</span>
                    </h2>
                    <div className="w-24 h-[2px] bg-black dark:bg-white mx-auto mb-10"></div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
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
                            <h3 className="text-2xl font-black text-black dark:text-white mb-10 uppercase tracking-tighter">
                                Contact Channels
                            </h3>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <motion.a
                                        key={index}
                                        whileHover={{ x: 10 }}
                                        href={info.link}
                                        className="flex items-center gap-6 p-6 bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-white/5 hover:border-black dark:hover:border-white transition-all rounded-3xl group shadow-sm hover:shadow-2xl"
                                    >
                                        <div className="p-5 bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white rounded-2xl group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                                            <info.icon size={28} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-black mb-1">{info.title}</p>
                                            <p className="text-lg font-black text-black dark:text-white tracking-tight">{info.value}</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-10">
                            <h3 className="text-xl font-black text-black dark:text-white mb-6 uppercase tracking-tighter">
                                Connect with me
                            </h3>
                            <div className="flex gap-4">
                                {[
                                    { icon: FaGithub, link: socialLinks.github },
                                    { icon: FaLinkedin, link: socialLinks.linkedin },
                                    { icon: FaEnvelope, link: `mailto:${personalInfo.email}` },
                                ].map((social, index) => (
                                    <motion.a
                                        key={index}
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all rounded-2xl shadow-sm hover:shadow-xl"
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
                        <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-zinc-900/50 p-8 md:p-12 rounded-[3rem] border border-zinc-100 dark:border-white/5 shadow-2xl">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] ml-2">
                                        Nom complet
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-transparent focus:border-black dark:focus:border-white text-black dark:text-white transition-all outline-none rounded-2xl"
                                        placeholder="Votre nom"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] ml-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-transparent focus:border-black dark:focus:border-white text-black dark:text-white transition-all outline-none rounded-2xl"
                                        placeholder="votre@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] ml-2">
                                    Sujet
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-transparent focus:border-black dark:focus:border-white text-black dark:text-white transition-all outline-none rounded-2xl"
                                    placeholder="Sujet du message"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] ml-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-transparent focus:border-black dark:focus:border-white text-black dark:text-white transition-all outline-none rounded-2xl resize-none"
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
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl"
                            >
                                {loading ? (
                                    <>
                                        <div className="loader w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
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
