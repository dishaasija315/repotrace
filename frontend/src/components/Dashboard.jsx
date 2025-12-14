import React from 'react';

const Dashboard = ({ result }) => {
    if (!result) return null;

    const { score, summary, roadmap, details, repoName, techStack, categoryScores } = result;

    const getScoreColor = (s) => {
        if (s >= 90) return 'text-emerald-500 border-emerald-500 shadow-emerald-500/20';
        if (s >= 70) return 'text-amber-500 border-amber-500 shadow-amber-500/20';
        if (s >= 50) return 'text-orange-500 border-orange-500 shadow-orange-500/20';
        return 'text-rose-500 border-rose-500 shadow-rose-500/20';
    };

    const getGrade = (s) => {
        if (s >= 90) return 'A';
        if (s >= 80) return 'B';
        if (s >= 60) return 'C';
        if (s >= 40) return 'D';
        return 'F';
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-10 animate-fade-in-up pb-20">

            {/* Header / Summary Card */}
            <div className="glass-card p-10 flex flex-col lg:flex-row items-center gap-10 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl">
                {/* Score Circle */}
                <div className={`relative w-48 h-48 rounded-full border-[12px] flex flex-col items-center justify-center shadow-2xl ${getScoreColor(score)} bg-slate-50 dark:bg-slate-900/50`}>
                    <span className="text-6xl font-black">{score}</span>
                    <span className="text-2xl font-bold opacity-80 mt-1">Grade {getGrade(score)}</span>
                    <div className="absolute top-2 right-6 group">
                        <span className="cursor-help text-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">ℹ️</span>
                        <div className="absolute bottom-full mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                            Some values are limited due to GitHub API rate limits for unauthenticated users.
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left space-y-4">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                        <div>
                            <h2 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-400 break-all">{repoName}</h2>
                            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium mt-2">{summary}</p>
                        </div>
                        <button
                            onClick={() => {
                                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
                                const downloadAnchorNode = document.createElement('a');
                                downloadAnchorNode.setAttribute("href", dataStr);
                                downloadAnchorNode.setAttribute("download", `gitgrade_report_${repoName.replace('/', '_')}_${Date.now()}.json`);
                                document.body.appendChild(downloadAnchorNode);
                                downloadAnchorNode.click();
                                downloadAnchorNode.remove();
                            }}
                            className="btn-primary py-2 px-4 text-sm flex items-center gap-2 shadow-lg hover:shadow-cyan-500/20 self-center lg:self-start"
                        >
                            <span>⬇</span> Download Report
                        </button>
                    </div>

                    {/* Key Metrics Row */}
                    <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
                        <div className="metric-chip">
                            <span className="metric-value">⭐ {details.stars}</span>
                            <span className="metric-label">Stars</span>
                        </div>
                        <div className="metric-chip">
                            <span className="metric-value">🍴 {details.forks}</span>
                            <span className="metric-label">Forks</span>
                        </div>
                        <div className="metric-chip">
                            <span className="metric-value">🐞 {details.open_issues}</span>
                            <span className="metric-label">Issues</span>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    {techStack && techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
                            {techStack.map((tech) => (
                                <span key={tech} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide border border-slate-200 dark:border-slate-600">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Detailed Categories Grid */}
            {categoryScores && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(categoryScores).map(([category, catScore]) => (
                        <div key={category} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg text-slate-700 dark:text-slate-200">{category}</h3>
                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${catScore >= 20 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                    catScore >= 10 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                        'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                                    }`}>
                                    {catScore}/25
                                </div>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full" style={{ width: `${(catScore / 25) * 100}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Roadmap & Details Section */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Roadmap - Takes up 2 columns */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800 dark:text-white">
                        <span className="text-3xl">🚀</span> Personalized Roadmap
                    </h3>
                    {roadmap.length === 0 ? (
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800">
                            <p className="text-emerald-700 dark:text-emerald-300 font-medium text-lg">🎉 Outstanding work! Your repository is in top shape.</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {roadmap.map((item, idx) => (
                                <li key={idx} className="group flex gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm">
                                        {idx + 1}
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-300 mt-1">{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Analysis Details - Takes up 1 column */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg h-fit">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800 dark:text-white">
                        <span className="text-3xl">🔍</span> Deep Dive
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Documentation', key: 'hasReadme' },
                            { label: 'License', key: 'hasLicense' },
                            { label: 'CI/CD Workflows', key: 'hasWorkflows' },
                            { label: 'Test Suite', key: 'hasTests' },
                        ].map((item) => (
                            <div key={item.key} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700">
                                <span className="font-medium text-slate-600 dark:text-slate-400">{item.label}</span>
                                {details[item.key] ? (
                                    <span className="text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded text-xs font-bold uppercase">Pass</span>
                                ) : (
                                    <span className="text-rose-500 bg-rose-100 dark:bg-rose-900/30 px-2 py-1 rounded text-xs font-bold uppercase">Missing</span>
                                )}
                            </div>
                        ))}
                        <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700">
                            <span className="font-medium text-slate-600 dark:text-slate-400">Recent Commits</span>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${details.recentCommits > 0 ? 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' : 'text-gray-500'}`}>
                                {details.recentCommits || 0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
