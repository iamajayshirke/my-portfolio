import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { Project } from '../types';

const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <section id="projects" className="space-y-12">
      <div className="flex items-center gap-3 text-blue-500">
        <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((item) => (
          <div key={item.id} className="group relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all">
            <div className="aspect-video overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              <p className="text-slate-400 text-sm line-clamp-3">{item.des}</p>
              
              <div className="flex items-center justify-between pt-4">
                <div className="flex -space-x-2">
                  {item.iconLists.map((icon, index) => (
                    <div key={index} className="border border-white/[0.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center">
                      <img src={icon} alt="icon" className="p-2" />
                    </div>
                  ))}
                </div>
                
                <a href={item.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300">
                  Live Site <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;