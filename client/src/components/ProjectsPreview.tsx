import React from "react";
import { Link } from "react-router-dom";
import { PortfolioData } from "../lib/types";

interface ProjectsPreviewProps {
  data: PortfolioData;
}

const ProjectsPreview: React.FC<ProjectsPreviewProps> = ({ data }) => {
  return (
    <section id="projects" className="space-y-12 md:space-y-16 overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-zinc-200 dark:border-zinc-900 pb-8 gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white uppercase tracking-widest break-words">
          Featured Repositories
        </h2>
        <Link
          to="/projects"
          className="text-indigo-600 dark:text-indigo-400 font-mono text-[10px] md:text-xs hover:text-zinc-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          View All Archive →
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {data.projects
          .filter((p) => p.featured)
          .map((project) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-md p-4 sm:p-6 hover:border-indigo-500/50 reveal shadow-sm dark:shadow-none min-w-0"
            >
              <div className="flex justify-between items-start mb-4 sm:mb-6 gap-2 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 overflow-hidden">
                  <i className="fa-solid fa-folder text-indigo-500 shrink-0"></i>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {project.title}
                  </h3>
                </div>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                    project.status === "production"
                      ? "border-emerald-500/20 text-emerald-600 dark:text-emerald-500"
                      : "border-amber-500/20 text-amber-600 dark:text-amber-500"
                  } uppercase tracking-widest shrink-0`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2 break-words">
                {project.description}
              </p>
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6 text-[10px] md:text-[11px] font-mono text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-900 pt-4 sm:pt-6 overflow-hidden">
                <div className="flex items-center gap-1.5 shrink-0">
                  <i className="fa-solid fa-code-fork"></i>{" "}
                  {project.metrics?.forks}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <i className="fa-solid fa-star"></i> {project.metrics?.stars}
                </div>
                <div className="grow min-w-0"></div>
                <div className="hidden sm:flex gap-2 overflow-hidden">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-zinc-400 dark:text-zinc-700 truncate"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProjectsPreview;
