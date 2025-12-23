import React, { useState } from "react";
import { PortfolioData } from "../lib/types";
import SkillMonitor from "./SkillMonitor";
import SkillHeatmap from "./SkillHeatmap";
import EnvironmentStatus from "./EnvironmentStatus";
import TerminalTip from "./TerminalTip";

interface SkillsSectionProps {
  data: PortfolioData;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ data }) => {
  const [activeSkillCategory, setActiveSkillCategory] = useState<
    "all" | "frontend" | "backend" | "devops"
  >("all");

  const filteredSkills =
    activeSkillCategory === "all"
      ? data.skills
      : data.skills.filter((s) => s.category === activeSkillCategory);

  return (
    <section id="skills" className="space-y-12 md:space-y-16 reveal">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-zinc-200 dark:border-zinc-900 pb-8 gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight uppercase">
            Technical Arsenal
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            Interactive resource monitor and technology stack visualization.
          </p>
        </div>
        <div className="flex gap-2 md:gap-4 font-mono text-[9px] md:text-[10px] uppercase tracking-widest overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {(["all", "frontend", "backend", "devops"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveSkillCategory(cat)}
              className={`px-3 py-1 border whitespace-nowrap ${
                activeSkillCategory === cat
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 overflow-hidden">
          <SkillMonitor skills={filteredSkills} />
          <SkillHeatmap />
        </div>

        <div className="space-y-6 md:space-y-8">
          <EnvironmentStatus />
          <TerminalTip />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
