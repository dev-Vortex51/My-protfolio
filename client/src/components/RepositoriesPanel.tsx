import { Project } from "@/lib/types";
import React from "react";

interface Props {
  projects: Project[];
  editingProject: Project | null;
  isRefining: boolean;
  onAddProject: () => void;
  onSaveProject: (proj: Project) => void;
  onDeleteProject: (id: string) => void;
  onSuggestTags: (description: string, id: string) => void;
  setEditingProject: (p: Project | null) => void;
}

const calculateReadTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const RepositoriesPanel: React.FC<Props> = ({
  projects,
  editingProject,
  isRefining,
  onAddProject,
  onSaveProject,
  onDeleteProject,
  onSuggestTags,
  setEditingProject,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xs md:text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest">
          Repository Orchestration
        </h3>
        <button
          onClick={onAddProject}
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded"
        >
          New Repo
        </button>
      </div>

      {editingProject && (
        <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-indigo-500/50 rounded-lg p-6 space-y-6">
          <h4 className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
            Configuration Tool: {editingProject.id}
          </h4>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              value={editingProject.title}
              onChange={(e) =>
                setEditingProject({ ...editingProject, title: e.target.value })
              }
              className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
              placeholder="Project Title"
            />
            <input
              type="text"
              value={editingProject.version || ""}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  version: e.target.value,
                })
              }
              className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
              placeholder="Version (e.g., v1.0.0)"
            />
          </div>

          <textarea
            value={editingProject.description}
            onChange={(e) =>
              setEditingProject({
                ...editingProject,
                description: e.target.value,
              })
            }
            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm resize-none"
            rows={4}
            placeholder="Project description"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="url"
              value={editingProject.link}
              onChange={(e) =>
                setEditingProject({ ...editingProject, link: e.target.value })
              }
              className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
              placeholder="Project URL"
            />
            <input
              type="url"
              value={editingProject.github || ""}
              onChange={(e) =>
                setEditingProject({ ...editingProject, github: e.target.value })
              }
              className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
              placeholder="GitHub URL (optional)"
            />
          </div>

          <input
            type="url"
            value={editingProject.image}
            onChange={(e) =>
              setEditingProject({ ...editingProject, image: e.target.value })
            }
            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
            placeholder="Image URL"
          />

          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={editingProject.status}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  status: e.target.value as Project["status"],
                })
              }
              className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
            >
              <option value="production">Production</option>
              <option value="beta">Beta</option>
              <option value="archived">Archived</option>
            </select>

            <label className="flex items-center gap-2 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2">
              <input
                type="checkbox"
                checked={editingProject.featured}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    featured: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-indigo-600"
              />
              <span className="text-zinc-900 dark:text-white text-sm">
                Featured
              </span>
            </label>

            <button
              onClick={() =>
                onSuggestTags(editingProject.description, editingProject.id)
              }
              disabled={isRefining}
              className="px-4 py-2 border border-indigo-500 text-indigo-500 text-[10px] font-bold uppercase rounded hover:bg-indigo-500/10"
            >
              {isRefining ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin mr-2"></i>
                  Suggesting...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-wand-sparkles mr-2"></i>
                  Suggest Tags
                </>
              )}
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
              Tags
            </label>
            <input
              type="text"
              value={editingProject.tags.join(", ")}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  tags: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
              className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
              placeholder="React, TypeScript, Node.js (comma-separated)"
            />
          </div>

          {editingProject.metrics && (
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                  Stars
                </label>
                <input
                  type="number"
                  value={editingProject.metrics.stars}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      metrics: {
                        ...editingProject.metrics!,
                        stars: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                  Forks
                </label>
                <input
                  type="number"
                  value={editingProject.metrics.forks}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      metrics: {
                        ...editingProject.metrics!,
                        forks: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                  Coverage
                </label>
                <input
                  type="text"
                  value={editingProject.metrics.coverage}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      metrics: {
                        ...editingProject.metrics!,
                        coverage: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm"
                  placeholder="98%"
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onSaveProject(editingProject)}
              className="px-6 py-2 bg-emerald-600 text-white text-[10px] font-bold uppercase rounded hover:bg-emerald-500"
            >
              <i className="fa-solid fa-check mr-2"></i>
              Push Commit
            </button>
            <button
              onClick={() => setEditingProject(null)}
              className="px-6 py-2 bg-zinc-800 text-white text-[10px] font-bold uppercase rounded hover:bg-zinc-700"
            >
              <i className="fa-solid fa-xmark mr-2"></i>
              Abort
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 md:p-6 flex flex-col md:flex-row justify-between gap-4"
          >
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-center text-indigo-500 shrink-0">
                <i className="fa-solid fa-cube"></i>
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="text-zinc-900 dark:text-white font-bold uppercase tracking-tight truncate">
                  {project.title}
                </h4>
                <div className="flex items-center gap-3">
                  <p className="text-zinc-500 text-[10px] font-mono truncate">
                    {project.version} // {project.status}
                  </p>
                  <span className="text-zinc-700">|</span>
                  <span className="text-zinc-600 text-[10px] font-mono">
                    {calculateReadTime(project.description)} MIN READ
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingProject(project)}
                className="p-2 text-zinc-400 hover:text-indigo-600 transition-colors"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                onClick={() => onDeleteProject(project.id)}
                className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
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

export default RepositoriesPanel;
