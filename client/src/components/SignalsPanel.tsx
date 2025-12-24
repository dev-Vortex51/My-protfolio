import { Message } from "@/lib/types";
import React from "react";

interface Props {
  messages: Message[];
  selectedMessage: Message | null;
  onReadMessage: (id: string) => void;
  onDeleteMessage: (id: string) => void;
  onMarkAllRead: () => void;
}

const SignalsPanel: React.FC<Props> = ({
  messages,
  selectedMessage,
  onReadMessage,
  onDeleteMessage,
  onMarkAllRead,
}) => {
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] items-start gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 w-full min-w-0">
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-900 pb-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest">
            Contact Messages
            {unreadCount > 0 && (
              <span className="ml-2 text-[10px] px-2 py-0.5 bg-indigo-600 text-white rounded">
                {unreadCount}
              </span>
            )}
          </h3>
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase hover:text-indigo-500"
            >
              Mark All as Read
            </button>
          )}
        </div>
        <div className="grid gap-3 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-1 min-w-0">
          {messages.length === 0 ? (
            <div className="p-12 text-center text-zinc-600 font-mono text-xs border border-dashed border-zinc-200 dark:border-zinc-800 rounded">
              No messages yet
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => onReadMessage(msg.id)}
                className={`bg-zinc-50 dark:bg-[#0c0c0e] border rounded-lg p-4 cursor-pointer ${
                  selectedMessage?.id === msg.id
                    ? "border-indigo-500/50 bg-indigo-500/5"
                    : "border-zinc-200 dark:border-zinc-800"
                } ${!msg.read ? "border-l-4 border-l-indigo-600" : ""}`}
              >
                <div className="flex justify-between items-center mb-1 gap-3">
                  <span
                    className={`text-[10px] font-bold uppercase break-words ${
                      !msg.read ? "text-indigo-400" : "text-zinc-400"
                    }`}
                  >
                    {msg.sender}
                  </span>
                  <span className="text-[8px] font-mono text-zinc-500 whitespace-nowrap">
                    {new Date(msg.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-[10px] font-mono text-zinc-400 break-words">
                  {msg.subject}
                </h4>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="space-y-6 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-1 min-w-0">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-900 pb-4">
          Message Details
        </h3>
        {selectedMessage ? (
          <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 space-y-8 animate-in fade-in">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                  From
                </label>
                <p className="text-xs font-bold text-zinc-900 dark:text-white uppercase">
                  {selectedMessage.sender}
                </p>
                <p className="text-[9px] font-mono text-indigo-400 break-words">
                  {selectedMessage.email}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                  Subject
                </label>
                <p className="text-xs font-bold text-zinc-900 dark:text-white break-words">
                  {selectedMessage.subject}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                  Priority
                </label>
                <span
                  className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase ${
                    selectedMessage.priority === "Urgent"
                      ? "border-red-500/20 text-red-500"
                      : selectedMessage.priority === "Normal"
                      ? "border-blue-500/20 text-blue-500"
                      : "border-zinc-500/20 text-zinc-500"
                  }`}
                >
                  {selectedMessage.priority}
                </span>
              </div>
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  Message
                </label>
                <div className="text-[10px] text-zinc-700 dark:text-zinc-400 font-mono bg-white dark:bg-black/40 p-4 rounded leading-relaxed whitespace-pre-wrap break-words">
                  {selectedMessage.body}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => onDeleteMessage(selectedMessage.id)}
                className="grow py-2 bg-red-600 text-white text-[10px] font-bold uppercase rounded hover:bg-red-500"
              >
                Delete Message
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-12 text-center">
            <p className="text-zinc-600 font-mono text-[9px] uppercase">
              Select a message to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignalsPanel;
