import React from 'react';
import { Briefcase, Terminal, GraduationCap, Mail, ExternalLink, Code2 } from 'lucide-react';
import type { PortfolioData } from '../types';

interface HomeProps {
  data: PortfolioData;
}

const Home: React.FC<HomeProps> = ({ data }) => {
  return (
    <main className="pt-10 pb-20 space-y-32">
      
      {/* 1. Hero Section */}
      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="space-y-2">
          <p className="text-blue-500 font-mono font-medium tracking-wider uppercase text-sm">
            Available for new opportunities
          </p>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight text-white">
            {data.name}
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed">
          {data.role} with <span className="text-blue-500 font-semibold">{data.experience}</span> of experience building high-performance systems and scalable data pipelines.
        </p>
        <div className="flex gap-4 pt-4">
          <a href="#contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            Get in touch
          </a>
          <button className="px-6 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-bold rounded-xl transition-all">
            View Resume
          </button>
        </div>
      </section>

      {/* 2. Featured Projects - New Section */}
      <section id="projects" className="space-y-12">
        <div className="flex items-center gap-3 text-blue-500">
          <Code2 size={28} />
          <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.projects.map((project) => (
            <div key={project.id} className="group bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all">
              <div className="aspect-video relative overflow-hidden bg-slate-800">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {project.des}
                </p>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex -space-x-2">
                    {project.iconLists.map((icon, idx) => (
                      <div key={idx} className="w-9 h-9 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center p-1.5 backdrop-blur-sm">
                        <img src={icon} alt="tech icon" className="w-full h-full object-contain" />
                      </div>
                    ))}
                  </div>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Check Live Site <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Experience Section */}
      <section id="experience" className="space-y-12">
        <div className="flex items-center gap-3 text-blue-500">
          <Briefcase size={28} />
          <h2 className="text-3xl font-bold text-white">Work History</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.jobs.map((job) => (
            <div key={job.id} className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-blue-500/30 transition-all group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{job.title}</h3>
                </div>
                <p className="text-blue-500 font-semibold">{job.company}</p>
                <p className="text-slate-400 leading-relaxed text-sm">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Skills Section */}
      <section id="tech" className="space-y-10">
        <div className="flex items-center gap-3 text-emerald-400">
          <Terminal size={28} />
          <h2 className="text-3xl font-bold text-white">Tech Stack</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {data.techStack.map((tech) => (
            <div 
              key={tech} 
              className="px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-default"
            >
              <p className="text-slate-300 font-mono text-sm">{tech}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Education Section */}
      <section id="education" className="space-y-10">
        <div className="flex items-center gap-3 text-purple-400">
          <GraduationCap size={28} />
          <h2 className="text-3xl font-bold text-white">Education</h2>
        </div>
        <div className="grid gap-6">
          {data.education.map((edu, index) => (
            <div key={index} className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                <p className="text-lg text-slate-400">{edu.school}</p>
              </div>
              <span className="text-purple-400 font-mono font-bold px-6 py-2 bg-purple-400/10 border border-purple-400/20 rounded-xl">
                Class of {edu.year}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Contact Section */}
      <section id="contact" className="pt-10">
        <div className="p-8 md:p-16 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] space-y-8 relative overflow-hidden shadow-2xl shadow-blue-500/20">
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Ready to build <br/>something amazing?</h2>
            <p className="text-blue-100 text-lg max-w-xl leading-relaxed">
              I'm currently open to new roles in Data Engineering and Full-stack development. Let's discuss how my 3.8 years of experience can help your team.
            </p>
            <div className="pt-6">
              <a 
                href="mailto:ajay.shirke@example.com" 
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-700 font-extrabold rounded-2xl hover:bg-blue-50 transition-all hover:scale-105 shadow-2xl"
              >
                <Mail size={22} />
                Start a Conversation
              </a>
            </div>
          </div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        </div>
      </section>

      <footer className="pt-20 border-t border-slate-900 text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} {data.name}. Engineered with React & TypeScript.</p>
      </footer>
    </main>
  );
};

export default Home;