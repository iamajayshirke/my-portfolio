import React, { useState } from 'react';
import { 
  Save, Lock, Unlock, 
  Plus, Trash2, Layers, User as UserIcon, Settings, Briefcase
} from 'lucide-react';

// Use the interface from your schema
import type { IUser, IPortfolioContent, PortfolioData } from '../types'; 

interface AdminProps {
  initialData?: Partial<IUser>;
  onSave: (newData: Partial<IUser>) => void;
  isCreateMode?: boolean;
  data:PortfolioData
}

const AdminPortal: React.FC<AdminProps> = ({ initialData, onSave, isCreateMode = false }) => {
  const [isAuth, setIsAuth] = useState(isCreateMode); // Skip login if creating new
  const [pass, setPass] = useState('');
  
  // Initialize with your Mongoose Schema structure
  const [userForm, setUserForm] = useState<Partial<IUser>>({
    username: initialData?.username || '',
    email: initialData?.email || '',
    passwordHash: '', // Only for registration
    config: initialData?.config || { theme: 'emerald', isDark: true },
    content: initialData?.content || {
      name: '',
      role: 'Software Engineer',
      experience: '4 years',
      techStack: [],
      jobs: [],
      education:[],
      projects: []
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'admin123') setIsAuth(true); // Temporary local auth
  };

  // Generic Update Helper for deeply nested 'content'
  const updateContent = (updates: Partial<IPortfolioContent>) => {
    setUserForm({
      ...userForm,
      content: { ...userForm.content!, ...updates }
    });
  };

  if (!isAuth) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <form onSubmit={handleLogin} className="w-96 p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-6 text-center">
          <div className="inline-block bg-blue-600/10 p-4 rounded-full mb-2"><Lock className="text-blue-500" size={32} /></div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h2>
          <input type="password" placeholder="Passcode" className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl focus:border-blue-500 outline-none text-center text-white" onChange={(e) => setPass(e.target.value)} />
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20">Authorize</button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-32 max-w-7xl mx-auto px-6 pb-20 space-y-8">
      {/* 1. TOP ACTION BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/50 p-6 rounded-3xl border border-slate-800 sticky top-24 z-40 backdrop-blur-xl">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Unlock className="text-emerald-500" /> {isCreateMode ? "Create Portfolio" : "Edit Portfolio"}
          </h2>
          <p className="text-slate-500 text-sm">Target URL: portfolio.com/{userForm.username || 'your-name'}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onSave(userForm)}
            className="flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition shadow-lg shadow-emerald-500/20">
            <Save size={18} /> {isCreateMode ? "Publish Portfolio" : "Sync to MongoDB"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Account & Settings */}
        <div className="space-y-8">
          <section className="bg-slate-900 p-8 rounded-4xl border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2"><UserIcon size={18} className="text-blue-500"/> Account Info</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Username (URL Path)</label>
                <input className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white mt-1" 
                  value={userForm.username} onChange={e => setUserForm({...userForm, username: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Full Name</label>
                <input className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white mt-1" 
                  value={userForm.content?.name} onChange={e => updateContent({name: e.target.value})} />
              </div>
            </div>
          </section>

          <section className="bg-slate-900 p-8 rounded-4xl border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2"><Settings size={18} className="text-orange-500"/> Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-slate-500 uppercase">Theme</label>
                <select className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white"
                  value={userForm.config?.theme} onChange={e => setUserForm({...userForm, config: {...userForm.config!, theme: e.target.value}})}>
                  <option value="emerald">Emerald</option>
                  <option value="blue">Ocean Blue</option>
                  <option value="purple">Royal Purple</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        {/* MIDDLE COLUMN: Tech & Experience */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tech Stack Manager */}
          <section className="bg-slate-900 p-8 rounded-4xl border border-slate-800 space-y-6">
             <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white flex items-center gap-2"><Layers size={18} className="text-cyan-500"/> Tech Stack</h3>
                <button onClick={() => {
                  const name = prompt("Tech Name:");
                  const img = prompt("SVG URL:");
                  if(name && img) updateContent({ techStack: [...userForm.content!.techStack, { name, img }]});
                }} className="text-cyan-500 p-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition"><Plus size={18}/></button>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {userForm.content?.techStack.map((tech, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 bg-slate-950 border border-slate-800 p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <img src={tech.img} className="w-5 h-5 grayscale group-hover:grayscale-0" alt="" />
                      <span className="text-xs text-white">{tech.name}</span>
                    </div>
                    <button onClick={() => updateContent({ techStack: userForm.content!.techStack.filter((_, idx) => idx !== i)})}
                      className="text-slate-600 hover:text-red-500"><Trash2 size={14}/></button>
                  </div>
                ))}
             </div>
          </section>

          {/* Jobs / Experience Manager */}
          <section className="bg-slate-900 p-8 rounded-4xl border border-slate-800 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center gap-2"><Briefcase size={18} className="text-yellow-500"/> Experience</h3>
              <button onClick={() => updateContent({ jobs: [{
                id: Date.now(), title: "New Role", company: "Company", desc: "",
                class: '',
                thumbnail: ''
              }, ...userForm.content!.jobs]})}
                className="text-yellow-500 p-2 bg-yellow-500/10 rounded-lg"><Plus size={18}/></button>
            </div>
            {userForm.content?.jobs.map((job, idx) => (
              <div key={job.id} className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Title" className="bg-transparent border-b border-slate-800 focus:border-yellow-500 outline-none text-white font-bold" value={job.title} 
                    onChange={e => {
                      const newJobs = [...userForm.content!.jobs]; newJobs[idx].title = e.target.value; updateContent({jobs: newJobs});
                    }} />
                  <input placeholder="Company" className="bg-transparent border-b border-slate-800 focus:border-yellow-500 outline-none text-white" value={job.company} 
                    onChange={e => {
                      const newJobs = [...userForm.content!.jobs]; newJobs[idx].company = e.target.value; updateContent({jobs: newJobs});
                    }} />
                </div>
                <textarea placeholder="Description" className="w-full bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs h-20 text-slate-300" value={job.desc}
                  onChange={e => {
                    const newJobs = [...userForm.content!.jobs]; newJobs[idx].desc = e.target.value; updateContent({jobs: newJobs});
                  }} />
                 <button onClick={() => updateContent({ jobs: userForm.content!.jobs.filter(j => j.id !== job.id)})} className="text-red-500 text-xs flex items-center gap-1 hover:underline"><Trash2 size={12}/> Remove Entry</button>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;