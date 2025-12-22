import { PortfolioData, Language } from "@/lib/types";
import React from "react";

interface Props {
  data: PortfolioData;
  isRefining: boolean;
  onUpdateField: (field: keyof PortfolioData, value: any) => void;
  onUpdateStat: (field: string, value: any) => void;
  onUpdateLanguage: (id: string, updates: Partial<Language>) => void;
  onAddLanguage: () => void;
  onDeleteLanguage: (id: string) => void;
  onUpdateSocialLink: (platform: string, value: string) => void;
  onRefineBio: () => void;
  onSaveAll: () => void;
  isSaving: boolean;
}

const IdentityPanel: React.FC<Props> = ({
  data,
  isRefining,
  onUpdateField,
  onUpdateStat,
  onUpdateLanguage,
  onAddLanguage,
  onDeleteLanguage,
  onUpdateSocialLink,
  onRefineBio,
  onSaveAll,
  isSaving,
}) => {
  return (
    <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 md:p-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-4">
            Profile Metadata
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                Display Label
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => onUpdateField("name", e.target.value)}
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                Operational Role
              </label>
              <input
                type="text"
                value={data.role}
                onChange={(e) => onUpdateField("role", e.target.value)}
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                Hero Headline
              </label>
              <input
                type="text"
                value={data.headline || ""}
                onChange={(e) => onUpdateField("headline", e.target.value)}
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono focus:border-indigo-500 outline-none"
                placeholder="ENGINEERING FOR THE INFINITE SCALE"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                Hero Tagline
              </label>
              <textarea
                value={data.tagline || ""}
                onChange={(e) => onUpdateField("tagline", e.target.value)}
                rows={3}
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono text-sm focus:border-indigo-500 outline-none resize-none"
                placeholder="Architecting robust digital infrastructure..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                Geographic Link
              </label>
              <input
                type="text"
                value={data.location}
                onChange={(e) => onUpdateField("location", e.target.value)}
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                Communication Channel
              </label>
              <input
                type="text"
                value={data.email}
                onChange={(e) => onUpdateField("email", e.target.value)}
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-4">
            Live Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                Uptime Record
              </label>
              <input
                type="text"
                value={data.stats.uptime}
                onChange={(e) => onUpdateStat("uptime", e.target.value)}
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                Commit Count
              </label>
              <input
                type="number"
                value={data.stats.commits}
                onChange={(e) =>
                  onUpdateStat("commits", parseInt(e.target.value))
                }
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                Total Traffic
              </label>
              <input
                type="number"
                value={data.stats.visitors}
                onChange={(e) =>
                  onUpdateStat("visitors", parseInt(e.target.value))
                }
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                Performance (LH)
              </label>
              <input
                type="number"
                value={data.stats.lighthouse}
                onChange={(e) =>
                  onUpdateStat("lighthouse", parseInt(e.target.value))
                }
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Natural Languages
            </h3>
            <button
              onClick={onAddLanguage}
              className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase hover:text-indigo-500"
            >
              + Add
            </button>
          </div>
          <div className="space-y-3">
            {data.languages?.map((lang) => (
              <div
                key={lang.id}
                className="flex items-center gap-3 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2"
              >
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) =>
                    onUpdateLanguage(lang.id, { name: e.target.value })
                  }
                  className="flex-1 bg-transparent text-zinc-900 dark:text-white text-sm outline-none"
                  placeholder="Language"
                />
                <select
                  value={lang.proficiency}
                  onChange={(e) =>
                    onUpdateLanguage(lang.id, {
                      proficiency: e.target.value as any,
                    })
                  }
                  className="bg-transparent border-l border-zinc-200 dark:border-zinc-800 pl-3 text-zinc-600 dark:text-zinc-400 text-xs outline-none"
                >
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Limited">Limited</option>
                </select>
                <button
                  onClick={() => onDeleteLanguage(lang.id)}
                  className="text-zinc-500 hover:text-red-500 transition-colors"
                >
                  <i className="fa-solid fa-times text-xs"></i>
                </button>
              </div>
            ))}
            {(!data.languages || data.languages.length === 0) && (
              <p className="text-xs text-zinc-500 italic">No languages added</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-4">
            External Links
          </h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                <i className="fa-brands fa-github"></i> GitHub
              </label>
              <input
                type="url"
                value={data.socialLinks?.github || ""}
                onChange={(e) => onUpdateSocialLink("github", e.target.value)}
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm focus:border-indigo-500 outline-none"
                placeholder="github.com/username"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                <i className="fa-brands fa-linkedin"></i> LinkedIn
              </label>
              <input
                type="url"
                value={data.socialLinks?.linkedin || ""}
                onChange={(e) => onUpdateSocialLink("linkedin", e.target.value)}
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm focus:border-indigo-500 outline-none"
                placeholder="linkedin.com/in/username"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                <i className="fa-brands fa-twitter"></i> Twitter
              </label>
              <input
                type="url"
                value={data.socialLinks?.twitter || ""}
                onChange={(e) => onUpdateSocialLink("twitter", e.target.value)}
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm focus:border-indigo-500 outline-none"
                placeholder="twitter.com/username"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                <i className="fa-solid fa-globe"></i> Website
              </label>
              <input
                type="url"
                value={data.socialLinks?.website || ""}
                onChange={(e) => onUpdateSocialLink("website", e.target.value)}
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white text-sm focus:border-indigo-500 outline-none"
                placeholder="yourwebsite.com"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSaveAll}
          disabled={isSaving}
          className="px-6 py-3 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-indigo-500 disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default IdentityPanel;
