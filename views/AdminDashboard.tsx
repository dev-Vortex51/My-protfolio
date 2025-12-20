
import React, { useState } from 'react';
import { PortfolioData, Project, Experience, Skill, Message } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { refineText, suggestTags } from '../services/gemini';

interface Props {
  data: PortfolioData;
  onUpdate: (data: PortfolioData) => void;
}

type Tab = 'overview' | 'identity' | 'repositories' | 'arsenal' | 'timeline' | 'signals';

const AdminDashboard: React.FC<Props> = ({ data, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isRefining, setIsRefining] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  const visitorData = [
    { name: 'Mon', uv: 4000 },
    { name: 'Tue', uv: 3000 },
    { name: 'Wed', uv: 2000 },
    { name: 'Thu', uv: 2780 },
    { name: 'Fri', uv: 1890 },
    { name: 'Sat', uv: 2390 },
    { name: 'Sun', uv: 3490 },
  ];

  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const handleUpdateField = (field: keyof PortfolioData, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  // --- REPOS MANAGEMENT ---
  const handleAddProject = () => {
    const newProj: Project = {
      id: Math.random().toString(36).substr(2, 9),
      title: "NEW_REPOSITORY",
      description: "Initialize module description...",
      tags: ["TypeScript"],
      link: "#",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      featured: false,
      status: 'beta',
      version: 'v0.0.1',
      likes: 0,
      comments: []
    };
    handleUpdateField('projects', [newProj, ...data.projects]);
    setEditingProject(newProj);
  };

  const handleSaveProject = (proj: Project) => {
    const updated = data.projects.map(p => p.id === proj.id ? proj : p);
    handleUpdateField('projects', updated);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Terminate repository record?")) {
      handleUpdateField('projects', data.projects.filter(p => p.id !== id));
    }
  };

  const handleAiSuggestTags = async (description: string, id: string) => {
    setIsRefining(`tags-${id}`);
    const suggested = await suggestTags(description);
    if (editingProject && editingProject.id === id) {
      setEditingProject({ ...editingProject, tags: suggested });
    }
    setIsRefining(null);
  };

  // --- HISTORY MANAGEMENT ---
  const handleAddExperience = () => {
    const newExp: Experience = {
      id: Math.random().toString(36).substr(2, 9),
      company: "NEW_ORGANIZATION",
      role: "ROLE_NAME",
      period: "2024 - PRESENT",
      description: "Operational duties description..."
    };
    handleUpdateField('experiences', [newExp, ...data.experiences]);
    setEditingExperience(newExp);
  };

  const handleSaveExperience = (exp: Experience) => {
    const updated = data.experiences.map(e => e.id === exp.id ? exp : e);
    handleUpdateField('experiences', updated);
    setEditingExperience(null);
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm("Purge historical record?")) {
      handleUpdateField('experiences', data.experiences.filter(e => e.id !== id));
    }
  };

  // --- ARSENAL (SKILLS) ---
  const handleUpdateSkill = (skillId: string, updates: Partial<Skill>) => {
    const updatedSkills = data.skills.map(s => s.id === skillId ? { ...s, ...updates } : s);
    handleUpdateField('skills', updatedSkills);
  };

  const handleDeleteSkill = (skillId: string) => {
    handleUpdateField('skills', data.skills.filter(s => s.id !== skillId));
  };

  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'NEW_MODULE',
      level: 50,
      category: 'frontend',
      pid: Math.floor(1000 + Math.random() * 8999).toString()
    };
    handleUpdateField('skills', [...data.skills, newSkill]);
  };

  // --- SIGNALS (MESSAGES) ---
  const handleReadMessage = (id: string) => {
    const msg = data.messages.find(m => m.id === id);
    if (msg) {
      setSelectedMessage(msg);
      if (!msg.read) {
        const updated = data.messages.map(m => m.id === id ? { ...m, read: true } : m);
        handleUpdateField('messages', updated);
      }
    }
  };

  const handleDeleteMessage = (id: string) => {
    handleUpdateField('messages', data.messages.filter(m => m.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const handleAiRefine = async (field: string, text: string, context: string) => {
    setIsRefining(field);
    const refined = await refineText(text, context);
    if (field === 'bio') handleUpdateField('bio', refined);
    setIsRefining(null);
  };

  const navItems: { id: Tab; label: string; icon: string; count?: number }[] = [
    { id: 'overview', label: 'Monitor', icon: 'fa-chart-line' },
    { id: 'identity', label: 'Identity', icon: 'fa-id-badge' },
    { id: 'repositories', label: 'Repos', icon: 'fa-code-branch' },
    { id: 'timeline', label: 'History', icon: 'fa-timeline' },
    { id: 'arsenal', label: 'Arsenal', icon: 'fa-microchip' },
    { id: 'signals', label: 'Signals', icon: 'fa-envelope', count: data.messages.filter(m => !m.read).length },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 space-y-8 mt-16 md:mt-24 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight uppercase tracking-tighter">Vortex <span className="text-indigo-600">Control Center</span></h1>
          <p className="text-zinc-500 text-sm font-medium">Global system parameter management.</p>
        </div>
        <div className="flex gap-2 text-[8px] md:text-[10px] font-mono">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-500/20 rounded">SESSION:STABLE</span>
          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded uppercase">v1.2.4-A</span>
        </div>
      </div>

      {/* Internal Navigation */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 gap-4 md:gap-8 overflow-x-auto pb-px scrollbar-hide">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`pb-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 whitespace-nowrap relative shrink-0 ${
              activeTab === item.id ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon}`}></i>
            {item.label}
            {item.count ? (
              <span className="ml-1 px-1.5 py-0.5 bg-indigo-600 text-white rounded-full text-[8px]">{item.count}</span>
            ) : null}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "HEALTH", val: "100%", color: "text-emerald-600" },
              { label: "UPTIME", val: data.stats.uptime, color: "text-zinc-400" },
              { label: "TRAFFIC", val: data.stats.visitors.toLocaleString(), color: "text-indigo-600" },
              { label: "BUILD", val: "3.1.0-A", color: "text-zinc-400" }
            ].map(card => (
              <div key={card.label} className="p-4 md:p-6 bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <div className="text-[8px] md:text-[10px] font-bold text-zinc-400 dark:text-zinc-600 mb-2 uppercase tracking-widest">{card.label}</div>
                <div className={`text-xl md:text-2xl font-bold mono ${card.color}`}>{card.val}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 md:p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-zinc-900 dark:text-white uppercase tracking-widest text-xs">Traffic Distribution</h3>
              </div>
              <div className="h-[250px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitorData}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#a1a1aa" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '4px', fontSize: '10px' }}
                    />
                    <Area type="monotone" dataKey="uv" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-zinc-900 dark:text-white uppercase tracking-widest text-xs mb-6">System Log</h3>
              <div className="space-y-3 font-mono text-[9px] text-zinc-500 max-h-[250px] overflow-y-auto scrollbar-thin pr-2">
                <p><span className="text-zinc-400 dark:text-zinc-700">[14:22:01]</span> <span className="text-indigo-500 uppercase">LOG:</span> identity_module_loaded</p>
                <p><span className="text-zinc-400 dark:text-zinc-700">[14:22:05]</span> <span className="text-indigo-500 uppercase">LOG:</span> content_sync_start</p>
                <p><span className="text-zinc-400 dark:text-zinc-700">[14:22:08]</span> <span className="text-emerald-500 uppercase">SUCCESS:</span> api_established</p>
                <p><span className="text-zinc-400 dark:text-zinc-700">[14:22:12]</span> <span className="text-amber-500 uppercase">WARN:</span> threshold_reached</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs like identity, repositories, arsenal etc should similarly adapt. 
          Specifically for repositories and timelines, ensure grid layouts are stacking. */}
      {activeTab === 'repositories' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-xs md:text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Repository Orchestration</h3>
            <button 
              onClick={handleAddProject}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded"
            >
              New Repo
            </button>
          </div>
          <div className="grid gap-4">
            {data.projects.map((project) => (
              <div key={project.id} className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 md:p-6 flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-center text-indigo-500 shrink-0">
                    <i className="fa-solid fa-cube"></i>
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-zinc-900 dark:text-white font-bold uppercase tracking-tight truncate">{project.title}</h4>
                    <p className="text-zinc-500 text-[10px] font-mono truncate">{project.version} // {project.status}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => setEditingProject(project)} className="p-2 text-zinc-400 hover:text-indigo-600"><i className="fa-solid fa-pen-to-square"></i></button>
                  <button onClick={() => handleDeleteProject(project.id)} className="p-2 text-zinc-400 hover:text-red-500"><i className="fa-solid fa-trash-can"></i></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add similar logic for other tabs, ensuring grid columns stack or scroll */}
      {activeTab === 'signals' && (
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-900 pb-4">Incoming Communications</h3>
            <div className="grid gap-3">
              {data.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  onClick={() => handleReadMessage(msg.id)}
                  className={`bg-zinc-50 dark:bg-[#0c0c0e] border rounded-lg p-4 cursor-pointer transition-all ${selectedMessage?.id === msg.id ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-zinc-200 dark:border-zinc-800'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-zinc-900 dark:text-white uppercase">{msg.sender}</span>
                    <span className="text-[8px] font-mono text-zinc-500">{new Date(msg.timestamp).toLocaleDateString()}</span>
                  </div>
                  <h4 className="text-[10px] font-mono text-zinc-400 truncate">{msg.subject}</h4>
                </div>
              ))}
            </div>
          </div>
          {selectedMessage && (
            <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[8px] font-mono text-zinc-500 uppercase">From</label>
                  <p className="text-xs font-bold text-white uppercase">{selectedMessage.sender}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-mono text-zinc-500 uppercase">Payload</label>
                  <div className="text-[10px] text-zinc-400 font-mono bg-black/20 p-4 rounded leading-relaxed">{selectedMessage.body}</div>
                </div>
              </div>
              <button 
                onClick={() => handleDeleteMessage(selectedMessage.id)}
                className="w-full py-2 border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold uppercase text-red-500 hover:bg-red-500/10 rounded"
              >
                Purge Record
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
