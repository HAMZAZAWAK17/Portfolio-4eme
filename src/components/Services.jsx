import { motion } from 'framer-motion';
import { FaCode, FaMobileAlt, FaShoppingCart, FaLaptopCode, FaRocket, FaPalette } from 'react-icons/fa';
import { MdWeb } from 'react-icons/md';
import { useLanguage } from '../LanguageContext';

const Services = () => {
    const { t } = useLanguage();

    const services = [
        {
            icon: FaCode,
            titleKey: 'fullstack',
            descKey: 'fullstackDesc',
            color: '#61DAFB',
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            icon: MdWeb,
            titleKey: 'websites',
            descKey: 'websitesDesc',
            color: '#F2C811',
            gradient: 'from-yellow-500 to-orange-500',
        },
        {
            icon: FaMobileAlt,
            titleKey: 'mobile',
            descKey: 'mobileDesc',
            color: '#6DB33F',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: FaShoppingCart,
            titleKey: 'ecommerce',
            descKey: 'ecommerceDesc',
            color: '#FF2D20',
            gradient: 'from-red-500 to-pink-500',
        },
        {
            icon: FaLaptopCode,
            titleKey: 'landing',
            descKey: 'landingDesc',
            color: '#9333EA',
            gradient: 'from-purple-500 to-violet-500',
        },
        {
            icon: FaPalette,
            titleKey: 'design',
            descKey: 'designDesc',
            color: '#EC4899',
            gradient: 'from-pink-500 to-rose-500',
        },
    ];

    return (
        <section id="services" className="section-padding bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-4">
                        {t.services.title} <span className="gradient-text">{t.services.titleHighlight}</span>
                    </h2>
                    <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        {t.services.subtitle}
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="relative group"
                        >
                            {/* Card */}
                            <div className="relative bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 p-8 h-full overflow-hidden transition-all duration-300 group-hover:border-gray-400 dark:group-hover:border-gray-600">
                                {/* Background Gradient on Hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                                ></div>

                                {/* Icon Background */}
                                <div className="absolute -right-8 -top-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                                    <service.icon className="text-9xl" style={{ color: service.color }} />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className="mb-6">
                                        <div
                                            className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${service.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center">
                                                <service.icon
                                                    className="text-3xl"
                                                    style={{ color: service.color }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-black dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-700 group-hover:to-gray-900 dark:group-hover:from-gray-300 dark:group-hover:to-gray-100 transition-all duration-300">
                                        {t.services[service.titleKey]}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {t.services[service.descKey]}
                                    </p>

                                    {/* Decorative Line */}
                                    <div className="mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent transition-all duration-500"></div>
                                </div>

                                {/* Glow Effect */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-2xl pointer-events-none"
                                    style={{ background: service.color }}
                                ></div>
                            </div>

                            {/* Floating Animation */}
                            <motion.div
                                className="absolute -z-10 inset-0 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                                style={{ background: service.color }}
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            ></motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-4 font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 group"
                    >
                        <FaRocket className="text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        {t.services.cta}
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
