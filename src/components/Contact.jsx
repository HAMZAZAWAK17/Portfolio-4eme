import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';
import { useLanguage } from '../LanguageContext';
import { personalInfo } from '../data/portfolioData';

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const SERVICE_ID = 'YOUR_SERVICE_ID';
        const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
        const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

        const isConfigured = 
            SERVICE_ID && SERVICE_ID !== 'YOUR_SERVICE_ID' &&
            TEMPLATE_ID && TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
            PUBLIC_KEY && PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

        if (!isConfigured) {
            const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Contact from Portfolio')}&body=${encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
            window.location.href = mailtoUrl;
            toast.success(t.contact.form.success);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setLoading(false);
            return;
        }

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject || 'Contact from Portfolio',
                    message: formData.message,
                    to_email: personalInfo.email,
                },
                PUBLIC_KEY
            );

            toast.success(t.contact.form.success);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Contact from Portfolio')}&body=${encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
            window.location.href = mailtoUrl;
            toast.success(t.contact.form.success);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            title: t.contact.contactInfo.email || "Email us",
            value: personalInfo.email,
            link: `mailto:${personalInfo.email}`,
        },
        {
            icon: FaPhone,
            title: t.contact.contactInfo.phone || "Call us",
            value: personalInfo.phone,
            link: `tel:${personalInfo.phone}`,
        },
        {
            icon: FaMapMarkerAlt,
            title: t.contact.contactInfo.location || "Our location",
            value: personalInfo.location,
            link: '#',
        },
    ];

    return (
        <section id="contact" className="relative py-32 bg-gray-50 dark:bg-black overflow-hidden transition-colors duration-500 min-h-screen flex items-center justify-center">
            
            {/* --- Glowing Orb Background --- */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 dark:bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none z-0" />

            {/* --- Massive Blurred Background Text --- */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0"
            >
                <h1 className="text-[18vw] font-black uppercase tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-black/5 to-transparent dark:from-white/10 dark:to-transparent blur-[8px] md:blur-[12px]">
                    CONTACT
                </h1>
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mt-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    
                    {/* --- Left Column: Info --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col mt-4"
                    >
                        {/* Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md w-fit mb-8 shadow-sm">
                            <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-white/20 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
                            </div>
                            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 tracking-wide pr-1">
                                Contact
                            </span>
                        </div>

                        {/* Title & Subtitle */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white tracking-tight leading-tight mb-4">
                            Get in touch
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mb-12 max-w-sm">
                            Have questions or ready to transform your business with AI automation?
                        </p>

                        {/* Contact Cards Stack */}
                        <div className="flex flex-col gap-3">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={index}
                                    href={info.link}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="group flex items-center p-4 rounded-2xl bg-white dark:bg-[#0f0f11] border border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-all cursor-pointer"
                                >
                                    {/* Icon Box */}
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-300 transition-colors">
                                        <info.icon size={18} />
                                    </div>
                                    
                                    {/* Text Info */}
                                    <div className="ml-5 flex-1">
                                        <p className="text-sm font-bold text-black dark:text-white mb-0.5 tracking-wide">
                                            {info.title}
                                        </p>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-500">
                                            {info.value}
                                        </p>
                                    </div>

                                    {/* Arrow Button */}
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors ml-4">
                                        <FaArrowRightLong size={12} className="-rotate-45" />
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* --- Right Column: Form --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <form 
                            onSubmit={handleSubmit} 
                            className="bg-white/80 dark:bg-[#0f0f11]/80 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-2xl flex flex-col gap-3"
                        >
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Name"
                                className="w-full bg-gray-50 dark:bg-[#161618] border border-transparent rounded-2xl px-5 py-4 focus:outline-none focus:border-gray-300 dark:focus:border-white/10 transition-colors text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm font-medium"
                            />
                            
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Email"
                                className="w-full bg-gray-50 dark:bg-[#161618] border border-transparent rounded-2xl px-5 py-4 focus:outline-none focus:border-gray-300 dark:focus:border-white/10 transition-colors text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm font-medium"
                            />
                            
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                placeholder="Message"
                                className="w-full bg-gray-50 dark:bg-[#161618] border border-transparent rounded-2xl px-5 py-4 focus:outline-none focus:border-gray-300 dark:focus:border-white/10 transition-colors text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm font-medium resize-none"
                            ></textarea>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={loading}
                                className="w-full mt-2 py-4 bg-black dark:bg-white text-white dark:text-black font-black text-sm rounded-2xl flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-70"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    "Submit"
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
