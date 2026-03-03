import React, { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  Layers,
  User as UserIcon,
  Settings,
  Briefcase,
  CheckCircle2,
  Terminal,
  Type,
  GraduationCap,
  ExternalLink,
  Globe
} from "lucide-react";

import type { IUser, IPortfolioContent } from "../types";
import { ThemeToggle } from "../components/ThemeToggle";
import { useAppSelector } from "../store/hooks";

interface AdminProps {
  onSave: (newData: Partial<IUser>) => Promise<void>;
}

const AdminPortal: React.FC<AdminProps> = ({ onSave }) => {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");
  const { user } = useAppSelector((state) => state.auth);

  const [userForm, setUserForm] = useState<Partial<IUser>>({
    username: user?.username || "",
    email: user?.email || "",
    config: user?.config || { theme: "emerald", isDark: true },
    content: user?.content || {
      name: user?.displayName || "",
      role: "",
      experience: "",
      techStack: [],
      jobs: [],
      projects: [],
      education: []
    },
  });

  useEffect(() => {
    if (user) {
      setUserForm({
        username: user.username || "",
        email: user.email || "",
        config: user.config || { theme: "emerald", isDark: true },
        content: user.content || userForm.content
      });
    }
  }, [user]);

  const updateContent = (updates: Partial<IPortfolioContent>) => {
    setUserForm((prev) => ({
      ...prev,
      content: { ...prev.content!, ...updates },
    }));
  };

  const handleSaveInternal = async () => {
    setSaveStatus("saving");
    try {
      await onSave(userForm);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      setSaveStatus("idle");
      alert("Failed to sync changes.");
    }
  };

  const cardClass = "bg-(--card-bg) border border-(--card-border) p-8 rounded-[2.5rem] shadow-sm transition-all duration-300";
  const labelClass = "text-[10px] text-(--text-sec) uppercase tracking-widest font-bold mb-1 block";
  const inputClass = "w-full bg-(--bg-color) p-3 rounded-xl border border-(--card-border) text-(--text-main) mt-1 focus:border-primary outline-none transition-all placeholder:text-(--text-sec)/50";

  // Construct the live URL
  const liveUrl = `${window.location.origin}/${userForm.username || 'username'}`;

  return (
    <div className="pt-32 max-w-7xl mx-auto px-6 pb-20 space-y-8 animate-in fade-in duration-500 min-h-screen bg-(--bg-color)">
      
      {/* 1. TOP ACTION BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-(--card-bg) backdrop-blur-xl p-6 rounded-3xl border border-(--card-border) sticky top-24 z-40 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <UserIcon className="text-primary" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-(--text-main)">Portfolio Manager</h2>
            <div className="flex items-center gap-2">
               <p className="text-(--text-sec) text-sm font-medium">Editing as: <span className="text-primary">{userForm.email}</span></p>
               <span className="text-(--text-sec)/30">|</span>
               <a href={liveUrl} target="_blank" rel="noreferrer" className="text-xs text-primary flex items-center gap-1 hover:underline">
                 View Live <ExternalLink size={12} />
               </a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-(--bg-color) p-1 rounded-xl border border-(--card-border)"><ThemeToggle /></div>
          <button
            disabled={saveStatus === "saving"}
            onClick={handleSaveInternal}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 font-bold rounded-2xl transition-all shadow-lg active:scale-95 ${
              saveStatus === "success" ? "bg-emerald-500 text-white" : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
            }`}
          >
            {saveStatus === "success" ? <CheckCircle2 size={18} /> : <Save size={18} />}
            {saveStatus === "saving" ? "Saving..." : saveStatus === "success" ? "Synced" : "Sync to MongoDB"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Identity & Preview */}
        <div className="space-y-8">
          
          {/* URL PREVIEW SECTION */}
          <section className={`${cardClass} overflow-hidden relative`}>
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Globe size={80} className="text-primary" />
             </div>
             <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2 mb-4">
               <Globe size={18} className="text-blue-500" /> Public URL
             </h3>
             <div className="p-4 bg-(--bg-color) rounded-2xl border border-(--card-border) break-all font-mono text-xs text-primary">
                {liveUrl}
             </div>
             <p className="mt-4 text-[10px] text-(--text-sec) leading-relaxed">
               This is the unique link to your live portfolio. Share this with recruiters and on your social profiles.
             </p>
          </section>

          <section className={cardClass}>
            <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2 mb-6">
              <Settings size={18} className="text-primary" /> Identity Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Username (URL Path)</label>
                <input className={inputClass} value={userForm.username} onChange={(e) => setUserForm({ ...userForm, username: e.target.value.toLowerCase().replace(/\s+/g, '-') })} placeholder="e.g. ajay-shirke" />
              </div>
              <div>
                <label className={labelClass}>Real Name</label>
                <input className={inputClass} value={userForm.content?.name} onChange={(e) => updateContent({ name: e.target.value })} />
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2 mb-6">
              <Layers size={18} className="text-orange-500" /> UI Config
            </h3>
            <label className={labelClass}>Accent Theme</label>
            <select className={inputClass} value={userForm.config?.theme} onChange={(e) => setUserForm({ ...userForm, config: { ...userForm.config!, theme: e.target.value } })}>
              <option value="emerald">Emerald Green</option>
              <option value="blue">Ocean Blue</option>
              <option value="purple">Royal Purple</option>
            </select>
          </section>
        </div>

        {/* RIGHT COLUMN: Portfolio Sections */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* HERO CONTENT */}
          <section className={cardClass}>
            <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2 mb-6">
              <Type size={18} className="text-indigo-500" /> Hero Content
            </h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Main Title (H1)</label>
                <input 
                  placeholder="e.g. Senior Software Engineer"
                  className={inputClass} 
                  value={userForm.content?.role} 
                  onChange={(e) => updateContent({ role: e.target.value })} 
                />
              </div>
              <div>
                <label className={labelClass}>Brief Bio / Summary</label>
                <textarea 
                  placeholder="Summarize your 4+ years of experience..."
                  className={`${inputClass} h-24 resize-none`} 
                  value={userForm.content?.experience} 
                  onChange={(e) => updateContent({ experience: e.target.value })} 
                />
              </div>
            </div>
          </section>

          {/* TECH STACK */}
          <section className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2"><Terminal size={18} className="text-cyan-500" /> Tech Stack</h3>
              <button onClick={() => {
                const name = prompt("Tech Name:");
                const img = prompt("Icon URL:");
                if (name && img) updateContent({ techStack: [...userForm.content!.techStack, { name, img }] });
              }} className="text-cyan-500 p-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition"><Plus size={18} /></button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {userForm.content?.techStack.map((tech, i) => (
                <div key={i} className="flex items-center justify-between gap-2 bg-(--bg-color) border border-(--card-border) p-3 rounded-xl group hover:border-primary/50 transition">
                  <div className="flex items-center gap-2">
                    <img src={tech.img} className="w-5 h-5 object-contain" alt="" />
                    <span className="text-xs text-(--text-main) font-medium">{tech.name}</span>
                  </div>
                  <button onClick={() => updateContent({ techStack: userForm.content!.techStack.filter((_, idx) => idx !== i) })} className="text-(--text-sec) hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                </div>
              ))}
            </div>
          </section>

          {/* EXPERIENCE */}
          <section className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2"><Briefcase size={18} className="text-yellow-500" /> Experience</h3>
              <button onClick={() => updateContent({ jobs: [{ id: Date.now(), title: "New Role", company: "Company", desc: "", class: "md:col-span-2", thumbnail: "" }, ...userForm.content!.jobs] })} className="text-yellow-500 p-2 bg-yellow-500/10 rounded-lg hover:bg-yellow-500/20"><Plus size={18} /></button>
            </div>
            <div className="space-y-4">
              {userForm.content?.jobs.map((job, idx) => (
                <div key={job.id} className="p-6 bg-(--bg-color) rounded-2xl border border-(--card-border) space-y-4 hover:border-primary/30 transition">
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Title" className="bg-transparent border-b border-(--card-border) focus:border-primary outline-none text-(--text-main) font-bold py-1" value={job.title} onChange={(e) => { const n = [...userForm.content!.jobs]; n[idx].title = e.target.value; updateContent({ jobs: n }); }} />
                    <input placeholder="Company" className="bg-transparent border-b border-(--card-border) focus:border-primary outline-none text-(--text-sec) py-1" value={job.company} onChange={(e) => { const n = [...userForm.content!.jobs]; n[idx].company = e.target.value; updateContent({ jobs: n }); }} />
                  </div>
                  <textarea placeholder="Description..." className="w-full bg-(--card-bg) p-3 rounded-xl border border-(--card-border) text-xs h-24 text-(--text-sec) outline-none focus:border-primary" value={job.desc} onChange={(e) => { const n = [...userForm.content!.jobs]; n[idx].desc = e.target.value; updateContent({ jobs: n }); }} />
                  <div className="flex justify-end"><button onClick={() => updateContent({ jobs: userForm.content!.jobs.filter((j) => j.id !== job.id) })} className="text-red-500/70 text-xs flex items-center gap-1 hover:text-red-500"><Trash2 size={12} /> Remove</button></div>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2"><GraduationCap size={18} className="text-emerald-500" /> Education</h3>
              <button onClick={() => updateContent({ education: [{ degree: "Degree Name", school: "University", year: "2024" }, ...userForm.content!.education] })} className="text-emerald-500 p-2 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20"><Plus size={18} /></button>
            </div>
            <div className="space-y-4">
              {userForm.content?.education.map((edu, idx) => (
                <div key={idx} className="p-6 bg-(--bg-color) rounded-2xl border border-(--card-border) grid grid-cols-1 md:grid-cols-3 gap-4 shadow-sm">
                  <input placeholder="Degree" className="bg-transparent border-b border-(--card-border) outline-none text-(--text-main) font-bold" value={edu.degree} onChange={(e) => { const n = [...userForm.content!.education]; n[idx].degree = e.target.value; updateContent({ education: n }); }} />
                  <input placeholder="University" className="bg-transparent border-b border-(--card-border) outline-none text-(--text-sec)" value={edu.school} onChange={(e) => { const n = [...userForm.content!.education]; n[idx].school = e.target.value; updateContent({ education: n }); }} />
                  <div className="flex items-center gap-2">
                    <input placeholder="Year" className="bg-transparent border-b border-(--card-border) outline-none text-primary w-full" value={edu.year} onChange={(e) => { const n = [...userForm.content!.education]; n[idx].year = e.target.value; updateContent({ education: n }); }} />
                    <button onClick={() => updateContent({ education: userForm.content!.education.filter((_, i) => i !== idx) })} className="text-red-500"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AdminPortal;