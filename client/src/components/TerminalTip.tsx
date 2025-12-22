import React from "react";

const TerminalTip: React.FC = () => {
  return (
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
  );
};

export default TerminalTip;
