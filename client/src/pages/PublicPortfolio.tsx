import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PortfolioData } from "../lib/types";

interface Props {
  data: PortfolioData;
}

const PublicPortfolio: React.FC<Props> = ({ data }) => {
  const [terminalText, setTerminalText] = useState("");
  const [command, setCommand] = useState("");
  const [activeSkillCategory, setActiveSkillCategory] = useState<
    "all" | "frontend" | "backend" | "devops"
  >("all");

  const fullText = `root@vortex:~$ ssh guest@portfolio\nConnecting to port 22...\nAuthenticated.\nLast login: ${new Date().toLocaleDateString()}\n\nWelcome back, engineer. System is stable.`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTerminalText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = command.toLowerCase().trim();
    if (cmd === "help")
      alert("Available: about, projects, contact, sudo give-job, clear");
    else if (cmd === "sudo give-job")
      alert("Access Granted. Opening recruiter channel...");
    else if (cmd.startsWith("./skills")) {
      const category = cmd.split(" ")[1]?.replace("--", "");
      if (category) alert(`Filtering skills for: ${category}`);
      else alert("Usage: ./skills --frontend, ./skills --backend");
    }
    setCommand("");
  };

  const filteredSkills =
    activeSkillCategory === "all"
      ? data.skills
      : data.skills.filter((s) => s.category === activeSkillCategory);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 pt-24 md:pt-32 space-y-24 md:space-y-48 pb-32">
      {/* Hero: Terminal Entry */}
      <section className="grid lg:grid-cols-[1fr_400px] gap-12 items-center min-h-[60vh]">
        <div className="space-y-6 md:space-y-8">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-500 font-mono text-[10px] md:text-xs tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            SYSTEM STATUS: OPERATIONAL // {data.location}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-zinc-900 dark:text-white leading-[1] lg:leading-[0.9]">
            ENGINEERING <br className="hidden md:block" />
            <span className="text-zinc-300 dark:text-zinc-700">
              FOR THE
            </span>{" "}
            <br className="hidden md:block" />
            INFINITE SCALE<span className="text-indigo-500">.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-medium leading-relaxed">
            Architecting robust digital infrastructure with a focus on
            low-latency, scalability, and human-centric design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <Link
              to="/contact"
              className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white dark:hover:text-white transition-all shadow-xl shadow-indigo-500/10 text-center"
            >
              Initiate Project
            </Link>
            <Link
              to="/projects"
              className="px-8 py-4 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-[10px] md:text-xs font-black uppercase tracking-widest hover:border-zinc-900 dark:hover:border-white transition-all text-center"
            >
              Browse Index
            </Link>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 md:p-6 font-mono text-xs md:text-sm h-[280px] md:h-[320px] shadow-2xl relative flex flex-col">
          <div className="flex gap-1.5 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
          </div>
          <div className="flex-grow whitespace-pre-wrap text-zinc-700 dark:text-zinc-300 overflow-y-auto scrollbar-hide">
            {terminalText}
            <span className="cursor-blink"></span>
          </div>
          <form
            onSubmit={handleCommand}
            className="flex gap-2 text-indigo-600 dark:text-indigo-400 mt-2 border-t border-zinc-200 dark:border-zinc-800 pt-2"
          >
            <span className="shrink-0">root@vortex:~$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="bg-transparent border-none outline-none flex-grow text-zinc-900 dark:text-white"
              placeholder="type 'help'..."
            />
          </form>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 border-y border-zinc-200 dark:border-zinc-800 py-12 gap-y-12 md:gap-8 reveal">
        {[
          { label: "UPTIME", value: data.stats.uptime },
          { label: "COMMITS", value: data.stats.commits },
          { label: "TRAFFIC", value: data.stats.visitors.toLocaleString() },
          { label: "PERF", value: `${data.stats.lighthouse}/100` },
        ].map((stat) => (
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

      {/* Technical Arsenal Section */}
      <section id="skills" className="space-y-12 md:space-y-16 reveal">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-zinc-200 dark:border-zinc-900 pb-8 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight uppercase tracking-widest">
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
                className={`px-3 py-1 border transition-all whitespace-nowrap ${
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
          {/* Skill Monitor */}
          <div className="lg:col-span-2 space-y-6 overflow-hidden">
            <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 md:p-6 font-mono text-[10px] md:text-xs overflow-x-auto scrollbar-thin">
              <div className="grid grid-cols-[50px_1fr_80px_60px_60px] md:grid-cols-[60px_1fr_100px_80px_80px] text-zinc-400 dark:text-zinc-600 border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-4 min-w-[450px]">
                <span>PID</span>
                <span>SYSTEM_RESOURCE</span>
                <span>USAGE_LOAD</span>
                <span>PRIORITY</span>
                <span className="text-right">STATUS</span>
              </div>
              <div className="space-y-2 min-w-[450px]">
                {filteredSkills.map((skill) => (
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
                      <div className="h-1 flex-grow bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden">
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

            {/* Simulated Heatmap */}
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
                  // Reduced count for mobile clarity, scale as needed
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
                      } hover:scale-150 transition-transform`}
                      title={`Activity level: ${level}`}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Stats / Achievements */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 space-y-6">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-900 pb-4 flex items-center gap-2">
                <i className="fa-solid fa-microchip text-indigo-500"></i>
                Environment Status
              </h3>
              <div className="space-y-4 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase">OS_Kernel:</span>
                  <span className="text-zinc-900 dark:text-white">
                    vortex-2.0-LTS
                  </span>
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

            <div className="p-6 border border-indigo-500/20 bg-indigo-500/5 rounded-lg space-y-4">
              <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest">
                <i className="fa-solid fa-terminal"></i>
                Terminal Tip
              </div>
              <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
                Try running{" "}
                <code className="text-indigo-600 dark:text-indigo-300">
                  ./skills --frontend
                </code>{" "}
                in the console above to filter the tech stack.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects: Preview */}
      <section id="projects" className="space-y-12 md:space-y-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-zinc-200 dark:border-zinc-900 pb-8 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight uppercase tracking-widest">
            Featured Repositories
          </h2>
          <Link
            to="/projects"
            className="text-indigo-600 dark:text-indigo-400 font-mono text-[10px] md:text-xs hover:text-zinc-900 dark:hover:text-white transition-colors"
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
                className="group bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-md p-6 hover:border-indigo-500/50 transition-all duration-300 reveal shadow-sm dark:shadow-none"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3 pr-2">
                    <i className="fa-solid fa-folder text-indigo-500"></i>
                    <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
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
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2 h-10">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 md:gap-6 text-[10px] md:text-[11px] font-mono text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-900 pt-6">
                  <div className="flex items-center gap-1.5">
                    <i className="fa-solid fa-code-fork"></i>{" "}
                    {project.metrics?.forks}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <i className="fa-solid fa-star"></i>{" "}
                    {project.metrics?.stars}
                  </div>
                  <div className="flex-grow"></div>
                  <div className="hidden sm:flex gap-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-zinc-400 dark:text-zinc-700"
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

      {/* Footer Branding */}
      <footer className="pt-24 md:pt-40 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-500 pb-12">
        <div className="font-black text-xl text-zinc-900 dark:text-white tracking-tighter uppercase">
          Vortex<span className="text-indigo-600">.</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 font-mono text-[9px] md:text-[10px] tracking-widest uppercase">
          <a
            href="#"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="#"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Twitter
          </a>
        </div>
        <div className="text-[9px] md:text-[10px] font-mono text-center">
          BUILD_2024.0.1 // SCALEABLE_ARCHITECTURE
        </div>
      </footer>
    </div>
  );
};

export default PublicPortfolio;
