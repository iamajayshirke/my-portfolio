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
  Globe,
  X,
} from "lucide-react";

import type { IUser, IPortfolioContent } from "../types";
import { ThemeToggle } from "../components/ThemeToggle";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchPublicPortfolio,
  updatePortfolioContent,
} from "../store/authSlice";

interface AdminProps {
  onSave: (newData: Partial<IUser>) => Promise<void>;
}

const AdminPortal: React.FC<AdminProps> = ({ onSave }) => {
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">(
    "idle",
  );
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  
  const [userForm, setUserForm] = useState<Partial<IUser>>({
    username: user?.username || "",
    email: user?.email || "",
    config: user?.config || { theme: "emerald", isDark: true },
    content: user?.content || {
      name: user?.displayName || "",
      role: user?.content?.role || "",
      experience: user?.content?.experience || "",
      techStack: [],
      jobs: [],
      projects: [],
      education: [],
    },
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchPublicPortfolio(user?.username));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setUserForm({
        username: user.username || "",
        email: user.email || "",
        config: user.config || { theme: "emerald", isDark: true },
        content: user.content || userForm.content,
      });
    }
  }, [user]);

  const updateContent = (updates: Partial<IPortfolioContent>) => {
    setUserForm((prev) => ({
      ...prev,
      content: { ...prev.content!, ...updates } as IPortfolioContent,
    }));
  };

  // --- NEW IMMUTABLE ARRAY HELPER ---
  const updateArrayItem = <K extends keyof IPortfolioContent>(
    key: K,
    idx: number,
    itemUpdates: any
  ) => {
    const currentArray = [...((userForm.content?.[key] as any[]) || [])];
    currentArray[idx] = { ...currentArray[idx], ...itemUpdates };
    updateContent({ [key]: currentArray });
  };

  const handleSaveInternal = async () => {
    setSaveStatus("saving");
    try {
      await dispatch(updatePortfolioContent(userForm)).unwrap();
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      setSaveStatus("idle");
    }
  };

  const updatePreview = () => {
    const name = (document.getElementById("tech-search") as HTMLInputElement).value;
    const useCustom = (document.getElementById("use-custom-color") as HTMLInputElement).checked;
    const color = (document.getElementById("tech-color") as HTMLInputElement).value.replace("#", "");
    const preview = document.getElementById("icon-preview") as HTMLImageElement;

    const slug = name.toLowerCase().replace(/\s+/g, "").replace(/\./g, "dot");
    const baseUrl = `https://cdn.simpleicons.org/${slug}`;
    if (preview) {
      preview.src = useCustom && name ? `${baseUrl}/${color}` : baseUrl;
    }
  };

  const handleAddTech = () => {
    const nameInput = document.getElementById("tech-search") as HTMLInputElement;
    const useCustom = (document.getElementById("use-custom-color") as HTMLInputElement).checked;
    const color = (document.getElementById("tech-color") as HTMLInputElement).value.replace("#", "");

    const name = nameInput.value;
    const slug = name.toLowerCase().replace(/\s+/g, "").replace(/\./g, "dot");

    if (name) {
      const finalIconUrl = useCustom
        ? `https://cdn.simpleicons.org/${slug}/${color}`
        : `https://cdn.simpleicons.org/${slug}`;
      updateContent({
        techStack: [
          ...(userForm.content?.techStack || []),
          { name, img: finalIconUrl },
        ],
      });
      nameInput.value = "";
    }
  };

  const cardClass = "bg-(--card-bg) border border-(--card-border) p-8 rounded-[2.5rem] shadow-sm transition-all duration-300";
  const labelClass = "text-[10px] text-(--text-sec) uppercase tracking-widest font-bold mb-1 block";
  const inputClass = "w-full bg-(--bg-color) p-3 rounded-xl border border-(--card-border) text-(--text-main) mt-1 focus:border-primary outline-none transition-all placeholder:text-(--text-sec)/50";

  const liveUrl = `${window.location.origin}/${userForm.username || "username"}`;

  return (
    <div className="pt-32 max-w-7xl mx-auto px-6 pb-20 space-y-8 animate-in fade-in duration-500 min-h-screen bg-(--bg-color)">
      {/* 1. TOP ACTION BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-(--card-bg) backdrop-blur-xl p-6 rounded-3xl border border-(--card-border) sticky top-24 z-40 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl"><UserIcon className="text-primary" size={24} /></div>
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
        <div className="space-y-8">
          <section className={`${cardClass} overflow-hidden relative`}>
            <div className="absolute top-0 right-0 p-4 opacity-10"><Globe size={80} className="text-primary" /></div>
            <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2 mb-4"><Globe size={18} className="text-blue-500" /> Public URL</h3>
            <div className="p-4 bg-(--bg-color) rounded-2xl border border-(--card-border) break-all font-mono text-xs text-primary">{liveUrl}</div>
          </section>

          <section className={cardClass}>
            <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2 mb-6"><Settings size={18} className="text-primary" /> Identity Settings</h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Username (URL Path)</label>
                <input className={inputClass} value={userForm.username} onChange={(e) => setUserForm({ ...userForm, username: e.target.value.toLowerCase().replace(/\s+/g, "-") })} />
              </div>
              <div>
                <label className={labelClass}>Real Name</label>
                <input className={inputClass} value={userForm.content?.name} onChange={(e) => updateContent({ name: e.target.value })} />
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2 mb-6"><Layers size={18} className="text-orange-500" /> UI Config</h3>
            <label className={labelClass}>Accent Theme</label>
            <select className={inputClass} value={userForm.config?.theme} onChange={(e) => setUserForm({ ...userForm, config: { ...userForm.config!, theme: e.target.value } })}>
              <option value="emerald">Emerald Green</option>
              <option value="blue">Ocean Blue</option>
              <option value="purple">Royal Purple</option>
            </select>
          </section>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <section className={cardClass}>
            <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2 mb-6"><Type size={18} className="text-indigo-500" /> Hero Content</h3>
            <div className="space-y-4">
              <input placeholder="Main Title (H1)" className={inputClass} value={userForm.content?.role} onChange={(e) => updateContent({ role: e.target.value })} />
              <textarea placeholder="Brief Bio" className={`${inputClass} h-24 resize-none`} value={userForm.content?.experience} onChange={(e) => updateContent({ experience: e.target.value })} />
            </div>
          </section>

          {/* TECH STACK SECTION */}
          <section className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2"><Terminal size={18} className="text-cyan-500" /> Tech Stack Library</h3>
            </div>
            <div className="p-6 bg-(--bg-color) rounded-3xl border border-(--card-border) mb-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className={labelClass}>Technology Name</label>
                  <input type="text" id="tech-search" placeholder="e.g. React" className={inputClass} onChange={() => updatePreview()} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className={labelClass}>Custom Color</label>
                    <input type="checkbox" id="use-custom-color" className="w-4 h-4 accent-primary" onChange={() => updatePreview()} />
                  </div>
                  <div className="flex gap-2">
                    <input type="color" id="tech-color" defaultValue="#61DAFB" className="w-12 h-12 bg-transparent border-none cursor-pointer" onChange={() => updatePreview()} />
                    <input type="text" id="tech-color-text" placeholder="Auto" className={inputClass} onChange={() => updatePreview()} />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-(--card-bg) rounded-2xl border border-(--card-border)">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-(--bg-color) border border-(--card-border) rounded-xl flex items-center justify-center p-3">
                    <img id="icon-preview" src="https://cdn.simpleicons.org/react" alt="Preview" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/6062/6062646.png"; }} />
                  </div>
                  <p className="text-sm font-bold text-(--text-main)">Live Preview</p>
                </div>
                <button onClick={handleAddTech} className="h-12 bg-primary hover:bg-primary/90 text-white px-8 rounded-xl font-black flex items-center gap-2 shadow-lg"><Plus size={20} /> Add Tech</button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {userForm.content?.techStack.map((tech, i) => (
                <div key={i} className="group relative bg-(--card-bg) border border-(--card-border) p-4 rounded-2xl flex items-center gap-3 hover:border-primary/50 transition-all">
                  <img src={tech.img} className="w-6 h-6 object-contain" alt={tech.name} onError={(e) => (e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/6062/6062646.png")} />
                  <span className="text-xs font-bold text-(--text-main)">{tech.name}</span>
                  <button onClick={() => updateContent({ techStack: userForm.content!.techStack.filter((_, idx) => idx !== i) })} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                </div>
              ))}
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <section className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2"><Briefcase size={18} className="text-yellow-500" /> Experience</h3>
              <button onClick={() => updateContent({ jobs: [{
                id: Date.now(), title: "New Role", company: "Company", desc: "",
                class: "",
                thumbnail: ""
              }, ...(userForm.content?.jobs || [])] })} className="text-yellow-500 p-2 bg-yellow-500/10 rounded-lg"><Plus size={18} /></button>
            </div>
            <div className="space-y-4">
              {userForm.content?.jobs.map((job, idx) => (
                <div key={job.id} className="p-6 bg-(--bg-color) rounded-2xl border border-(--card-border) space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Title" className="bg-transparent border-b border-(--card-border) outline-none text-(--text-main) font-bold" value={job.title} onChange={(e) => updateArrayItem("jobs", idx, { title: e.target.value })} />
                    <input placeholder="Company" className="bg-transparent border-b border-(--card-border) outline-none text-(--text-sec)" value={job.company} onChange={(e) => updateArrayItem("jobs", idx, { company: e.target.value })} />
                  </div>
                  <textarea placeholder="Description" className="w-full bg-(--card-bg) p-3 rounded-xl border border-(--card-border) text-xs h-24 text-(--text-sec) outline-none" value={job.desc} onChange={(e) => updateArrayItem("jobs", idx, { desc: e.target.value })} />
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION SECTION */}
          <section className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2"><GraduationCap size={18} className="text-emerald-500" /> Education</h3>
              <button onClick={() => updateContent({ education: [{ degree: "Degree", school: "University", year: "2024" }, ...(userForm.content?.education || [])] })} className="text-emerald-500 p-2 bg-emerald-500/10 rounded-lg"><Plus size={18} /></button>
            </div>
            <div className="space-y-4">
              {(userForm.content?.education || []).map((edu, idx) => (
                <div key={idx} className="p-6 bg-(--bg-color) rounded-2xl border border-(--card-border) grid grid-cols-1 md:grid-cols-3 gap-4 shadow-sm">
                  <input placeholder="Degree" className="bg-transparent border-b border-(--card-border) outline-none text-(--text-main) font-bold" value={edu.degree} onChange={(e) => updateArrayItem("education", idx, { degree: e.target.value })} />
                  <input placeholder="University" className="bg-transparent border-b border-(--card-border) outline-none text-(--text-sec)" value={edu.school} onChange={(e) => updateArrayItem("education", idx, { school: e.target.value })} />
                  <div className="flex items-center gap-2">
                    <input placeholder="Year" className="bg-transparent border-b border-(--card-border) outline-none text-primary w-full" value={edu.year} onChange={(e) => updateArrayItem("education", idx, { year: e.target.value })} />
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