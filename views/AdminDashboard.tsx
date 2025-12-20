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

  const handleUpdateField = (field: keyof PortfolioData, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  // --- REPOS MANAGEMENT ---
  const handleAddProject = () => {
    // Fix: Added missing required properties 'likes' and 'comments' to match Project interface
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
    <div className="max-w-[1400px] mx-auto px-6 py-12 space-y-8 mt-24 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight uppercase tracking-tighter">Vortex <span className="text-indigo-600">Control Center</span></h1>
          <p className="text-zinc-500 font-medium">Global system parameter management and data orchestration.</p>
        </div>
        <div className="flex gap-2 text-[10px] font-mono">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-500/20 rounded">SESSION:STABLE</span>
          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded uppercase">v1.2.4-A</span>
        </div>
      </div>

      {/* Internal Navigation */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 gap-8 overflow-x-auto pb-px">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`pb-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 whitespace-nowrap relative ${
              activeTab === item.id ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon}`}></i>
            {item.label}
            {item.count ? (
              <span className="absolute -top-1 -right-4 px-1.5 py-0.5 bg-indigo-600 text-white rounded-full text-[8px] animate-pulse">{item.count}</span>
            ) : null}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: "SYSTEM_HEALTH", val: "100%", color: "text-emerald-600 dark:text-emerald-500" },
              { label: "UPTIME_RECORD", val: data.stats.uptime, color: "text-zinc-400 dark:text-zinc-500" },
              { label: "TRAFFIC_LOAD", val: data.stats.visitors.toLocaleString(), color: "text-indigo-600 dark:text-indigo-400" },
              { label: "BUILD_VERSION", val: "3.1.0-A", color: "text-zinc-400 dark:text-zinc-500" }
            ].map(card => (
              <div key={card.label} className="p-6 bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm dark:shadow-none">
                <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 mb-2 uppercase tracking-widest">{card.label}</div>
                <div className={`text-2xl font-bold mono ${card.color}`}>{card.val}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 shadow-sm dark:shadow-none">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-zinc-900 dark:text-white uppercase tracking-widest text-sm">Traffic Distribution</h3>
                <span className="text-xs text-zinc-500">Last 7 Cycles</span>
              </div>
              <div className="h-[300px]">
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
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '4px', fontSize: '12px', color: '#09090b' }}
                      itemStyle={{ color: '#6366f1' }}
                    />
                    <Area type="monotone" dataKey="uv" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-sm dark:shadow-none">
              <h3 className="font-bold text-zinc-900 dark:text-white uppercase tracking-widest text-xs mb-6">Recent Log Output</h3>
              <div className="space-y-3 font-mono text-[9px] text-zinc-500 max-h-[300px] overflow-y-auto">
                <p><span className="text-zinc-400 dark:text-zinc-700">[14:22:01]</span> <span className="text-indigo-500 uppercase">LOG:</span> identity_module_loaded</p>
                <p><span className="text-zinc-400 dark:text-zinc-700">[14:22:05]</span> <span className="text-indigo-500 uppercase">LOG:</span> content_sync_start: true</p>
                <p><span className="text-zinc-400 dark:text-zinc-700">[14:22:08]</span> <span className="text-emerald-500 uppercase">SUCCESS:</span> gemini_api_connection: established</p>
                <p><span className="text-zinc-400 dark:text-zinc-700">[14:22:12]</span> <span className="text-amber-500 uppercase">WARN:</span> disk_usage_near_threshold: /dev/null</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'identity' && (
        <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">Public Label</label>
              <input 
                type="text" 
                value={data.name} 
                onChange={e => handleUpdateField('name', e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">Operational Role</label>
              <input 
                type="text" 
                value={data.role} 
                onChange={e => handleUpdateField('role', e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>
          <div className="space-y-2 relative">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">Core Bio / Manifest</label>
              <button 
                onClick={() => handleAiRefine('bio', data.bio, 'professional software architect bio')}
                disabled={isRefining === 'bio'}
                className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors flex items-center gap-1"
              >
                {isRefining === 'bio' ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-sparkles"></i>}
                Refine with AI
              </button>
            </div>
            <textarea 
              value={data.bio} 
              onChange={e => handleUpdateField('bio', e.target.value)}
              rows={4}
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-zinc-900 dark:text-white mono focus:border-indigo-500 outline-none resize-none transition-all"
            />
          </div>
        </div>
      )}

      {activeTab === 'repositories' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Repository Orchestration</h3>
            <button 
              onClick={handleAddProject}
              className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20"
            >
              Initialize New Repo
            </button>
          </div>
          
          {editingProject ? (
            <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-indigo-500/50 rounded-lg p-8 space-y-6">
              <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Configure Repository: {editingProject.id}</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  value={editingProject.title} 
                  onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white mono text-sm"
                  placeholder="Title"
                />
                <input 
                  type="text" 
                  value={editingProject.version} 
                  onChange={e => setEditingProject({...editingProject, version: e.target.value})}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white mono text-sm"
                  placeholder="Version"
                />
              </div>
              <textarea 
                value={editingProject.description} 
                onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white mono text-sm resize-none"
                rows={3}
                placeholder="Description"
              />
              <div className="flex gap-4">
                <button 
                  onClick={() => handleSaveProject(editingProject)}
                  className="px-6 py-2 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest rounded"
                >
                  Confirm Push
                </button>
                <button 
                  onClick={() => setEditingProject(null)}
                  className="px-6 py-2 bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest rounded"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleAiSuggestTags(editingProject.description, editingProject.id)}
                  disabled={isRefining === `tags-${editingProject.id}`}
                  className="px-6 py-2 border border-indigo-500 text-indigo-500 text-[10px] font-bold uppercase tracking-widest rounded hover:bg-indigo-500/10"
                >
                  {isRefining === `tags-${editingProject.id}` ? "Suggesting..." : "Suggest Tags with AI"}
                </button>
              </div>
            </div>
          ) : null}

          <div className="grid gap-4">
            {data.projects.map((project) => (
              <div key={project.id} className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 flex flex-col md:flex-row justify-between gap-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-center text-indigo-500 shadow-sm">
                    <i className="fa-solid fa-cube"></i>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-zinc-900 dark:text-white font-bold uppercase tracking-tight">{project.title}</h4>
                    <p className="text-zinc-500 text-xs font-mono">{project.version} // {project.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setEditingProject(project)}
                    className="text-zinc-400 dark:text-zinc-600 hover:text-indigo-600 dark:hover:text-white transition-colors p-2"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-zinc-400 dark:text-zinc-600 hover:text-red-500 transition-colors p-2"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Chronological Records</h3>
            <button 
              onClick={handleAddExperience}
              className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20"
            >
              Push New Entry
            </button>
          </div>

          {editingExperience ? (
            <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-indigo-500/50 rounded-lg p-8 space-y-6">
              <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Calibrate Chronology: {editingExperience.id}</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  value={editingExperience.company} 
                  onChange={e => setEditingExperience({...editingExperience, company: e.target.value})}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white mono text-sm"
                  placeholder="Company"
                />
                <input 
                  type="text" 
                  value={editingExperience.role} 
                  onChange={e => setEditingExperience({...editingExperience, role: e.target.value})}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white mono text-sm"
                  placeholder="Role"
                />
              </div>
              <input 
                type="text" 
                value={editingExperience.period} 
                onChange={e => setEditingExperience({...editingExperience, period: e.target.value})}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white mono text-sm"
                placeholder="Period (e.g. 2022 - PRESENT)"
              />
              <textarea 
                value={editingExperience.description} 
                onChange={e => setEditingExperience({...editingExperience, description: e.target.value})}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-4 py-2 text-zinc-900 dark:text-white mono text-sm resize-none"
                rows={3}
              />
              <div className="flex gap-4">
                <button 
                  onClick={() => handleSaveExperience(editingExperience)}
                  className="px-6 py-2 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest rounded"
                >
                  Commit Entry
                </button>
                <button 
                  onClick={() => setEditingExperience(null)}
                  className="px-6 py-2 bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest rounded"
                >
                  Abort
                </button>
              </div>
            </div>
          ) : null}

          <div className="space-y-4">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 flex justify-between items-center group">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-indigo-600 dark:text-indigo-500 uppercase font-bold tracking-widest">{exp.period}</div>
                  <h4 className="text-zinc-900 dark:text-white font-bold">{exp.role} @ {exp.company}</h4>
                </div>
                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => setEditingExperience(exp)}
                    className="text-zinc-400 dark:text-zinc-600 hover:text-indigo-600 dark:hover:text-white transition-colors p-2"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button 
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="text-zinc-400 dark:text-zinc-600 hover:text-red-500 transition-colors p-2"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'arsenal' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Weaponry & Arsenal</h3>
            <button 
              onClick={handleAddSkill}
              className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20"
            >
              Calibrate New Tool
            </button>
          </div>
          <div className="grid gap-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-6">
                    <span className="text-zinc-400 dark:text-zinc-700 font-mono text-[10px]">PID:{skill.pid}</span>
                    <input 
                      type="text" 
                      value={skill.name}
                      onChange={e => handleUpdateSkill(skill.id, { name: e.target.value })}
                      className="bg-transparent text-zinc-900 dark:text-white font-bold uppercase focus:outline-none border-b border-transparent focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <select 
                      value={skill.category}
                      onChange={e => handleUpdateSkill(skill.id, { category: e.target.value as any })}
                      className="bg-white dark:bg-zinc-950 text-zinc-500 text-[10px] font-mono border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 uppercase"
                    >
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="devops">DevOps</option>
                      <option value="other">Other</option>
                    </select>
                    <button 
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="text-zinc-300 dark:text-zinc-700 hover:text-red-500 transition-colors p-2"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex-grow h-1.5 bg-zinc-200 dark:bg-zinc-950 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${skill.level}%` }}></div>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={skill.level}
                    onChange={e => handleUpdateSkill(skill.id, { level: parseInt(e.target.value) })}
                    className="w-32 accent-indigo-500"
                  />
                  <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 w-8">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'signals' && (
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-900 pb-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Incoming Communications</h3>
              <div className="flex gap-2">
                 <span className="text-[10px] font-mono text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded uppercase">Uplink: Active</span>
              </div>
            </div>
            
            <div className="grid gap-3">
              {data.messages.length === 0 ? (
                <div className="p-12 text-center bg-zinc-50 dark:bg-[#0c0c0e] border border-dashed border-zinc-200 dark:border-zinc-800 rounded">
                  <i className="fa-solid fa-inbox text-zinc-700 text-2xl mb-4"></i>
                  <p className="text-zinc-500 font-mono text-xs uppercase">No incoming signals detected.</p>
                </div>
              ) : (
                data.messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    onClick={() => handleReadMessage(msg.id)}
                    className={`bg-zinc-50 dark:bg-[#0c0c0e] border rounded-lg p-5 flex items-start gap-4 cursor-pointer transition-all hover:border-indigo-500/30 ${selectedMessage?.id === msg.id ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-zinc-200 dark:border-zinc-800'} ${!msg.read ? 'border-l-4 border-l-indigo-500' : ''}`}
                  >
                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${!msg.read ? 'bg-indigo-500 animate-pulse' : 'bg-transparent'}`}></div>
                    <div className="flex-grow space-y-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase truncate">{msg.sender}</span>
                        <span className="text-[8px] font-mono text-zinc-500 uppercase">{new Date(msg.timestamp).toLocaleDateString()}</span>
                      </div>
                      <h4 className="text-[11px] font-mono text-zinc-400 truncate">{msg.subject}</h4>
                    </div>
                    {msg.priority === 'Urgent' && (
                      <span className="text-[8px] font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 uppercase tracking-tighter">Urgent</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-900 pb-4">Signal Decoder</h3>
            {selectedMessage ? (
              <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 space-y-8 animate-in fade-in duration-300">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Originator</label>
                    <p className="text-xs font-bold text-white uppercase">{selectedMessage.sender}</p>
                    <p className="text-[10px] font-mono text-indigo-400">{selectedMessage.email}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Subject</label>
                    <p className="text-xs text-white">{selectedMessage.subject}</p>
                  </div>
                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-4">Payload Content</label>
                    <div className="text-xs text-zinc-400 leading-relaxed font-mono whitespace-pre-wrap">
                      {selectedMessage.body}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button className="flex-grow py-2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-indigo-700 transition-all">Reply via Uplink</button>
                  <button 
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    className="p-2 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-red-500 transition-colors rounded"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-12 text-center">
                 <p className="text-zinc-600 font-mono text-[10px] uppercase">Select a signal to decode its payload.</p>
              </div>
            )}
            
            <div className="p-6 border border-indigo-500/20 bg-indigo-500/5 rounded-lg space-y-4">
              <div className="flex items-center gap-3 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                <i className="fa-solid fa-shield-halved"></i>
                Transmission Log
              </div>
              <div className="text-[8px] font-mono text-zinc-500 space-y-1">
                <p>> Encrypted SHA-256 tunnel: OK</p>
                <p>> Handshake TLS 1.3: ESTABLISHED</p>
                <p>> Global Filter: ACTIVE</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;