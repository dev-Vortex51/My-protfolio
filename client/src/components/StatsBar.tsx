import React from "react";
import { PortfolioData } from "../lib/types";

interface StatsBarProps {
  data: PortfolioData;
}

const StatsBar: React.FC<StatsBarProps> = ({ data }) => {
  const stats = [
    { label: "UPTIME", value: data.stats.uptime },
    { label: "COMMITS", value: data.stats.commits },
    { label: "TRAFFIC", value: data.stats.visitors.toLocaleString() },
    { label: "PERF", value: `${data.stats.lighthouse}/100` },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 border-y border-zinc-200 dark:border-zinc-800 py-12 gap-y-12 md:gap-8 reveal">
      {stats.map((stat) => (
        <div key={stat.label} className="space-y-1 text-center md:text-left">
          <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-widest uppercase">
            {stat.label}
          </div>
          <div className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mono">
            {stat.value}
          </div>
        </div>
      ))}
    </section>
  );
};

export default StatsBar;
