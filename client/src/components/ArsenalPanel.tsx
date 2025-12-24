import { Skill } from "@/lib/types";
import React from "react";

interface Props {
  skills: Skill[];
  onAddSkill: () => void;
  onUpdateSkill: (id: string, updates: Partial<Skill>) => void;
  onDeleteSkill: (id: string) => void;
  isSaving?: boolean;
}

const ArsenalPanel: React.FC<Props> = ({
  skills,
  onAddSkill,
  onUpdateSkill,
  onDeleteSkill,
  isSaving = false,
}) => {
  return (
    <div className="space-y-6 reveal">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest">
            Arsenal
          </h3>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
            {skills.length} items
          </span>
          {isSaving && (
            <span className="text-[10px] font-mono text-indigo-500 flex items-center gap-1.5">
              <i className="fa-solid fa-circle-notch fa-spin text-[10px]"></i>
              syncing
            </span>
          )}
          {!isSaving && skills.length > 0 && (
            <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1.5">
              <i className="fa-solid fa-circle-check text-[10px]"></i>
              saved
            </span>
          )}
        </div>
        <button
          onClick={onAddSkill}
          className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider rounded hover:bg-indigo-700"
        >
          <i className="fa-solid fa-plus"></i>
          Add Skill
        </button>
      </div>

      {/* Skills List */}
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              No skills yet
            </p>
          </div>
        ) : (
          skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 md:p-5 space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 "
            >
              {/* Row 1: PID + delete */}
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>PID: {skill.pid}</span>
                <button
                  onClick={() => onDeleteSkill(skill.id)}
                  className="text-zinc-400 hover:text-red-500"
                  title="Delete"
                >
                  <i className="fa-solid fa-trash-can text-xs"></i>
                </button>
              </div>

              {/* Row 2: Name */}
              <div>
                <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) =>
                    onUpdateSkill(skill.id, {
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-transparent text-sm font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 focus:border-indigo-500 outline-none"
                  placeholder="Skill name"
                />
              </div>

              {/* Row 3: Category + Level stepper */}
              <div className="grid sm:grid-cols-[1fr_auto] gap-3 sm:gap-4 items-center">
                <div>
                  <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                    Category
                  </label>
                  <select
                    value={skill.category}
                    onChange={(e) =>
                      onUpdateSkill(skill.id, {
                        category: e.target.value as any,
                      })
                    }
                    className="w-full bg-transparent border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 rounded px-3 py-2 outline-none focus:border-indigo-500"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="devops">DevOps</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                    Level
                  </span>
                  <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateSkill(skill.id, {
                          level: Math.max(0, skill.level - 5),
                        })
                      }
                      className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-indigo-500"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100 w-10 text-center">
                      {skill.level}%
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateSkill(skill.id, {
                          level: Math.min(100, skill.level + 5),
                        })
                      }
                      className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-indigo-500"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArsenalPanel;
