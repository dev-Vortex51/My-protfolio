import React from "react";

export type Tab =
  | "overview"
  | "identity"
  | "repositories"
  | "arsenal"
  | "timeline"
  | "testimonials"
  | "signals";

interface NavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  unreadCount: number;
}

const AdminNav: React.FC<NavProps> = ({
  activeTab,
  setActiveTab,
  unreadCount,
}) => {
  const navItems: { id: Tab; label: string; icon: string; count?: number }[] = [
    { id: "overview", label: "Monitor", icon: "fa-chart-line" },
    { id: "identity", label: "Identity", icon: "fa-id-badge" },
    { id: "repositories", label: "Repos", icon: "fa-code-branch" },
    { id: "timeline", label: "History", icon: "fa-timeline" },
    { id: "arsenal", label: "Arsenal", icon: "fa-microchip" },
    { id: "testimonials", label: "Testimonials", icon: "fa-comments" },
    {
      id: "signals",
      label: "Signals",
      icon: "fa-envelope",
      count: unreadCount,
    },
  ];

  return (
    <div className="flex border-b border-zinc-200 dark:border-zinc-800 gap-4 md:gap-8 overflow-x-auto pb-px scrollbar-hide">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`pb-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 whitespace-nowrap relative shrink-0 ${
            activeTab === item.id
              ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
              : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <i className={`fa-solid ${item.icon}`}></i>
          {item.label}
          {item.count ? (
            <span className="ml-1 px-1.5 py-0.5 bg-indigo-600 text-white rounded-full text-[8px]">
              {item.count}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
};

export default AdminNav;
