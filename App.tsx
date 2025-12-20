
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import PublicPortfolio from './views/PublicPortfolio';
import ProjectsPage from './views/ProjectsPage';
import ContactPage from './views/ContactPage';
import AdminDashboard from './views/AdminDashboard';
import Login from './views/Login';
import Logo from './components/Logo';
import { PortfolioData } from './types';
import { INITIAL_DATA } from './constants';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolio_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('is_auth') === 'true';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogin = (password: string) => {
    if (password === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('is_auth', 'true');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('is_auth');
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
        {/* Persistent System Status Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-100 dark:bg-zinc-900 z-[110]">
          <div className="h-full bg-indigo-600 animate-[progress_2s_ease-in-out_infinite]" style={{ width: '30%' }}></div>
        </div>

        <header className="fixed top-4 left-0 right-0 z-[100] px-6">
          <nav className="max-w-[1400px] mx-auto flex items-center justify-between h-14 bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-full px-6 shadow-sm dark:shadow-none">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-black text-zinc-900 dark:text-white tracking-tighter uppercase">Vortex<span className="text-indigo-600">.</span></span>
            </Link>
            
            <div className="flex items-center gap-6 md:gap-8">
              <div className="hidden md:flex items-center gap-8 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                <Link to="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Index</Link>
                <Link to="/projects" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Projects</Link>
                <Link to="/contact" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Contact</Link>
              </div>
              
              <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden md:block"></div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleTheme}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-indigo-500 transition-all"
                  aria-label="Toggle Theme"
                >
                  <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
                </button>

                {isAuthenticated ? (
                  <div className="flex items-center gap-4">
                    <Link to="/admin" className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded">Dashboard</Link>
                    <button onClick={handleLogout} className="text-[10px] font-bold uppercase text-zinc-500 hover:text-red-500">Esc</button>
                  </div>
                ) : (
                  <Link to="/login" className="text-[10px] font-bold uppercase text-zinc-500 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<PublicPortfolio data={data} />} />
            <Route path="/projects" element={<ProjectsPage data={data} />} />
            <Route path="/contact" element={<ContactPage data={data} />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/admin" /> : <Login onLogin={handleLogin} />} />
            <Route 
              path="/admin/*" 
              element={isAuthenticated ? <AdminDashboard data={data} onUpdate={setData} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
