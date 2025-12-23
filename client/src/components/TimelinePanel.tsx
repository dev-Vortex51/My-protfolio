import { Experience } from "@/lib/types";
import React from "react";

interface Props {
  experiences: Experience[];
  editingExperience: Experience | null;
  onAddExperience: () => void;
  onSaveExperience: (exp: Experience) => void;
  onDeleteExperience: (id: string) => void;
  setEditingExperience: (exp: Experience | null) => void;
}

const TimelinePanel: React.FC<Props> = ({
  experiences,
  editingExperience,
  onAddExperience,
  onSaveExperience,
  onDeleteExperience,
  setEditingExperience,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xs md:text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest">
          Deployment Timeline (History)
        </h3>
        <button
          onClick={onAddExperience}
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded"
        >
          Log Entry
        </button>
      </div>

      {editingExperience && (
        <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-indigo-500/50 rounded-lg p-6 space-y-6">
          <h4 className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
            Chronology Adjuster: {editingExperience.id}
          </h4>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              value={editingExperience.company}
              onChange={(e) =>
                setEditingExperience({
                  ...editingExperience,
                  company: e.target.value,
                })
              }
              className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
              placeholder="Company Name"
            />
            <input
              type="text"
              value={editingExperience.role}
              onChange={(e) =>
                setEditingExperience({
                  ...editingExperience,
                  role: e.target.value,
                })
              }
              className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
              placeholder="Job Title"
            />
          </div>

          <input
            type="text"
            value={editingExperience.period}
            onChange={(e) =>
              setEditingExperience({
                ...editingExperience,
                period: e.target.value,
              })
            }
            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
            placeholder="Period (e.g., 2022 - PRESENT)"
          />

          <textarea
            value={editingExperience.description}
            onChange={(e) =>
              setEditingExperience({
                ...editingExperience,
                description: e.target.value,
              })
            }
            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm resize-none"
            rows={4}
            placeholder="Role description and key achievements"
          />

          <input
            type="url"
            value={editingExperience.logo || ""}
            onChange={(e) =>
              setEditingExperience({
                ...editingExperience,
                logo: e.target.value,
              })
            }
            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
            placeholder="Company Logo URL (optional)"
          />

          <div className="flex gap-4">
            <button
              onClick={() => onSaveExperience(editingExperience)}
              className="px-6 py-2 bg-emerald-600 text-white text-[10px] font-bold uppercase rounded hover:bg-emerald-500"
            >
              <i className="fa-solid fa-check mr-2"></i>
              Commit Record
            </button>
            <button
              onClick={() => setEditingExperience(null)}
              className="px-6 py-2 bg-zinc-800 text-white text-[10px] font-bold uppercase rounded hover:bg-zinc-700"
            >
              <i className="fa-solid fa-xmark mr-2"></i>
              Abort
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center group gap-4"
          >
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-indigo-500 uppercase font-bold tracking-widest">
                {exp.period}
              </div>
              <h4 className="text-zinc-900 dark:text-white font-bold">
                {exp.role} @ {exp.company}
              </h4>
              <p className="text-zinc-500 text-[10px] line-clamp-1">
                {exp.description}
              </p>
            </div>
            <div className="flex items-center gap-4 md:opacity-0 md:group-hover:opacity-100 self-end md:self-auto">
              <button
                onClick={() => setEditingExperience(exp)}
                className="text-zinc-400 hover:text-indigo-600"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                onClick={() => onDeleteExperience(exp.id)}
                className="text-zinc-400 hover:text-red-500"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelinePanel;
