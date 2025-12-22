import React from "react";
import { Skill } from "../lib/types";

interface SkillMonitorProps {
  skills: Skill[];
}

const SkillMonitor: React.FC<SkillMonitorProps> = ({ skills }) => {
  return (
    <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 md:p-6 font-mono text-[10px] md:text-xs overflow-x-auto scrollbar-thin">
      <div className="grid grid-cols-[50px_1fr_80px_60px_60px] md:grid-cols-[60px_1fr_100px_80px_80px] text-zinc-400 dark:text-zinc-600 border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-4 min-w-112.5">
        <span>PID</span>
        <span>SYSTEM_RESOURCE</span>
        <span>USAGE_LOAD</span>
        <span>PRIORITY</span>
        <span className="text-right">STATUS</span>
      </div>
      <div className="space-y-2 min-w-112.5">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="grid grid-cols-[50px_1fr_80px_60px_60px] md:grid-cols-[60px_1fr_100px_80px_80px] items-center text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-900/50 py-1 transition-colors group"
          >
            <span className="text-zinc-400 dark:text-zinc-700">
              {skill.pid}
            </span>
            <span className="font-bold text-zinc-900 dark:text-zinc-200 uppercase truncate pr-2">
              {skill.name}
            </span>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="h-1 grow bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <span className="text-[9px] md:text-[10px] text-zinc-400 dark:text-zinc-600 w-6 md:w-8">
                {skill.level}%
              </span>
            </div>
            <span className="text-zinc-400 dark:text-zinc-500 uppercase truncate">
              {skill.category}
            </span>
            <span className="text-emerald-600 dark:text-emerald-500/80 font-bold text-right">
              ACTIVE
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillMonitor;
