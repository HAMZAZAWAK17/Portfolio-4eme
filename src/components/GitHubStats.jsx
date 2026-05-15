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
                    className="text-center mb-24"
                >
                    <h4 className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Open Source</h4>
                    <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                        {t.github.titlePrefix} <span className="text-zinc-800 italic">{t.github.titleHighlight}</span>
                    </h2>
                    <div className="w-24 h-[2px] bg-white mx-auto mb-10"></div>
                    <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mb-8">
                        {t.github.subtitle}
                    </p>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 px-8 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-full transition-all"
                    >
                        <FaGithub size={20} />
                        @{username}
                    </motion.a>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900 overflow-hidden rounded-[3rem] shadow-3xl mb-24"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="relative bg-black p-10 flex flex-col items-center group overflow-hidden"
                        >
                            <div className="relative z-10 text-center">
                                <div className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                                    {index === 0 ? `${stat.value}+` : stat.value}
                                </div>
                                <div className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-black">
                                    {stat.label}
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl pointer-events-none"
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
                    className="bg-zinc-900/50 border border-white/5 p-12 rounded-[3rem] backdrop-blur-3xl"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
                            <FaCodeBranch className="text-3xl" />
                            {t.github.topLanguages}
                        </h3>
                        <div className="text-[9px] font-black text-zinc-500 bg-white/5 px-6 py-3 rounded-full border border-white/5 uppercase tracking-[0.2em]">
                            Dynamic Analysis of {repos.length} Repositories
                        </div>
                    </div>

                    {/* Single Segmented Bar */}
                    <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden flex mb-12">
                        {topLanguages.map((lang, index) => (
                            <motion.div
                                key={index}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${lang.percentage}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                style={{ backgroundColor: lang.color }}
                                className="h-full first:rounded-l-full last:rounded-r-full group relative"
                            />
                        ))}
                    </div>

                    {/* Legend Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
                        {topLanguages.map((lang, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-3 h-3 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                                        style={{ backgroundColor: lang.color }}
                                    ></div>
                                    <span className="text-white font-black text-sm uppercase tracking-tighter">
                                        {lang.name}
                                    </span>
                                </div>
                                <div className="flex items-end gap-3">
                                    <span className="text-4xl font-black text-white leading-none tracking-tighter">
                                        {lang.percentage}%
                                    </span>
                                    <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-black mb-1">
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
