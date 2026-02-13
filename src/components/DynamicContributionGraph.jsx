import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const DynamicContributionGraph = ({ username, selectedYear }) => {
    // Generate mock contribution data for demonstration
    // In a real scenario, you'd fetch this from GitHub API
    const generateContributionData = () => {
        const weeks = 52;
        const daysPerWeek = 7;
        const data = [];

        for (let week = 0; week < weeks; week++) {
            const weekData = [];
            for (let day = 0; day < daysPerWeek; day++) {
                // Generate random contribution count (0-10)
                const count = Math.floor(Math.random() * 11);
                weekData.push({
                    date: new Date(selectedYear, 0, week * 7 + day + 1),
                    count: count,
                    level: count === 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 9 ? 3 : 4
                });
            }
            data.push(weekData);
        }
        return data;
    };

    const [contributionData, setContributionData] = useState([]);

    useEffect(() => {
        setContributionData(generateContributionData());
    }, [selectedYear]);

    // Color levels for contributions (GitHub-like)
    const getLevelColor = (level) => {
        const colors = {
            0: '#161b22', // No contributions (dark)
            1: '#0e4429', // Low
            2: '#006d32', // Medium-low
            3: '#26a641', // Medium-high
            4: '#39d353', // High
        };
        return colors[level] || colors[0];
    };

    const getLevelColorLight = (level) => {
        const colors = {
            0: '#ebedf0', // No contributions (light)
            1: '#9be9a8', // Low
            2: '#40c463', // Medium-low
            3: '#30a14e', // Medium-high
            4: '#216e39', // High
        };
        return colors[level] || colors[0];
    };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[800px] p-4">
                {/* Month labels */}
                <div className="flex mb-2 ml-8">
                    {months.map((month, index) => (
                        <div
                            key={month}
                            className="text-xs text-gray-400 dark:text-gray-600"
                            style={{ width: `${100 / 12}%` }}
                        >
                            {month}
                        </div>
                    ))}
                </div>

                {/* Contribution grid */}
                <div className="flex gap-1">
                    {/* Day labels */}
                    <div className="flex flex-col gap-1 mr-2">
                        {days.map((day, index) => (
                            <div
                                key={day}
                                className="text-xs text-gray-400 dark:text-gray-600 h-3 flex items-center"
                            >
                                {index % 2 === 1 ? day : ''}
                            </div>
                        ))}
                    </div>

                    {/* Contribution squares */}
                    <div className="flex gap-1">
                        {contributionData.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-1">
                                {week.map((day, dayIndex) => (
                                    <motion.div
                                        key={`${weekIndex}-${dayIndex}`}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            duration: 0.2,
                                            delay: (weekIndex * 7 + dayIndex) * 0.001
                                        }}
                                        whileHover={{
                                            scale: 1.5,
                                            zIndex: 10,
                                            transition: { duration: 0.1 }
                                        }}
                                        className="w-3 h-3 rounded-sm cursor-pointer transition-all relative group"
                                        style={{
                                            backgroundColor: document.documentElement.classList.contains('dark')
                                                ? getLevelColorLight(day.level)
                                                : getLevelColor(day.level)
                                        }}
                                        title={`${day.count} contributions on ${day.date.toLocaleDateString()}`}
                                    >
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                                            {day.count} contributions
                                            <br />
                                            {day.date.toLocaleDateString()}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-2 mt-4">
                    <span className="text-xs text-gray-400 dark:text-gray-600">Less</span>
                    {[0, 1, 2, 3, 4].map((level) => (
                        <div
                            key={level}
                            className="w-3 h-3 rounded-sm"
                            style={{
                                backgroundColor: document.documentElement.classList.contains('dark')
                                    ? getLevelColorLight(level)
                                    : getLevelColor(level)
                            }}
                        />
                    ))}
                    <span className="text-xs text-gray-400 dark:text-gray-600">More</span>
                </div>
            </div>
        </div>
    );
};

export default DynamicContributionGraph;
