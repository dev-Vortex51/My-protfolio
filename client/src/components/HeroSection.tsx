import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PortfolioData } from "../lib/types";

interface HeroSectionProps {
  data: PortfolioData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const [terminalText, setTerminalText] = useState("");
  const [command, setCommand] = useState("");

  const fullText = `root@vortex:~$ ssh guest@portfolio\nConnecting to port 22...\nSystem is stable.`;

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

  return (
    <section className="grid lg:grid-cols-[1fr_400px] gap-12 items-center min-h-[60vh]">
      <div className="space-y-6 md:space-y-8">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-500 font-mono text-[10px] md:text-xs tracking-widest uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          SYSTEM STATUS: OPERATIONAL // {data.location}
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-zinc-900 dark:text-white leading-none lg:leading-[0.9] whitespace-pre-line">
          {data.headline || "ENGINEERING FOR THE INFINITE SCALE"}
          <span className="text-indigo-500">.</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-medium leading-relaxed">
          {data.tagline ||
            "Architecting robust digital infrastructure with a focus on low-latency, scalability, and human-centric design."}
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

      <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 md:p-6 font-mono text-xs md:text-sm h-70 md:h-80 shadow-2xl relative flex flex-col">
        <div className="flex gap-1.5 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
        </div>
        <div className="grow whitespace-pre-wrap text-zinc-700 dark:text-zinc-300 overflow-y-auto scrollbar-hide">
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
            className="bg-transparent border-none outline-none grow text-zinc-900 dark:text-white"
            placeholder="type 'help'..."
          />
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
