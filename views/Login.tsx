
import React, { useState } from 'react';

interface Props {
  onLogin: (password: string) => boolean;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(password)) {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="glass p-8 rounded-3xl w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-lock text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Access</h2>
          <p className="text-slate-400 text-sm">Enter password to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter password (hint: admin)"
              className={`w-full bg-slate-900 border ${error ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all`}
            />
            {error && <p className="text-xs text-red-500">Invalid credentials. Please try again.</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
          >
            Authorize
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
