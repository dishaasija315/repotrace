import React, { useState } from 'react';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';

function App() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyze = async (url) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // In production, this URL should be configurable
            const response = await fetch(`http://localhost:8080/api/analyze?url=${encodeURIComponent(url)}`);

            if (!response.ok) {
                throw new Error('Failed to fetch analysis. Make sure the backend is running and the URL is valid.');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-gray-100 transition-colors duration-300 font-sans">
            <ThemeToggle />
            <Hero onAnalyze={handleAnalyze} loading={loading} />

            {error && (
                <div className="max-w-md mx-auto p-4 bg-red-500/10 border border-red-500/50 text-red-600 dark:text-red-200 rounded-xl text-center mb-8 backdrop-blur-sm">
                    ⚠️ {error}
                </div>
            )}

            <Dashboard result={result} />

            <footer className="text-center p-8 text-slate-500 dark:text-slate-400 text-sm">
                <p>RepoTrace © 2025. Built with Spring Boot & React.</p>
            </footer>
        </div>
    );
}

export default App;
