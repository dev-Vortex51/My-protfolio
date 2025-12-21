
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
    <div className="relative w-10 h-10">
      {/* Background Frame */}
      <div className="absolute inset-0 border border-zinc-800 rounded-lg group-hover:border-indigo-500/50 transition-colors duration-500"></div>
      
      {/* Minimalist "V" Monogram */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 40 40" className="w-6 h-6 fill-none stroke-current text-white group-hover:text-indigo-400 transition-colors duration-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 12L20 28L30 12" />
        </svg>
      </div>
      
      {/* Animated corner accent */}
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100"></div>
    </div>
    
    <div className="flex flex-col leading-none">
      <span className="text-sm font-bold tracking-widest text-white uppercase group-hover:translate-x-1 transition-transform duration-500">
        Vortex<span className="text-indigo-500">.</span>
      </span>
      <span className="text-[8px] font-mono text-zinc-500 mt-1 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500">
        Studio
      </span>
    </div>
  </div>
);

export default Logo;
