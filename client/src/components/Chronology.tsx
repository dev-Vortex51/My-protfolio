import { PortfolioData } from "@/lib/types";
import React from "react";
import { Link } from "react-router-dom";

interface ChronologyProps {
  data: PortfolioData;
}

export default function Chronology({ data }: ChronologyProps) {
  return (
    <section className="space-y-12 md:space-y-16 reveal">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-zinc-200 dark:border-zinc-900 pb-8 gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight uppercase">
            Chronology
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            Deployment history and professional trajectory logs.
          </p>
        </div>
        <Link
          to="/resume"
          className="text-indigo-600 dark:text-indigo-400 font-mono text-[10px] md:text-xs hover:text-zinc-900 dark:hover:text-white"
        >
          Detailed Resume Mode →
        </Link>
      </div>
      <div className="space-y-6">
        {data.experiences.slice(0, 3).map((exp, idx) => (
          <div key={exp.id} className="relative pl-8 md:pl-12 group">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 group-last:bg-transparent">
              <div className="absolute top-1 -left-1.25 w-2.5 h-2.5 bg-white dark:bg-zinc-900 border-2 border-indigo-500 rounded-full z-10"></div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest font-bold">
                  {exp.period}
                </span>
                <span className="hidden sm:block h-px w-4 bg-zinc-200 dark:bg-zinc-800"></span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white uppercase">
                  {exp.role} @ {exp.company}
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
