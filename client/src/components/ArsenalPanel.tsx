import { Skill } from "@/lib/types";
import React from "react";

interface Props {
  skills: Skill[];
  onAddSkill: () => void;
  onUpdateSkill: (id: string, updates: Partial<Skill>) => void;
  onDeleteSkill: (id: string) => void;
}

const ArsenalPanel: React.FC<Props> = ({
  skills,
  onAddSkill,
  onUpdateSkill,
  onDeleteSkill,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xs md:text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest">
          Resource Calibration (Arsenal)
        </h3>
        <button
          onClick={onAddSkill}
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded"
        >
          Initialize Module
        </button>
      </div>
      <div className="grid gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 md:p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-zinc-600">
                  PID:{skill.pid}
                </span>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) =>
                    onUpdateSkill(skill.id, {
                      name: e.target.value.toUpperCase(),
                    })
                  }
                  className="bg-transparent text-zinc-900 dark:text-white font-bold border-b border-transparent focus:border-indigo-500 outline-none uppercase text-sm"
                />
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={skill.category}
                  onChange={(e) =>
                    onUpdateSkill(skill.id, { category: e.target.value as any })
                  }
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-400 text-[10px] font-mono rounded px-2 py-1 uppercase"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="devops">DevOps</option>
                  <option value="other">Other</option>
                </select>
                <button
                  onClick={() => onDeleteSkill(skill.id)}
                  className="text-zinc-600 hover:text-red-500"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="grow h-1.5 bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={skill.level}
                onChange={(e) =>
                  onUpdateSkill(skill.id, { level: parseInt(e.target.value) })
                }
                className="w-32 accent-indigo-500"
              />
              <span className="text-[10px] font-mono text-indigo-400 w-8">
                {skill.level}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArsenalPanel;
