import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaBook, FaCodeBranch } from 'react-icons/fa';
import { BiGitRepoForked } from 'react-icons/bi';
import { HiCalendar } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

const GitHubStats = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const availableYears = [2025, 2026];

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

                // Fetch Repositories
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
        { label: t.github.stats.repos, value: profile?.public_repos || 0, icon: FaBook, color: "#61DAFB" },
        { label: t.github.stats.followers, value: profile?.followers || 0, icon: FaGithub, color: "#6DB33F" },
        { label: t.github.stats.following, value: profile?.following || 0, icon: FaGithub, color: "#F2C811" },
        { label: t.github.stats.stars, value: totalStars, icon: FaStar, color: "#FF2D20" },
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

    // Get Popular Repositories (sorted by stars)
    const popularRepos = [...repos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
        .map(repo => ({
            name: repo.name,
            description: repo.description,
            language: repo.language || "Unknown",
            languageColor: getLanguageColor(repo.language),
            stars: repo.stargazers_count,
            url: repo.html_url
        }));

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 bg-black dark:bg-white text-white dark:text-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-current"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 bg-black dark:bg-white text-red-500">
                <p>Error loading GitHub stats: {error}</p>
            </div>
        );
    }

    return (
        <section id="github" className="section-padding bg-black dark:bg-white border-t border-gray-800 dark:border-gray-200">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white dark:text-black mb-4">
                        {t.github.titlePrefix} <span className="gradient-text">{t.github.titleHighlight}</span>
                    </h2>
                    <div className="w-24 h-1 bg-white dark:bg-black mx-auto mb-6"></div>
                    <p className="text-gray-400 dark:text-gray-600 text-lg max-w-2xl mx-auto mb-4">
                        {t.github.subtitle}
                    </p>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white dark:text-black hover:text-gray-300 dark:hover:text-gray-700 transition-colors"
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
                            className="relative bg-gradient-to-br from-gray-900 to-black dark:from-gray-50 dark:to-white border-2 border-gray-800 dark:border-gray-200 p-6 group overflow-hidden"
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
                                <div className="text-4xl font-black text-white dark:text-black mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-400 dark:text-gray-600 uppercase tracking-wider">
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

                {/* Contribution Graph - Real GitHub Data */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-16 bg-gradient-to-br from-gray-900 to-black dark:from-gray-50 dark:to-white border-2 border-gray-800 dark:border-gray-200 p-8"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h3 className="text-2xl font-bold text-white dark:text-black flex items-center gap-3 mb-4 md:mb-0">
                            <HiCalendar className="text-3xl" />
                            {t.github.chartTitle} {selectedYear}
                        </h3>

                        {/* Year Selector */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400 dark:text-gray-600">{t.github.year}:</span>
                            <div className="flex gap-2 flex-wrap">
                                {availableYears.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => setSelectedYear(year)}
                                        className={`px-4 py-2 text-sm font-semibold transition-all duration-300 ${selectedYear === year
                                            ? 'bg-white dark:bg-black text-black dark:text-white'
                                            : 'bg-gray-800 dark:bg-gray-200 text-gray-400 dark:text-gray-600 hover:bg-gray-700 dark:hover:bg-gray-300'
                                            }`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* GitHub Contribution Graph Image - Dynamic */}
                    <div className="w-full overflow-x-auto bg-white dark:bg-gray-100 p-4 rounded-lg">
                        <img
                            key={selectedYear}
                            src={`https://ghchart.rshah.org/${username}`}
                            alt={`Contributions GitHub ${selectedYear}`}
                            className="w-full h-auto"
                            style={{ minWidth: '800px' }}
                        />
                    </div>

                    {/* Link to GitHub - Dynamic */}
                    <div className="mt-6 text-center">
                        <a
                            href={`https://github.com/${username}?tab=overview&from=${selectedYear}-01-01&to=${selectedYear}-12-31`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-black transition-colors inline-flex items-center gap-2"
                        >
                            <FaGithub />
                            {t.github.viewDetails} →
                        </a>
                    </div>
                </motion.div>

                {/* Top Languages */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16 bg-gradient-to-br from-gray-900 to-black dark:from-gray-50 dark:to-white border-2 border-gray-800 dark:border-gray-200 p-8"
                >
                    <h3 className="text-2xl font-bold text-white dark:text-black mb-6 flex items-center gap-3">
                        <FaCodeBranch className="text-3xl" />
                        {t.github.topLanguages}
                    </h3>

                    <div className="space-y-4">
                        {topLanguages.map((lang, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-2">
                                    <span className="text-white dark:text-black font-semibold flex items-center gap-2">
                                        <span
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: lang.color }}
                                        ></span>
                                        {lang.name}
                                    </span>
                                    <span className="text-gray-400 dark:text-gray-600">
                                        {lang.percentage}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-800 dark:bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${lang.percentage}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: lang.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Popular Repositories */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h3 className="text-3xl font-bold text-white dark:text-black mb-8 flex items-center gap-3">
                        <BiGitRepoForked className="text-4xl" />
                        {t.github.popularRepos}
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {popularRepos.map((repo, index) => (
                            <motion.a
                                key={index}
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-gradient-to-br from-gray-900 to-black dark:from-gray-50 dark:to-white border-2 border-gray-800 dark:border-gray-200 p-6 hover:border-white dark:hover:border-black transition-all duration-300 group"
                            >
                                {/* Repo Name */}
                                <div className="flex items-start justify-between mb-3">
                                    <h4 className="text-xl font-bold text-white dark:text-black group-hover:text-gray-300 dark:group-hover:text-gray-700 transition-colors flex items-center gap-2">
                                        <FaBook className="text-lg" />
                                        {repo.name}
                                    </h4>
                                    {repo.stars > 0 && (
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <FaStar className="text-sm" />
                                            <span className="text-sm font-semibold">{repo.stars}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-gray-400 dark:text-gray-600 text-sm mb-4 line-clamp-2">
                                    {repo.description || "No description provided."}
                                </p>

                                {/* Language */}
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: repo.languageColor }}
                                    ></span>
                                    <span className="text-sm text-gray-400 dark:text-gray-600">
                                        {repo.language}
                                    </span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <a
                        href={`https://github.com/${username}?tab=repositories`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-white dark:bg-black text-black dark:text-white px-8 py-4 font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-900 transition-all duration-300 group"
                    >
                        <FaGithub className="text-2xl group-hover:rotate-12 transition-transform" />
                        {t.github.viewAll}
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default GitHubStats;
