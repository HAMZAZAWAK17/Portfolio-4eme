import { motion } from 'framer-motion';
import { FaGithub, FaCodeBranch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

const GitHubStats = () => {
    const { t } = useLanguage();

    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const username = "HAMZAZAWAK17";

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch User Profile
                const userRes = await fetch(`https://api.github.com/users/${username}`);
                if (!userRes.ok) throw new Error('Failed to fetch user profile');
                const userData = await userRes.json();
                setProfile(userData);

                // Fetch Repositories (needed for language stats and total stars)
                const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
                if (!reposRes.ok) throw new Error('Failed to fetch repositories');
                const reposData = await reposRes.json();
                setRepos(reposData);

            } catch (err) {
                console.error("GitHub API Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper to get language colors
    const getLanguageColor = (language) => {
        const colors = {
            JavaScript: "#F7DF1E",
            HTML: "#E34F26",
            CSS: "#1572B6",
            PHP: "#777BB4",
            Python: "#3776AB",
            Java: "#007396",
            TypeScript: "#3178C6",
            Vue: "#4FC08D",
            React: "#61DAFB",
            Dart: "#00B4AB",
            Shell: "#89E051",
            C: "#555555",
            "C++": "#F34B7D",
            "C#": "#178600",
        };
        return colors[language] || "#6c757d";
    };

    // Derived Statistics
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

    const stats = [
        { label: t.github.stats.repos, value: profile?.public_repos || 0, icon: FaGithub, color: "#61DAFB" },
        { label: t.github.stats.followers, value: profile?.followers || 0, icon: FaGithub, color: "#6DB33F" },
        { label: t.github.stats.following, value: profile?.following || 0, icon: FaGithub, color: "#F2C811" },
        { label: t.github.stats.stars, value: totalStars, icon: FaGithub, color: "#FF2D20" },
    ];

    // Calculate Top Languages
    const calculateTopLanguages = () => {
        if (!repos.length) return [];

        const langCounts = {};
        let total = 0;

        repos.forEach(repo => {
            if (repo.language) {
                langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
                total++;
            }
        });

        const languages = Object.entries(langCounts)
            .map(([name, count]) => ({
                name,
                percentage: Math.round((count / total) * 100),
                color: getLanguageColor(name)
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 5); // Top 5

        return languages;
    };

    const topLanguages = calculateTopLanguages();

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 bg-black text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-current"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 bg-black text-red-500">
                <p>Error loading GitHub stats: {error}</p>
            </div>
        );
    }

    return (
        <section id="github" className="section-padding bg-black border-t border-gray-800">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                        {t.github.titlePrefix} <span className="gradient-text">{t.github.titleHighlight}</span>
                    </h2>
                    <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
                        {t.github.subtitle}
                    </p>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                    >
                        <FaGithub className="text-2xl" />
                        <span className="font-semibold">@{username}</span>
                    </a>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 p-6 group overflow-hidden"
                        >
                            {/* Background Icon */}
                            <stat.icon
                                className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:opacity-10 transition-opacity"
                                style={{ color: stat.color }}
                            />

                            {/* Content */}
                            <div className="relative z-10">
                                <stat.icon
                                    className="text-4xl mb-3"
                                    style={{ color: stat.color }}
                                />
                                <div className="text-4xl font-black text-white mb-2">
                                    {index === 0 ? `${stat.value}+` : stat.value}
                                </div>
                                <div className="text-sm text-gray-400 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                                style={{ background: stat.color }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Top Languages - Enhanced Segmented Bar Graph */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16 bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 p-8 rounded-2xl"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <FaCodeBranch className="text-3xl text-green-400" />
                            {t.github.topLanguages}
                        </h3>
                        <div className="text-xs font-mono text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700">
                            Dynamic Analysis of {repos.length} Repositories
                        </div>
                    </div>

                    {/* Single Segmented Bar */}
                    <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden flex mb-10 shadow-inner">
                        {topLanguages.map((lang, index) => (
                            <motion.div
                                key={index}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${lang.percentage}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                style={{ backgroundColor: lang.color }}
                                className="h-full first:rounded-l-full last:rounded-r-full group relative"
                            >
                                {/* Mini Tooltip on Hover */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none border border-gray-700">
                                    {lang.name}: {lang.percentage}%
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Legend Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {topLanguages.map((lang, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span
                                        className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                                        style={{ backgroundColor: lang.color }}
                                    ></span>
                                    <span className="text-white font-bold tracking-tight">
                                        {lang.name}
                                    </span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-black text-white leading-none">
                                        {lang.percentage}%
                                    </span>
                                    <span className="text-[10px] text-gray-500 uppercase tracking-tighter mb-0.5">
                                        Usage
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GitHubStats;
