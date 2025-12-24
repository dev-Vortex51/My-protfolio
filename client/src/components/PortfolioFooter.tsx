import React from "react";

const PortfolioFooter: React.FC = () => {
  return (
    <footer className="pt-24 md:pt-40 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-500 pb-12">
      <div className="font-black text-xl text-zinc-900 dark:text-white tracking-tighter uppercase">
        Vortex<span className="text-indigo-600">.</span>
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-12 font-mono text-[9px] md:text-[10px] tracking-widest uppercase">
        <a
          href="https://github.com/dev_Vortex51"
          className="hover:text-zinc-900 dark:hover:text-white"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/dev_Vortex51"
          className="hover:text-zinc-900 dark:hover:text-white"
        >
          LinkedIn
        </a>
        <a
          href="https://x.com/belloqu44401095"
          className="hover:text-zinc-900 dark:hover:text-white"
        >
          Twitter
        </a>
      </div>
      <div className="text-[9px] md:text-[10px] font-mono text-center">
        BUILD_2024.0.1 // SCALEABLE_ARCHITECTURE
      </div>
    </footer>
  );
};

export default PortfolioFooter;
