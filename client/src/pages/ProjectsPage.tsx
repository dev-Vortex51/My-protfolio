import React, { useState } from "react";
import { PortfolioData, Project, Comment } from "../lib/types";
import { likeProject, addCommentToProject } from "../services/api";

interface Props {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

const ProjectsPage: React.FC<Props> = ({ data, onUpdate }) => {
  const [filter, setFilter] = useState("all");
  const [activeComments, setActiveComments] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>(
    {}
  );

  const tags = Array.from(new Set(data.projects.flatMap((p) => p.tags)));

  const filteredProjects =
    filter === "all"
      ? data.projects
      : data.projects.filter((p) => p.tags.includes(filter));

  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const handleLike = async (projectId: string) => {
    try {
      const updated = await likeProject(projectId);
      const updatedProjects = data.projects.map((p) =>
        p.id === projectId ? updated : p
      );
      onUpdate({ ...data, projects: updatedProjects });
    } catch (err) {
      console.error("Failed to like project:", err);
    }
  };

  const handleAddComment = async (projectId: string) => {
    const text = commentInputs[projectId];
    if (!text?.trim()) return;

    try {
      const updated = await addCommentToProject(
        projectId,
        "Guest User",
        text.trim()
      );
      const updatedProjects = data.projects.map((p) =>
        p.id === projectId ? updated : p
      );
      onUpdate({ ...data, projects: updatedProjects });
      setCommentInputs({ ...commentInputs, [projectId]: "" });
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const toggleComments = (projectId: string) => {
    setActiveComments(activeComments === projectId ? null : projectId);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-32 space-y-20">
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-500 font-mono text-[10px] tracking-widest uppercase">
          <span className="w-8 h-[1px] bg-indigo-500"></span>
          Index / Projects / Explorer
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-zinc-900 dark:text-white">
          PROJECT{" "}
          <span className="text-zinc-300 dark:text-zinc-700">ARCHIVE</span>
          <span className="text-indigo-500">.</span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl text-lg font-medium leading-relaxed">
          A full-spectrum view of engineered solutions, from low-level systems
          to complex design frameworks.
        </p>
      </div>

      {/* Filter System */}
      <div className="flex flex-wrap gap-3 border-b border-zinc-200 dark:border-zinc-900 pb-8">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all ${
            filter === "all"
              ? "bg-indigo-600 text-white"
              : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          All_Repos
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all ${
              filter === tag
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="group bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300 reveal shadow-sm dark:shadow-none"
            style={{ transitionDelay: `${idx * 0.05}s` }}
          >
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform shadow-sm">
                  <i className="fa-solid fa-cube text-sm"></i>
                </div>
                <div className="flex flex-col items-end gap-1 text-right">
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                      project.status === "production"
                        ? "border-emerald-500/20 text-emerald-600 dark:text-emerald-500"
                        : "border-amber-500/20 text-amber-600 dark:text-amber-500"
                    } uppercase tracking-tighter`}
                  >
                    {project.status}
                  </span>
                  <div className="flex items-center gap-1 text-[8px] font-mono text-zinc-400 uppercase tracking-widest">
                    <i className="fa-regular fa-clock"></i>
                    {calculateReadTime(project.description)} min read
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-500 text-xs leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono text-zinc-500 dark:text-zinc-600 bg-white dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-100 dark:border-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-900 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <button
                    onClick={() => handleLike(project.id)}
                    className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 hover:text-rose-500 transition-colors"
                  >
                    <i className="fa-solid fa-heart"></i> {project.likes || 0}
                  </button>
                  <button
                    onClick={() => toggleComments(project.id)}
                    className={`flex items-center gap-1.5 text-[10px] font-mono transition-colors ${
                      activeComments === project.id
                        ? "text-indigo-500"
                        : "text-zinc-400 hover:text-indigo-500"
                    }`}
                  >
                    <i className="fa-solid fa-comment"></i>{" "}
                    {project.comments?.length || 0}
                  </button>
                </div>
                <a
                  href={project.link}
                  className="text-[10px] font-bold text-zinc-900 dark:text-white uppercase tracking-widest flex items-center gap-2 group/link"
                >
                  Launch{" "}
                  <i className="fa-solid fa-arrow-right -rotate-45 group-hover/link:rotate-0 transition-transform"></i>
                </a>
              </div>

              {/* Comments Section */}
              {activeComments === project.id && (
                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-900 space-y-4 animate-in fade-in duration-300">
                  <div className="max-h-40 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                    {project.comments?.length === 0 ? (
                      <p className="text-[9px] text-zinc-500 font-mono italic">
                        No transmissions yet. Start the conversation.
                      </p>
                    ) : (
                      project.comments.map((comment) => (
                        <div key={comment.id} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[8px] font-bold uppercase tracking-widest text-indigo-500">
                              {comment.author}
                            </span>
                            <span className="text-[7px] font-mono text-zinc-500">
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-600 dark:text-zinc-400 font-medium leading-tight">
                            {comment.text}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Post signal..."
                      value={commentInputs[project.id] || ""}
                      onChange={(e) =>
                        setCommentInputs({
                          ...commentInputs,
                          [project.id]: e.target.value,
                        })
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleAddComment(project.id)
                      }
                      className="flex-grow bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1.5 text-[10px] text-zinc-900 dark:text-white focus:border-indigo-500 outline-none transition-all"
                    />
                    <button
                      onClick={() => handleAddComment(project.id)}
                      className="bg-indigo-600 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all"
                    >
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
