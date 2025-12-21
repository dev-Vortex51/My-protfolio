
import React, { useEffect, useState } from 'react';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isExiting, setIsExiting] = useState(false);

  const bootLogs = [
    "INITIALIZING_VORTEX_CORE_V3.1...",
    "ESTABLISHING_SECURE_UPLINK... [OK]",
    "LOADING_REPOSITORIES... [OK]",
    "CONFIGURING_NEURAL_INTERFACE... [OK]",
    "OPTIMIZING_RENDER_PIPELINE... [OK]",
    "SYSTEM_STABLE. WELCOME_ENGINEER."
  ];

  useEffect(() => {
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentLogIndex]]);
        currentLogIndex++;
      }
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 800);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#09090b] transition-all duration-700 ease-in-out ${isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50"></div>
      
      <div className="relative w-full max-w-lg px-8 space-y-12">
        {/* Central Logo Animation */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full rotate-45">
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="#18181b" 
                strokeWidth="2"
              />
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="#6366f1" 
                strokeWidth="2"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                className="transition-all duration-300 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-black text-white tracking-tighter uppercase">V<span className="text-indigo-500">.</span></span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-indigo-500 font-bold uppercase tracking-[0.4em] animate-pulse">
            System Booting {Math.floor(progress)}%
          </div>
        </div>

        {/* Terminal Logs Container */}
        <div className="bg-black/40 border border-zinc-800 rounded-lg p-6 font-mono text-[10px] h-40 overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="flex gap-1.5 mb-4">
            <div className="w-2 h-2 rounded-full bg-red-500/30"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/30"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/30"></div>
          </div>
          <div className="space-y-1.5">
            {logs.map((log, i) => (
              <div key={i} className="text-zinc-500 flex gap-3">
                <span className="text-indigo-500/50">[{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                <span className={i === logs.length - 1 ? "text-emerald-500" : ""}>{log}</span>
              </div>
            ))}
            <div className="flex gap-2">
              <span className="text-indigo-500/50">[{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
              <span className="text-white">_</span>
              <span className="cursor-blink"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branded Status */}
      <div className="absolute bottom-12 text-zinc-700 font-mono text-[8px] uppercase tracking-[0.5em]">
        Build 2024.0.1 // Distributed Architecture // Vortex.io
      </div>
    </div>
  );
};

export default Preloader;
