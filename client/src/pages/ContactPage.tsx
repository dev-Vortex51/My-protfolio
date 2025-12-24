import React, { useState } from "react";
import { PortfolioData } from "../lib/types";
import { sendContactMessage } from "../services/api";

interface Props {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

const ContactPage: React.FC<Props> = ({ data, onUpdate }) => {
  const [status, setStatus] = useState<"idle" | "transmitting" | "sent">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "Normal" as "Low" | "Normal" | "Urgent",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("transmitting");
    setError(null);

    try {
      const response = await sendContactMessage({
        sender: formData.name,
        email: formData.email,
        subject: formData.subject,
        body: formData.message,
        priority: formData.priority,
      });

      // Add the new message to the state immediately
      const newMessage = {
        id: response.id || Date.now().toString(),
        sender: formData.name,
        email: formData.email,
        subject: formData.subject,
        body: formData.message,
        priority: formData.priority,
        timestamp: new Date().toISOString(),
        read: false,
      };

      onUpdate({
        ...data,
        messages: [newMessage, ...data.messages],
      });

      setStatus("sent");
      setFormData({
        name: "",
        email: "",
        subject: "",
        priority: "Normal",
        message: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
      setStatus("idle");
    }
  };

  return (
    <div className="max-w-350 mx-auto px-4 md:px-6 lg:px-12 pt-24 md:pt-32 pb-32 grid lg:grid-cols-[1fr_400px] gap-12 md:gap-20">
      <div className="space-y-8 md:space-y-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-500 font-mono text-[10px] tracking-widest uppercase">
            <span className="w-8 h-px bg-indigo-500"></span>
            Establish Secure Communication
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-zinc-900 dark:text-white leading-none">
            GET IN{" "}
            <span className="text-zinc-300 dark:text-zinc-700">TOUCH</span>
            <span className="text-indigo-500">.</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl font-medium leading-relaxed">
            Direct channel for collaboration requests, technical inquiries, or
            system feedback.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 md:space-y-8 bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 p-6 md:p-12 rounded-lg relative overflow-hidden shadow-sm dark:shadow-none"
        >
          {status === "sent" && (
            <div className="absolute inset-0 bg-white/95 dark:bg-black/90 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-6 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                <i className="fa-solid fa-check text-2xl"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">
                TRANSMISSION SUCCESSFUL
              </h3>
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                Message logged. <br /> Response: 24-48 cycles.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-widest"
              >
                Send Another
              </button>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                Identity / Name
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ex. John Doe"
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono text-sm focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                Address / Email
              </label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Ex. mail@host.com"
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono text-sm focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                Subject
              </label>
              <input
                required
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                placeholder="Project Proposal"
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono text-sm focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as "Normal" as
                      | "Low"
                      | "Normal"
                      | "Urgent",
                  })
                }
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono text-sm focus:border-indigo-500 outline-none appearance-none"
              >
                <option>Low</option>
                <option>Normal</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
              Payload
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Detailed details..."
              className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono text-sm focus:border-indigo-500 outline-none resize-none"
            />
          </div>

          <button
            disabled={status === "transmitting"}
            className="group relative w-full h-12 md:h-14 bg-indigo-600 text-white font-black text-[10px] md:text-xs uppercase tracking-[0.3em] overflow-hidden rounded active:scale-95 disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {status === "transmitting" ? (
                <>
                  Transmitting{" "}
                  <i className="fa-solid fa-spinner animate-spin"></i>
                </>
              ) : (
                <>
                  Execute Signal <i className="fa-solid fa-paper-plane"></i>
                </>
              )}
            </span>
          </button>
        </form>
      </div>

      <div className="space-y-8 md:space-y-12">
        <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 md:p-8 space-y-8 shadow-sm dark:shadow-none">
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              Locations
            </h4>
            <p className="text-zinc-900 dark:text-white font-bold text-sm">
              {data.location}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              Direct
            </h4>
            <p className="text-zinc-900 dark:text-white font-bold text-sm">
              {data.email}
            </p>
          </div>
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-900 space-y-4">
            <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              Social Matrix
            </h4>
            <div className="flex flex-col gap-4 font-mono text-xs">
              <a
                href="#"
                className="flex items-center justify-between text-zinc-500 hover:text-zinc-900 dark:hover:text-white group transition-colors"
              >
                <span>LinkedIn</span>
                <i className="fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform"></i>
              </a>
              <a
                href="#"
                className="flex items-center justify-between text-zinc-500 hover:text-zinc-900 dark:hover:text-white group transition-colors"
              >
                <span>GitHub</span>
                <i className="fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
