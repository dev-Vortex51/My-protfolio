import React, { useState } from "react";

interface Props {
  onLogin: (credentials: {
    email: string;
    password: string;
  }) => Promise<boolean>;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const ok = await onLogin({ email, password });
      if (!ok) {
        setError("AUTHENTICATION FAILED // INVALID CREDENTIALS");
        setPassword("");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "CONNECTION ERROR // RETRY"
      );
      setPassword("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4  md:pt-32 pb-12">
      <div className="w-full max-w-xl space-y-6">
        {/* Header */}
        <div className="space-y-3">
          {/* <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] tracking-widest uppercase">
            <i className="fa-solid fa-shield-halved text-xs"></i>
            <span>SECURE ACCESS</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
            ADMIN
            <br />
            <span className="text-zinc-300 dark:text-zinc-700">PORTAL</span>
          </h1> */}
          <p className="text-zinc-600 dark:text-zinc-400 font-mono uppercase text-[10px] tracking-widest text-center">
            Enter credentials to access system controls
          </p>
        </div>

        {/* Terminal-style Login Form */}
        <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 md:p-8 space-y-6 shadow-xl dark:shadow-none">
          {error && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-500/50 rounded px-4 py-3 font-mono text-xs text-red-600 dark:text-red-400 uppercase tracking-wider">
              <i className="fa-solid fa-triangle-exclamation mr-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest font-mono">
                User Identifier
              </label>
              <div className="relative">
                <i className="fa-solid fa-user absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  placeholder="admin@system.local"
                  className={`w-full bg-white dark:bg-black border ${
                    error
                      ? "border-red-500"
                      : "border-zinc-200 dark:border-zinc-800"
                  } rounded px-3 pl-9 py-2.5 text-zinc-900 dark:text-white font-mono text-xs focus:border-indigo-500 outline-none`}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest font-mono">
                Access Key
              </label>
              <div className="relative">
                <i className="fa-solid fa-key absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  placeholder="••••••••••••"
                  className={`w-full bg-white dark:bg-black border ${
                    error
                      ? "border-red-500"
                      : "border-zinc-200 dark:border-zinc-800"
                  } rounded px-3 pl-9 py-2.5 text-zinc-900 dark:text-white font-mono text-xs focus:border-indigo-500 outline-none`}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-[10px] uppercase tracking-[0.3em] py-3 rounded flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i>
                  AUTHENTICATING
                </>
              ) : (
                <>
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  AUTHORIZE ACCESS
                </>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-900 flex items-center justify-between text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
            <span>
              <i className="fa-solid fa-shield-halved mr-1"></i>
              SSL ENCRYPTED
            </span>
            <span>
              <i className="fa-solid fa-clock mr-1"></i>
              SESSION TIMEOUT: 24H
            </span>
          </div>
        </div>

        {/* System Info */}
        <div className="flex flex-wrap gap-4 justify-center text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
          <span>BUILD_2024.0.1</span>
          <span className="text-zinc-300 dark:text-zinc-800">|</span>
          <span>VORTEX_AUTH_v2</span>
          <span className="text-zinc-300 dark:text-zinc-800">|</span>
          <span className="text-indigo-500">SECURE_CHANNEL</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
