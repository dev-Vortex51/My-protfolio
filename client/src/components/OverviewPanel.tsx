import React from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  stats: {
    uptime: string;
    commits: number;
    visitors: number;
    lighthouse: number;
  };
}

const visitorData = [
  { name: "Mon", uv: 4000 },
  { name: "Tue", uv: 3000 },
  { name: "Wed", uv: 2000 },
  { name: "Thu", uv: 2780 },
  { name: "Fri", uv: 1890 },
  { name: "Sat", uv: 2390 },
  { name: "Sun", uv: 3490 },
];

const OverviewPanel: React.FC<Props> = ({ stats }) => {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "HEALTH", val: "100%", color: "text-emerald-600" },
          { label: "UPTIME", val: stats.uptime, color: "text-zinc-400" },
          {
            label: "TRAFFIC",
            val: stats.visitors.toLocaleString(),
            color: "text-indigo-600",
          },
          { label: "BUILD", val: "3.1.0-A", color: "text-zinc-400" },
        ].map((card) => (
          <div
            key={card.label}
            className="p-4 md:p-6 bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg"
          >
            <div className="text-[8px] md:text-[10px] font-bold text-zinc-400 dark:text-zinc-600 mb-2 uppercase tracking-widest">
              {card.label}
            </div>
            <div className={`text-xl md:text-2xl font-bold mono ${card.color}`}>
              {card.val}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 md:p-8 shadow-sm">
          <h3 className="font-bold text-zinc-900 dark:text-white uppercase tracking-widest text-xs mb-8">
            Traffic Distribution
          </h3>
          <div className="h-62.5 md:h-75">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  stroke="#a1a1aa"
                  fontSize={10}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e4e4e7",
                    borderRadius: "4px",
                    fontSize: "10px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-sm">
          <h3 className="font-bold text-zinc-900 dark:text-white uppercase tracking-widest text-xs mb-6">
            System Log
          </h3>
          <div className="space-y-3 font-mono text-[9px] text-zinc-500 max-h-62.5 overflow-y-auto scrollbar-thin pr-2">
            <p>
              <span className="text-zinc-400 dark:text-zinc-700">
                [14:22:01]
              </span>{" "}
              <span className="text-indigo-500 uppercase">LOG:</span>{" "}
              identity_module_loaded
            </p>
            <p>
              <span className="text-zinc-400 dark:text-zinc-700">
                [14:22:05]
              </span>{" "}
              <span className="text-indigo-500 uppercase">LOG:</span>{" "}
              content_sync_start
            </p>
            <p>
              <span className="text-zinc-400 dark:text-zinc-700">
                [14:22:08]
              </span>{" "}
              <span className="text-emerald-500 uppercase">SUCCESS:</span>{" "}
              api_established
            </p>
            <p>
              <span className="text-zinc-400 dark:text-zinc-700">
                [14:22:12]
              </span>{" "}
              <span className="text-amber-500 uppercase">WARN:</span>{" "}
              disk_usage_high
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPanel;
