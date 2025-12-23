import { PortfolioData } from "@/lib/types";
import React from "react";

interface Props {
  data: PortfolioData;
}

const ResumePage: React.FC<Props> = ({ data }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-350 mx-auto px-6 lg:px-12 pt-32 pb-32 space-y-20">
      {/* Resume Header / System Identity */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-zinc-900 dark:border-zinc-100 pb-8 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase">
            <span className="w-12 h-px bg-indigo-500"></span>
            Professional Dossier
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
            {data.name}
            <span className="text-indigo-600">.</span>
          </h1>
          <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span>{data.role}</span>
            <span className="text-zinc-300 dark:text-zinc-800">|</span>
            <span>{data.location}</span>
            <span className="text-zinc-300 dark:text-zinc-800">|</span>
            <span>{data.email}</span>
          </div>
        </div>
        <button
          onClick={handlePrint}
          className="print:hidden px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white dark:hover:text-white shadow-lg"
        >
          <i className="fa-solid fa-print mr-2"></i> Output to PDF
        </button>
      </div>

      {/* Main Content Sections */}
      <div className="grid md:grid-cols-[1fr_280px] gap-12 md:gap-20">
        <div className="space-y-12">
          {/* Executive Summary */}
          <section className="space-y-4">
            <h2 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-[0.3em] border-b border-zinc-200 dark:border-zinc-800 pb-2">
              Executive_Summary
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              {data.bio}
            </p>
          </section>

          {/* Experience Timeline */}
          <section className="space-y-8">
            <h2 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-[0.3em] border-b border-zinc-200 dark:border-zinc-800 pb-2">
              Deployment_History
            </h2>
            <div className="space-y-12">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white uppercase">
                      {exp.role}
                    </h3>
                    <span className="text-[10px] font-mono text-indigo-500 dark:text-indigo-400 font-bold tracking-widest">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">
                    {exp.company}
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-500 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education / Certification simulated */}
          <section className="space-y-4">
            <h2 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-[0.3em] border-b border-zinc-200 dark:border-zinc-800 pb-2">
              Knowledge_Bases
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  B.S. COMPUTER SCIENCE
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  CLASS_OF_2020
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  AWS CERTIFIED ARCHITECT
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  VALID_THRU_2026
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Sections */}
        <div className="space-y-12">
          {/* Tech Stack Breakdown */}
          <section className="space-y-6">
            <h2 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-[0.3em] border-b border-zinc-200 dark:border-zinc-800 pb-2">
              Arsenal_Matrix
            </h2>
            <div className="space-y-4">
              {(["frontend", "backend", "devops"] as const).map((cat) => (
                <div key={cat} className="space-y-2">
                  <h4 className="text-[9px] font-mono text-indigo-500 uppercase font-bold tracking-widest">
                    {cat}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.skills
                      .filter((s) => s.category === cat)
                      .map((skill) => (
                        <span
                          key={skill.id}
                          className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 uppercase bg-zinc-100 dark:bg-zinc-900 px-2 py-1 border border-zinc-200 dark:border-zinc-800"
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Languages simulated */}
          <section className="space-y-4">
            <h2 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-[0.3em] border-b border-zinc-200 dark:border-zinc-800 pb-2">
              Natural_Language
            </h2>
            <div className="space-y-2 text-xs font-mono text-zinc-500 uppercase">
              <div className="flex justify-between">
                <span>English</span>{" "}
                <span className="text-emerald-500">Native</span>
              </div>
              <div className="flex justify-between">
                <span>Spanish</span>{" "}
                <span className="text-indigo-400">Fluent</span>
              </div>
              <div className="flex justify-between">
                <span>Japanese</span>{" "}
                <span className="text-zinc-700">Limited</span>
              </div>
            </div>
          </section>

          {/* Social Links */}
          <section className="space-y-4">
            <h2 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-[0.3em] border-b border-zinc-200 dark:border-zinc-800 pb-2">
              External_Links
            </h2>
            <div className="flex flex-col gap-3 font-mono text-[10px] text-zinc-400 uppercase">
              <a href="#" className="hover:text-indigo-500 transition-colors">
                github.com/vortex
              </a>
              <a href="#" className="hover:text-indigo-500 transition-colors">
                linkedin.com/vortex
              </a>
              <a href="#" className="hover:text-indigo-500 transition-colors">
                twitter.com/vortex_dev
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Footer System Hash */}
      <div className="pt-12 border-t border-zinc-200 dark:border-zinc-900 text-center font-mono text-[8px] text-zinc-400 uppercase tracking-widest">
        HASH_VERIFIED // SESSION_KEY:{" "}
        {Math.random().toString(36).substr(2, 24).toUpperCase()} // BUILD:2024.1
      </div>
    </div>
  );
};

export default ResumePage;
