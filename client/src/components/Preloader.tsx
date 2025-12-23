import React, { useEffect, useState } from "react";

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
    "SYSTEM_STABLE. WELCOME_ENGINEER.",
  ];

  useEffect(() => {
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < bootLogs.length) {
        setLogs((prev) => [...prev, bootLogs[currentLogIndex]]);
        currentLogIndex++;
      }
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
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
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white dark:bg-[#09090b] ease-in-out ${
        isExiting ? "opacity-0 scale-110 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50"></div>

      <div className="relative w-full max-w-lg px-6 sm:px-8 space-y-8 sm:space-y-12">
        {/* Central Logo Animation */}
        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full rotate-45"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-zinc-200 dark:text-zinc-800"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                className="ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase">
                V<span className="text-indigo-500">.</span>
              </span>
            </div>
          </div>
          <div className="text-[9px] sm:text-[10px] font-mono text-indigo-500 font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] animate-pulse">
            System Booting {Math.floor(progress)}%
          </div>
        </div>

        {/* Terminal Logs Container */}
        <div className="bg-zinc-100/80 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 sm:p-6 font-mono text-[9px] sm:text-[10px] h-32 sm:h-40 overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="flex gap-1.5 mb-3 sm:mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500/30"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500/30"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500/30"></div>
          </div>
          <div className="space-y-1 sm:space-y-1.5">
            {logs.map((log, i) => (
              <div
                key={i}
                className="text-zinc-500 dark:text-zinc-500 flex gap-2 sm:gap-3 text-[8px] sm:text-[10px]"
              >
                <span className="text-indigo-500/50 shrink-0">
                  [
                  {new Date().toLocaleTimeString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                  ]
                </span>
                <span
                  className={
                    i === logs.length - 1
                      ? "text-emerald-500 break-all"
                      : "break-all"
                  }
                >
                  {log}
                </span>
              </div>
            ))}
            <div className="flex gap-2">
              <span className="text-indigo-500/50 shrink-0">
                [
                {new Date().toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
                ]
              </span>
              <span className="text-zinc-900 dark:text-white">_</span>
              <span className="cursor-blink"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branded Status */}
      <div className="absolute bottom-8 sm:bottom-12 text-zinc-400 dark:text-zinc-700 font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.3em] sm:tracking-[0.5em] px-4 text-center">
        Build 2024.0.1 // Distributed Architecture // Vortex.io
      </div>
    </div>
  );
};

export default Preloader;
