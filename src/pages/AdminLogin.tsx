import React, { useState } from 'react';
import { 
  Save, RotateCcw, Lock, Unlock, 
  Plus, Trash2, GraduationCap, Globe, Layers 
} from 'lucide-react';
import type { PortfolioData } from '../types';

interface AdminProps {
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
}

const AdminLogin: React.FC<AdminProps> = ({ data, onSave }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [pass, setPass] = useState('');
  const [formData, setFormData] = useState<PortfolioData>(data);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'admin123') setIsAuth(true);
  };

  // --- Array Management Helpers ---
  const addItem = (key: 'jobs' | 'projects' | 'education', newItem: any) => {
    setFormData({ ...formData, [key]: [newItem, ...formData[key]] });
  };

  const removeItem = (key: 'jobs' | 'projects' | 'education', id: number | string) => {
    const filtered = (formData[key] as any[]).filter((item, index) => 
      key === 'education' ? index !== id : item.id !== id
    );
    setFormData({ ...formData, [key]: filtered });
  };

  if (isAuth) {
    return (
      <div className="pt-32 max-w-6xl mx-auto px-6 pb-20 space-y-12">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Unlock className="text-emerald-500" /> Portfolio CMS
            </h2>
            <p className="text-slate-500 text-sm mt-1">Managing {formData.experience} of Data Engineering experience</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { localStorage.removeItem('portfolio_data'); window.location.reload(); }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-900/20 text-slate-300 rounded-xl transition">
              <RotateCcw size={18} /> Revert to File
            </button>
            <button onClick={() => { onSave(formData); alert("Sync Complete!"); }}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow-lg shadow-blue-500/20">
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* 1. Tech Stack & Core Info */}
          <div className="space-y-8">
            <section className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><Layers size={20} className="text-blue-500"/> Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {formData.techStack.map((tech, i) => (
                  <div key={i} className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1 rounded-lg">
                    <span className="text-sm">{tech.name}</span>
                    <button onClick={() => setFormData({...formData, techStack: formData.techStack.filter((_, idx) => idx !== i)})}
                      className="text-slate-500 hover:text-red-500"><Trash2 size={14}/></button>
                  </div>
                ))}
                {/* <button 
                  onClick={() => { const t = prompt("Add skill:"); if(t) setFormData({...formData, techStack: [...formData.techStack, t]}) }}
                  className="px-3 py-1 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-lg text-sm hover:bg-blue-600/20"
                >+ Add Tech</button> */}
              </div>
            </section>

            {/* Education Section */}
            <section className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><GraduationCap size={20} className="text-purple-500"/> Education</h3>
                <button onClick={() => addItem('education', { degree: "Degree Name", school: "University", year: "2024" })}
                  className="text-purple-400 hover:text-purple-300"><Plus size={20}/></button>
              </div>
              {formData.education.map((edu, i) => (
                <div key={i} className="grid grid-cols-2 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 relative group">
                  <input className="bg-transparent border-b border-slate-800 focus:border-purple-500 outline-none p-1 text-sm font-bold" 
                    value={edu.degree} onChange={(e) => {
                      const newEdu = [...formData.education]; newEdu[i].degree = e.target.value; setFormData({...formData, education: newEdu});
                    }} />
                  <input className="bg-transparent border-b border-slate-800 focus:border-purple-500 outline-none p-1 text-sm" 
                    value={edu.year} onChange={(e) => {
                      const newEdu = [...formData.education]; newEdu[i].year = e.target.value; setFormData({...formData, education: newEdu});
                    }} />
                  <button onClick={() => removeItem('education', i)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"><Trash2 size={12}/></button>
                </div>
              ))}
            </section>
          </div>

          {/* 2. Projects Manager */}
          <section className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><Globe size={20} className="text-emerald-500"/> Featured Projects</h3>
              <button onClick={() => addItem('projects', { id: Date.now(), title: "New Project", des: "", img: "/placeholder.png", iconLists: [], link: "#", mockup: false })}
                className="bg-emerald-500/10 text-emerald-500 p-2 rounded-xl hover:bg-emerald-500/20"><Plus size={20}/></button>
            </div>
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
              {formData.projects.map((project, idx) => (
                <div key={project.id} className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 group">
                  <div className="flex justify-between items-start">
                    <input className="text-lg font-bold bg-transparent border-b border-slate-800 focus:border-emerald-500 outline-none w-full" 
                      value={project.title} onChange={(e) => {
                        const newP = [...formData.projects]; newP[idx].title = e.target.value; setFormData({...formData, projects: newP});
                      }} />
                    <button onClick={() => removeItem('projects', project.id)} className="text-slate-600 hover:text-red-500 ml-2"><Trash2 size={18}/></button>
                  </div>
                  <textarea className="w-full bg-slate-900 p-3 rounded-xl border border-slate-800 text-sm h-24" 
                    value={project.des} onChange={(e) => {
                      const newP = [...formData.projects]; newP[idx].des = e.target.value; setFormData({...formData, projects: newP});
                    }} />
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-[10px] text-slate-500 uppercase">Image Path</label>
                      <input className="w-full bg-slate-900 p-2 rounded text-xs border border-slate-800" value={project.img} />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] text-slate-500 uppercase">Live Link</label>
                      <input className="w-full bg-slate-900 p-2 rounded text-xs border border-slate-800" value={project.link} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950">
      <form onSubmit={handleLogin} className="w-96 p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-6 text-center">
        <div className="inline-block bg-blue-600/10 p-4 rounded-full mb-2"><Lock className="text-blue-500" size={32} /></div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h2>
        <input type="password" autoFocus placeholder="Passcode" className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl focus:border-blue-500 outline-none text-center" onChange={(e) => setPass(e.target.value)} />
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20">Authorize</button>
      </form>
    </div>
  );
};

export default AdminLogin;