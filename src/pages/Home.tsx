import React from "react";
import {
  Briefcase,
  Terminal,
  GraduationCap,
  Mail,
  ExternalLink,
  Code2,
  Sparkles,
} from "lucide-react";
import type { PortfolioData } from "../types";
import { ThemeToggle } from "../components/ThemeToggle";

interface HomeProps {
  data: PortfolioData;
}

const Home: React.FC<HomeProps> = ({ data }) => {
  // Destructure content for cleaner access
  const {
    name,
    role,
    experience,
    projects,
    jobs,
    techStack,
    education,
    whatsApp,
  } = data;

  return (
    <main className="pt-20 pb-20 space-y-32 transition-colors duration-500">
      {/* Floating Theme Bar */}
      <div className="flex justify-end sticky top-24 z-40 pr-4">
        <div className="bg-(--card-bg) backdrop-blur-md p-2 rounded-2xl border border-(--card-border) shadow-xl">
          <ThemeToggle />
        </div>
      </div>

      {/* 1. Hero Section */}
      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="space-y-2">
          <p className="text-primary font-mono font-medium tracking-wider uppercase text-sm flex items-center gap-2">
            <Sparkles size={16} /> Available for new opportunities
          </p>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight text-(--text-main)">
            {name || "Your Name"}
          </h1>
        </div>
        <div className="space-y-4">
          <p className="text-xl md:text-2xl text-(--text-sec) max-w-2xl leading-relaxed">
            <span className="text-primary font-semibold">
              {role || "Software Engineer"}
            </span>
            {" — "}
            {experience ||
              "Building high-performance web applications and robust full-stack solutions."}
          </p>

          {/* <div className="flex items-center gap-2 text-sm font-mono text-primary/80 bg-primary/5 border border-primary/10 w-fit px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Built with AI tools & deployed in &lt; 3 hours</span>
          </div> */}
        </div>
        <div className="flex gap-4 pt-4">
          <a
            href="#contact"
            className="px-6 py-3 bg-(--card-bg) border border-(--card-border) hover:bg-accent text-(--text-main) font-bold rounded-xl transition-all shadow-lg shadow-primary/20"
          >
            Get in touch
          </a>
          <a
            href={`https://wa.me/${whatsApp}?text=Hi%20Ajay,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20Software%20Engineering%20opportunity.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-5 font-extrabold rounded-2xl transition-all hover:scale-105 shadow-xl bg-[#25D366] text-white hover:bg-[#20ba5a]"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp Me
          </a>
        </div>
      </section>

      {/* 2. Featured Projects */}
      <section id="projects" className="space-y-12">
        <div className="flex items-center gap-3 text-primary">
          <Code2 size={28} />
          <h2 className="text-3xl font-bold text-(--text-main)">
            Featured Projects
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(projects || []).map((project, idx) => (
            <div
              key={idx}
              className="group bg-(--card-bg) border border-(--card-border) rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-video relative overflow-hidden bg-(--bg-color) border-b border-(--card-border) flex items-center justify-center p-6 transition-colors duration-500">
                {project.img ? (
                  // RENDER PROJECT IMAGE
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.classList.add(
                        "bg-primary/5",
                      );
                    }}
                  />
                ) : (
                  // RENDER THEME-AWARE PLACEHOLDER
                  <div className="relative w-full h-full flex flex-col items-center justify-center space-y-4 transition-opacity duration-300">
                    {/* Dynamic Background Pattern: 
          Uses --card-border for the dots so they match your UI's 
          subtle lines in both light and dark modes. 
      */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(var(--card-border) 1.5px, transparent 1.5px)`,
                        backgroundSize: "24px 24px",
                      }}
                    />

                    {/* Central Brand Icon */}
                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-(--card-bg) border border-(--card-border) flex items-center justify-center shadow-sm group-hover:border-primary/50 transition-colors">
                      <Code2 size={32} className="text-primary" />
                    </div>

                    <p className="relative z-10 font-mono text-[9px] uppercase tracking-[0.3em] text-(--text-sec) font-bold">
                      Internal Repository
                    </p>
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-(--text-main) group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-(--text-sec) text-sm leading-relaxed line-clamp-3">
                  {project?.des}
                </p>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex -space-x-2">
                    {project?.tech?.map((t, tIdx) => (
                      <div
                        key={tIdx}
                        className="w-9 h-9 rounded-full bg-(--bg-color) border border-(--card-border) flex items-center justify-center p-1.5 shadow-sm"
                      >
                        <img
                          src={t}
                          alt="tech icon"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition-colors"
                    >
                      Live Site <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Professional Journey */}
      <section id="experience" className="space-y-12 py-10">
        <div className="flex items-center gap-3 text-primary">
          <Briefcase size={28} />
          <h2 className="text-3xl font-bold text-(--text-main)">
            Professional Journey
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {(jobs || []).map((job, idx) => (
            <div
              key={idx}
              className={`group relative p-8 bg-(--card-bg) border border-(--card-border) rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-primary/50 ${job.class || "md:col-span-2"}`}
            >
              <div className="relative z-10 h-full flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-(--bg-color) rounded-2xl border border-(--card-border)">
                      <img
                        src={
                          job.thumbnail ||
                          "https://cdn-icons-png.flaticon.com/512/2682/2682065.png"
                        }
                        alt={job.company}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-(--text-main) group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm font-semibold text-primary/80 uppercase tracking-wide">
                      {job.company}
                    </p>
                  </div>
                  <p className="text-(--text-sec) leading-relaxed text-sm line-clamp-3">
                    {job.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Tech Stack */}
      <section id="tech" className="space-y-12 py-10">
        <div className="flex items-center gap-3 text-primary">
          <Terminal size={28} />
          <h2 className="text-3xl font-bold text-(--text-main)">Tech Stack</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {(techStack || []).map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center justify-center gap-4 p-6 bg-(--card-bg) border border-(--card-border) rounded-4xl transition-all duration-300 hover:border-primary/50 hover:-translate-y-2"
            >
              <img
                src={tech.img}
                alt={tech.name}
                className="w-10 h-10 object-contain"
              />
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-(--text-sec) group-hover:text-primary transition-colors">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Education */}
      <section id="education" className="space-y-10">
        <div className="flex items-center gap-3 text-primary">
          <GraduationCap size={28} />
          <h2 className="text-3xl font-bold text-(--text-main)">Education</h2>
        </div>
        <div className="grid gap-6">
          {(education || []).map((edu, index) => (
            <div
              key={index}
              className="p-8 bg-(--card-bg) border border-(--card-border) rounded-3xl flex flex-col md:flex-row md:justify-between md:items-center gap-4"
            >
              <div>
                <h3 className="text-2xl font-bold text-(--text-main)">
                  {edu.degree}
                </h3>
                <p className="text-lg text-(--text-sec)">{edu.school}</p>
              </div>
              <span className="text-primary font-mono font-bold px-6 py-2 bg-primary/10 border border-primary/20 rounded-xl">
                Class of {edu.year}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Contact Section */}
      <section id="contact" className="pt-10">
        <div className="p-8 md:p-16 rounded-[3rem] space-y-8 relative overflow-hidden bg-(--contact-bg) border dark:border-(--card-border)">
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-(--main-text)">
              Ready to build <br /> something amazing?
            </h2>
            <p className="text-lg max-w-xl text-(--main-text) opacity-90">
              Let's discuss how my experience can help your team.
            </p>
            <div className="pt-6 flex flex-wrap gap-4">
              <a
                href="mailto:ajayshirke137@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-5 font-extrabold rounded-2xl bg-(--card-bg) text-primary border border-(--card-border) transition-transform hover:scale-105"
              >
                <Mail size={22} /> Start a Conversation
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-20 border-t border-(--card-border) text-center text-(--text-sec) text-sm">
        <p>
          © {new Date().getFullYear()} {name}. Engineered with React &
          TypeScript.
        </p>
      </footer>
    </main>
  );
};

export default Home;
