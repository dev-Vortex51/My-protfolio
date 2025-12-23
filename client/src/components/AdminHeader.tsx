import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onLogout: () => void;
}

const AdminHeader: React.FC<Props> = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">
          Vortex <span className="text-indigo-600">Control Center</span>
        </h1>
        <p className="text-zinc-500 text-sm font-medium">
          Global system parameter management.
        </p>
      </div>
      <div className="flex gap-2 text-[8px] md:text-[10px] font-mono">
        <button
          onClick={() => navigate("/")}
          className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded uppercase hover:bg-zinc-200 dark:hover:bg-zinc-700"
        >
          Portfolio
        </button>
        <button
          onClick={onLogout}
          className="px-3 py-1 bg-red-500/10 text-red-600 dark:text-red-500 border border-red-500/20 rounded uppercase hover:bg-red-500/20"
        >
          Logout
        </button>
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-500/20 rounded">
          SESSION:STABLE
        </span>
        <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded uppercase">
          v1.2.4-A
        </span>
      </div>
    </div>
  );
};

export default AdminHeader;
