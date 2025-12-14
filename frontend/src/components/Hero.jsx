import React, { useState } from 'react';

const Hero = ({ onAnalyze, loading }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (url) onAnalyze(url);
    }

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 animate-fade-in">
                RepoTrace
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                Unlock your potential. Analyze your GitHub repository instantly and get a personalized roadmap to developer excellence.
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-lg relative z-10">
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="https://github.com/username/repo"
                        className="input-field flex-1 text-teal-600 dark:text-teal-400 font-semibold placeholder:text-gray-400 bg-white dark:bg-white/5 border-2 border-teal-500"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Analyzing...' : 'Analyze Repo'}
                    </button>
                </div>
                <p className="mt-4 text-xs text-gray-500">
                    Paste a public GitHub repository link to get started.
                </p>
            </form>
        </div>
    );
};

export default Hero;
