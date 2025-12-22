import React from "react";

const EnvironmentStatus: React.FC = () => {
  return (
    <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 space-y-6">
      <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-900 pb-4 flex items-center gap-2">
        <i className="fa-solid fa-microchip text-indigo-500"></i>
        Environment Status
      </h3>
      <div className="space-y-4 font-mono text-[11px]">
        <div className="flex justify-between">
          <span className="text-zinc-500 uppercase">OS_Kernel:</span>
          <span className="text-zinc-900 dark:text-white">vortex-2.0-LTS</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500 uppercase">Architecture:</span>
          <span className="text-zinc-900 dark:text-white">
            Distributed / x64
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500 uppercase">Shell:</span>
          <span className="text-zinc-900 dark:text-white">
            zsh / oh-my-vortex
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500 uppercase">Security:</span>
          <span className="text-emerald-600 dark:text-emerald-500 font-bold">
            Encrypted
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentStatus;
