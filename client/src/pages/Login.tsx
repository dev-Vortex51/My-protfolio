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
        setError("Invalid credentials. Please try again.");
        setPassword("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setPassword("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-12 min-h-[80vh] px-4">
      <div className="glass p-8 rounded-3xl w-full md:max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-lock text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Access</h2>
          <p className="text-slate-400 text-sm">
            Use your admin email and password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              placeholder="you@example.com"
              className={`w-full bg-slate-900 border ${
                error ? "border-red-500" : "border-slate-800"
              } rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all`}
              required
            />
          </div>

          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              placeholder="Enter password"
              className={`w-full bg-slate-900 border ${
                error ? "border-red-500" : "border-slate-800"
              } rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all`}
              required
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
          >
            {isSubmitting ? "Authorizing..." : "Authorize"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
