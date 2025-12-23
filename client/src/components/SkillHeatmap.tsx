import React from "react";

const SkillHeatmap: React.FC = () => {
  return (
    <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 md:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest gap-2">
        <span>Technology Flux & Frequency</span>
        <div className="flex gap-1 items-center">
          Less <div className="pixel"></div>
          <div className="pixel pixel-1"></div>
          <div className="pixel pixel-2"></div>
          <div className="pixel pixel-3"></div> More
        </div>
      </div>
      <div className="flex flex-wrap gap-1 md:gap-1.5 justify-center sm:justify-start">
        {Array.from({ length: 15 * 10 }).map((_, i) => {
          const level = Math.floor(Math.random() * 4);
          return (
            <div
              key={i}
              className={`pixel md:w-3 md:h-3 ${
                level === 1
                  ? "pixel-1"
                  : level === 2
                  ? "pixel-2"
                  : level === 3
                  ? "pixel-3"
                  : ""
              } hover:scale-150`}
              title={`Activity level: ${level}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillHeatmap;
