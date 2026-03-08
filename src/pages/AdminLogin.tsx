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
  Code2,
  Link as LinkIcon,
  Smartphone,
  Monitor,
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

const AdminPortal: React.FC<AdminProps> = () => {
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

  const updateArrayItem = <K extends keyof IPortfolioContent>(
    key: K,
    idx: number,
    itemUpdates: any,
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

  // Shared Icon Logic
  const updatePreview = (
    searchId: string,
    previewId: string,
    customCheckId: string,
    colorId: string,
  ) => {
    const name = (document.getElementById(searchId) as HTMLInputElement).value;
    const useCustom = (
      document.getElementById(customCheckId) as HTMLInputElement
    ).checked;
    const color = (
      document.getElementById(colorId) as HTMLInputElement
    ).value.replace("#", "");
    const preview = document.getElementById(previewId) as HTMLImageElement;
    const slug = name.toLowerCase().replace(/\s+/g, "").replace(/\./g, "dot");
    const baseUrl = `https://cdn.simpleicons.org/${slug}`;
    if (preview)
      preview.src = useCustom && name ? `${baseUrl}/${color}` : baseUrl;
  };

  const handleAddTech = () => {
    const nameInput = document.getElementById(
      "tech-search",
    ) as HTMLInputElement;
    const useCustom = (
      document.getElementById("use-custom-color") as HTMLInputElement
    ).checked;
    const color = (
      document.getElementById("tech-color") as HTMLInputElement
    ).value.replace("#", "");
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


  const cardClass =
    "bg-(--card-bg) border border-(--card-border) p-8 rounded-[2.5rem] shadow-sm transition-all duration-300";
  const labelClass =
    "text-[10px] text-(--text-sec) uppercase tracking-widest font-bold mb-1 block";
  const inputClass =
    "w-full bg-(--bg-color) p-3 rounded-xl border border-(--card-border) text-(--text-main) mt-1 focus:border-primary outline-none transition-all placeholder:text-(--text-sec)/50";
const liveUrl = `${window.location.origin}/${userForm.username || "username"}`;

  return (
    <div className="pt-32 max-w-7xl mx-auto px-6 pb-20 space-y-8 min-h-screen bg-(--bg-color)">
      {/* 1. TOP ACTION BAR */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-(--card-bg) backdrop-blur-xl p-6 rounded-3xl border border-(--card-border) sticky top-24 z-40 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl"><UserIcon className="text-primary" size={24} /></div>
          <div>
            <h2 className="text-2xl font-bold text-(--text-main)">Portfolio Manager</h2>
            <p className="text-(--text-sec) text-sm font-medium">Editing: <span className="text-primary">{userForm.email}</span></p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-(--bg-color) p-1 rounded-xl border border-(--card-border)">
            <ThemeToggle />
          </div>
          <button
            disabled={saveStatus === "saving"}
            onClick={handleSaveInternal}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 font-bold rounded-2xl transition-all shadow-lg active:scale-95 ${
              saveStatus === "success" ? "bg-emerald-500 text-white" : "bg-primary text-white"
            }`}
          >
            {saveStatus === "success" ? <CheckCircle2 size={18} /> : <Save size={18} />}
            {saveStatus === "saving" ? "Saving..." : saveStatus === "success" ? "Synced" : "Sync Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-8">
          <section className={`${cardClass} relative overflow-hidden group`}>
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
        <Globe size={80} className="text-primary" />
      </div>
      <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2 mb-4">
        <Globe size={18} className="text-blue-500" /> Public Link
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 bg-(--bg-color) p-3 rounded-xl border border-(--card-border) group-hover:border-primary/50 transition-colors">
          <div className="flex-1 overflow-hidden">
            <p className="text-[10px] text-(--text-sec) uppercase font-bold mb-0.5">Live Preview</p>
            <p className="text-xs font-mono text-primary truncate">
              {window.location.origin}/<span className="font-bold">{userForm.username || "username"}</span>
            </p>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/${userForm.username}`);
            }}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-(--text-sec) hover:text-primary"
          >
          </button>
        </div>

        <a 
          href={liveUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center justify-center gap-2 w-full py-3 bg-primary/10 text-primary text-xs font-bold rounded-xl hover:bg-primary/20 transition-all border border-primary/10"
        >
          Open Portfolio <ExternalLink size={14} />
        </a>
      </div>
    </section>

    <section className={cardClass}>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <Settings size={18} className="text-primary" /> Identity
            </h3>
            <label className={labelClass}>Username (URL Slug)</label>
            <input
              className={inputClass}
              value={userForm.username}
              onChange={(e) => setUserForm({ ...userForm, username: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
            />
            <label className={labelClass + " mt-4"}>Real Name</label>
            <input className={inputClass} value={userForm.content?.name} onChange={(e) => updateContent({ name: e.target.value })} />
          </section>

          <section className={cardClass}>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <Layers size={18} className="text-orange-500" /> UI Config
            </h3>
            <select
              className={inputClass}
              value={userForm.config?.theme}
              onChange={(e) =>
                setUserForm({
                  ...userForm,
                  config: { ...userForm.config!, theme: e.target.value },
                })
              }
            >
              <option value="emerald">Emerald</option>
              <option value="blue">Ocean</option>
              <option value="purple">Royal</option>
            </select>
          </section>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <section className={cardClass}>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <Type size={18} className="text-indigo-500" /> Hero
            </h3>
            <input
              placeholder="Title"
              className={inputClass}
              value={userForm.content?.role}
              onChange={(e) => updateContent({ role: e.target.value })}
            />
            <textarea
              placeholder="Bio"
              className={`${inputClass} mt-4 h-24`}
              value={userForm.content?.experience}
              onChange={(e) => updateContent({ experience: e.target.value })}
            />
          </section>

          {/* PROJECTS SECTION */}
          {/* PROJECTS SECTION */}
          <section className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Code2 size={18} className="text-purple-500" /> Projects
              </h3>
              <button
                onClick={() =>
                  updateContent({
                    projects: [
                      {
                        id: Date.now(), // Generate unique ID for new project
                        title: "New Project",
                        des: "",
                        tech: [],
                        link: "",
                        img: "",
                        iconLists: [],
                        mockup: false,
                      },
                      ...(userForm.content?.projects || []),
                    ],
                  })
                }
                className="text-purple-500 p-2 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-all"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="space-y-6">
              {(userForm.content?.projects || []).map((proj, pIdx) => (
                <div
                  key={proj.id || pIdx}
                  className="p-6 bg-(--bg-color) rounded-3xl border border-(--card-border) space-y-4"
                >
                  {/* <div className="flex items-center justify-between p-3 bg-(--bg-color) rounded-2xl border border-(--card-border)">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${proj.mockup ? "bg-blue-500/10 text-blue-500" : "bg-emerald-500/10 text-emerald-500"}`}
                      >
                        {proj.mockup ? (
                          <Smartphone size={18} />
                        ) : (
                          <Monitor size={18} />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-(--text-main)">
                          Display Mode
                        </p>
                        <p className="text-[10px] text-(--text-sec)">
                          {proj.mockup ? "Mobile Mockup" : "Browser Preview"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        updateArrayItem("projects", pIdx, {
                          mockup: !proj.mockup,
                        })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        proj.mockup
                          ? "bg-blue-500"
                          : "bg-slate-300 dark:bg-slate-700"
                      }`}
                    >
                      <span
                        className={`${
                          proj.mockup ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </button>
                  </div> */}
                  {/* Header: Title & Delete */}
                  <div className="flex justify-between gap-4">
                    <input
                      placeholder="Project Title"
                      className="flex-1 bg-transparent border-b border-(--card-border) font-bold outline-none text-(--text-main) focus:border-purple-500 transition-colors"
                      value={proj.title}
                      onChange={(e) =>
                        updateArrayItem("projects", pIdx, {
                          title: e.target.value,
                        })
                      }
                    />
                    <button
                      onClick={() =>
                        updateContent({
                          projects: userForm.content!.projects.filter(
                            (_, i) => i !== pIdx,
                          ),
                        })
                      }
                      className="text-red-500 hover:scale-110 transition-transform"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Description */}
                  <textarea
                    placeholder="Detailed project description..."
                    className="w-full bg-transparent text-sm outline-none border-b border-(--card-border) text-(--text-sec) min-h-20 py-2"
                    value={proj.des}
                    onChange={(e) =>
                      updateArrayItem("projects", pIdx, { des: e.target.value })
                    }
                  />

                  {/* Links and Images */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Live URL (Optional)</label>
                      <div className="flex items-center gap-2 bg-(--card-bg) p-2 rounded-xl border border-(--card-border) mt-1">
                        <LinkIcon size={14} className="text-(--text-sec)" />
                        <input
                          className="bg-transparent outline-none text-xs w-full text-primary"
                          placeholder="https://..."
                          value={proj.link}
                          onChange={(e) =>
                            updateArrayItem("projects", pIdx, {
                              link: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Preview Image URL</label>
                      <input
                        className={inputClass + " !mt-1 !py-2 text-xs"}
                        placeholder="/projects/screenshot.png"
                        value={proj.img}
                        onChange={(e) =>
                          updateArrayItem("projects", pIdx, {
                            img: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Project Tech Stack Adder with Live Preview */}
                  <div className="pt-2 p-4 bg-(--bg-color) rounded-2xl border border-(--card-border)">
                    <label className={labelClass}>
                      Add Technology to Project
                    </label>
                    <div className="flex items-center gap-3 mt-2">
                      {/* Live Preview Square */}
                      <div className="w-10 h-10 bg-(--card-bg) border border-(--card-border) rounded-lg flex items-center justify-center p-1.5 shadow-inner">
                        <img
                          id={`proj-preview-${pIdx}`}
                          src="https://cdn.simpleicons.org/code"
                          className="w-full h-full object-contain opacity-30"
                          alt=""
                          onError={(e) =>
                            (e.currentTarget.src =
                              "https://cdn-icons-png.flaticon.com/512/6062/6062646.png")
                          }
                        />
                      </div>

                      <input
                        id={`proj-tech-search-${pIdx}`}
                        placeholder="Search (e.g. Next.js, Firebase)"
                        className="flex-1 bg-transparent border-b border-(--card-border) text-xs outline-none py-1 text-(--text-main)"
                        onChange={(e) => {
                          const slug = e.target.value
                            .toLowerCase()
                            .replace(/\s+/g, "")
                            .replace(/\./g, "dot");
                          const preview = document.getElementById(
                            `proj-preview-${pIdx}`,
                          ) as HTMLImageElement;
                          if (preview && e.target.value) {
                            preview.src = `https://cdn.simpleicons.org/${slug}`;
                            preview.classList.remove("opacity-30");
                          } else if (preview) {
                            preview.src = "https://cdn.simpleicons.org/code";
                            preview.classList.add("opacity-30");
                          }
                        }}
                      />

                      <button
                        onClick={() => {
                          const input = document.getElementById(
                            `proj-tech-search-${pIdx}`,
                          ) as HTMLInputElement;
                          const name = input.value;
                          const slug = name
                            .toLowerCase()
                            .replace(/\s+/g, "")
                            .replace(/\./g, "dot");
                          if (name) {
                            const iconUrl = `https://cdn.simpleicons.org/${slug}`;
                            const updatedTech = [...(proj.tech || []), iconUrl];
                            updateArrayItem("projects", pIdx, {
                              tech: updatedTech,
                            });
                            input.value = ""; // Clear input
                            // Reset preview
                            const preview = document.getElementById(
                              `proj-preview-${pIdx}`,
                            ) as HTMLImageElement;
                            if (preview) {
                              preview.src = "https://cdn.simpleicons.org/code";
                              preview.classList.add("opacity-30");
                            }
                          }
                        }}
                        className="bg-purple-500/10 text-purple-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-purple-500/20 transition-all"
                      >
                        Add
                      </button>
                    </div>

                    {/* Render Added Tech Icons */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {proj.tech?.map((t, tIdx) => (
                        <div
                          key={tIdx}
                          className="relative group/tech bg-(--bg-color) p-1.5 rounded-lg border border-(--card-border) shadow-sm"
                        >
                          <img
                            src={t}
                            className="w-7 h-7 object-contain"
                            alt=""
                          />
                          <button
                            onClick={() => {
                              const updatedTech = proj.tech.filter(
                                (_, i) => i !== tIdx,
                              );
                              updateArrayItem("projects", pIdx, {
                                tech: updatedTech,
                              });
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover/tech:opacity-100 transition-opacity shadow-md"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TECH STACK SECTION */}
          <section className={cardClass}>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <Terminal size={18} className="text-cyan-500" /> Tech Stack
              Library
            </h3>
            <div className="p-6 bg-(--bg-color) rounded-3xl border border-(--card-border) mb-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className={labelClass}>Technology Name</label>
                  <input
                    type="text"
                    id="tech-search"
                    placeholder="e.g. React"
                    className={inputClass}
                    onChange={() =>
                      updatePreview(
                        "tech-search",
                        "icon-preview",
                        "use-custom-color",
                        "tech-color",
                      )
                    }
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className={labelClass}>Custom Color</label>
                    <input
                      type="checkbox"
                      id="use-custom-color"
                      className="w-4 h-4 accent-primary"
                      onChange={() =>
                        updatePreview(
                          "tech-search",
                          "icon-preview",
                          "use-custom-color",
                          "tech-color",
                        )
                      }
                    />
                  </div>
                  <input
                    type="color"
                    id="tech-color"
                    defaultValue="#61DAFB"
                    className="w-full h-10 bg-transparent border-none cursor-pointer"
                    onChange={() =>
                      updatePreview(
                        "tech-search",
                        "icon-preview",
                        "use-custom-color",
                        "tech-color",
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-(--card-bg) rounded-2xl border border-(--card-border)">
                <div className="flex items-center gap-4">
                  <img
                    id="icon-preview"
                    src="https://cdn.simpleicons.org/react"
                    alt=""
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://cdn-icons-png.flaticon.com/512/6062/6062646.png";
                    }}
                  />
                  <p className="text-sm font-bold">Live Preview</p>
                </div>
                <button
                  onClick={handleAddTech}
                  className="bg-primary text-white px-6 py-2 rounded-xl font-bold transition-all"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              {userForm.content?.techStack.map((tech, i) => (
                <div
                  key={i}
                  className="group relative bg-(--card-bg) border border-(--card-border) p-3 rounded-2xl flex items-center justify-center"
                >
                  <img
                    src={tech.img}
                    className="w-6 h-6 object-contain"
                    alt=""
                  />
                  <button
                    onClick={() =>
                      updateContent({
                        techStack: userForm.content!.techStack.filter(
                          (_, idx) => idx !== i,
                        ),
                      })
                    }
                    className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <section className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-(--text-main) flex items-center gap-2">
                <Briefcase size={18} className="text-yellow-500" /> Experience
              </h3>
              <button
                onClick={() =>
                  updateContent({
                    jobs: [
                      {
                        id: Date.now(),
                        title: "New Role",
                        company: "Company",
                        desc: "",
                        class: "md:col-span-2",
                        thumbnail: "",
                      },
                      ...(userForm.content?.jobs || []),
                    ],
                  })
                }
                className="text-yellow-500 p-2 bg-yellow-500/10 rounded-lg hover:bg-yellow-500/20 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {(userForm.content?.jobs || []).map((job, idx) => (
                <div
                  key={job.id}
                  className="p-6 bg-(--bg-color) rounded-2xl border border-(--card-border) space-y-4 group relative"
                >
                  {/* Delete Button - Positioned top right of the card */}
                  <button
                    onClick={() => {
                      const updatedJobs = userForm.content!.jobs.filter(
                        (j) => j.id !== job.id,
                      );
                      updateContent({ jobs: updatedJobs });
                    }}
                    className="absolute top-4 right-4 text-(--text-sec) hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete Experience"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                    <div>
                      <label className={labelClass}>Job Title</label>
                      <input
                        placeholder="Title"
                        className="w-full bg-transparent border-b border-(--card-border) outline-none text-(--text-main) font-bold py-1 focus:border-yellow-500 transition-colors"
                        value={job.title}
                        onChange={(e) =>
                          updateArrayItem("jobs", idx, {
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Company</label>
                      <input
                        placeholder="Company"
                        className="w-full bg-transparent border-b border-(--card-border) outline-none text-(--text-sec) py-1 focus:border-yellow-500 transition-colors"
                        value={job.company}
                        onChange={(e) =>
                          updateArrayItem("jobs", idx, {
                            company: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea
                      placeholder="What did you achieve here?"
                      className="w-full bg-(--card-bg) p-3 rounded-xl border border-(--card-border) text-xs h-24 text-(--text-sec) outline-none focus:border-yellow-500 transition-all"
                      value={job.desc}
                      onChange={(e) =>
                        updateArrayItem("jobs", idx, { desc: e.target.value })
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION SECTION */}
          <section className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <GraduationCap size={18} className="text-emerald-500" />{" "}
                Education
              </h3>
              <button
                onClick={() =>
                  updateContent({
                    education: [
                      {
                        degree: "New Degree",
                        school: "University",
                        year: "2024",
                      },
                      ...(userForm.content?.education || []),
                    ],
                  })
                }
                className="text-emerald-500 p-2 bg-emerald-500/10 rounded-lg"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {(userForm.content?.education || []).map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-(--bg-color) rounded-2xl border border-(--card-border) grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <input
                    placeholder="Degree"
                    className="bg-transparent border-b border-(--card-border) outline-none font-bold"
                    value={edu.degree}
                    onChange={(e) =>
                      updateArrayItem("education", idx, {
                        degree: e.target.value,
                      })
                    }
                  />
                  <input
                    placeholder="University"
                    className="bg-transparent border-b border-(--card-border) outline-none"
                    value={edu.school}
                    onChange={(e) =>
                      updateArrayItem("education", idx, {
                        school: e.target.value,
                      })
                    }
                  />
                  <div className="flex items-center gap-2">
                    <input
                      placeholder="Year"
                      className="bg-transparent border-b border-(--card-border) outline-none w-full"
                      value={edu.year}
                      onChange={(e) =>
                        updateArrayItem("education", idx, {
                          year: e.target.value,
                        })
                      }
                    />
                    <button
                      onClick={() =>
                        updateContent({
                          education: userForm.content!.education.filter(
                            (_, i) => i !== idx,
                          ),
                        })
                      }
                      className="text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
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
