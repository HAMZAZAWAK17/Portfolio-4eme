import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const DynamicContributionGraph = ({ username, selectedYear }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Reset loading state when year changes
    useEffect(() => {
        setImageLoaded(false);
        setImageError(false);
    }, [selectedYear]);

    // GitHub contribution graph URL - this shows real data
    const contributionUrl = `https://ghchart.rshah.org/${username}`;

    return (
        <motion.div
            className="w-full overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="min-w-[800px] p-4 bg-white rounded-lg">
                {/* Loading State */}
                {!imageLoaded && !imageError && (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-800"></div>
                    </div>
                )}

                {/* Error State */}
                {imageError && (
                    <div className="flex justify-center items-center h-32 text-gray-600">
                        <p>Unable to load contribution graph</p>
                    </div>
                )}

                {/* Real GitHub Contribution Graph */}
                <motion.img
                    key={selectedYear}
                    src={contributionUrl}
                    alt={`GitHub Contributions for ${username} in ${selectedYear}`}
                    className={`w-full h-auto transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    style={{ minWidth: '800px' }}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                        setImageError(true);
                        setImageLoaded(false);
                    }}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Note about real data */}
                {imageLoaded && (
                    <motion.p
                        className="text-xs text-gray-500 mt-3 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Real-time data from GitHub • Updates automatically
                    </motion.p>
                )}
            </div>
        </motion.div>
    );
};

export default DynamicContributionGraph;
