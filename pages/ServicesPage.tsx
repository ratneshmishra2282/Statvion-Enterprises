
import React from 'react';
import { Service } from '../types';
import { Cpu, BarChart3, Code2, Smartphone, Database, Cloud, ArrowRight, Users, LayoutDashboard, Settings2, Activity } from 'lucide-react';

const iconMap: Record<string, any> = {
  Cpu, BarChart3, Code2, Smartphone, Database, Cloud, Users, LayoutDashboard, Settings2, Activity
};

const ServicesPage: React.FC<{ services: Service[] }> = ({ services }) => {
  return (
    <div className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-32">
          <h2 className="text-[#FF9933] font-bold uppercase tracking-[0.3em] text-xs mb-8">Service Portfolio</h2>
          <h1 className="text-5xl md:text-8xl font-serif font-light text-slate-900 mb-10 tracking-tight leading-[0.9]">
            Strategic <span className="italic">Capabilities</span>.
          </h1>
          <p className="text-2xl text-slate-500 leading-relaxed font-light">
            From strategic consulting to end-to-end technical implementation, we provide the tools you need to excel in the digital age.
          </p>
        </div>

        <div className="space-y-40">
          {['it', 'consultancy', 'development'].map((cat) => {
            const catServices = services.filter(s => s.category === cat);
            if (catServices.length === 0) return null;

            return (
              <div key={cat} className="space-y-16">
                <div className="flex items-center gap-8">
                  <h2 className="text-xs font-bold text-slate-400 tracking-[0.4em] uppercase whitespace-nowrap">
                    {cat === 'it' ? 'IT Infrastructure' : cat === 'consultancy' ? 'Business Consultancy' : 'Software Development'}
                  </h2>
                  <div className="h-px bg-slate-100 w-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {catServices.map((service) => {
                    const IconComp = iconMap[service.icon] || Cpu;
                    return (
                      <div key={service.id} className="cxo-card p-10 rounded-3xl group">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center mb-10 group-hover:bg-slate-950 group-hover:text-white transition-all duration-500">
                          <IconComp size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-serif font-light text-slate-900 mb-6 tracking-tight group-hover:text-[#0EA5E9] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-slate-500 font-light leading-relaxed mb-10">
                          {service.description}
                        </p>
                        <button className="text-xs font-bold tracking-[0.2em] uppercase text-slate-900 flex items-center gap-3 hover:gap-4 transition-all">
                          Inquire <ArrowRight size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
