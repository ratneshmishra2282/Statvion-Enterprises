
import React from 'react';
import { motion } from 'motion/react';
import { Service } from '../types';
import { Cpu, BarChart3, Code2, Smartphone, Database, Cloud, ArrowRight, Users, LayoutDashboard, Settings2, Activity } from 'lucide-react';

const iconMap: Record<string, any> = {
  Cpu, BarChart3, Code2, Smartphone, Database, Cloud, Users, LayoutDashboard, Settings2, Activity
};

const ServicesPage: React.FC<{ services: Service[] }> = ({ services }) => {
  return (
    <div className="pt-16 pb-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-32"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#FF9933] font-bold uppercase tracking-[0.3em] text-xs mb-8"
          >
            Service Portfolio
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-serif font-light text-white mb-10 tracking-tight leading-[0.9]"
          >
            Strategic <span className="italic">Capabilities</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl text-slate-400 leading-relaxed font-light"
          >
            From strategic consulting to end-to-end technical implementation, we provide the tools you need to excel in the digital age.
          </motion.p>
        </motion.div>

        <div className="space-y-40">
          {['it', 'consultancy', 'development'].map((cat, catIndex) => {
            const catServices = services.filter(s => s.category === cat);
            if (catServices.length === 0) return null;

            return (
              <div key={cat} className="space-y-16">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-8"
                >
                  <h2 className="text-xs font-bold text-slate-400 tracking-[0.4em] uppercase whitespace-nowrap">
                    {cat === 'it' ? 'IT Infrastructure' : cat === 'consultancy' ? 'Business Consultancy' : 'Software Development'}
                  </h2>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-px bg-slate-800 w-full origin-left"
                  ></motion.div>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {catServices.map((service, index) => {
                    const IconComp = iconMap[service.icon] || Cpu;
                    return (
                      <motion.div 
                        key={service.id} 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="cxo-card p-10 rounded-3xl group hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500 border border-slate-800"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mb-10 group-hover:bg-[#FF9933] group-hover:text-white transition-all duration-500">
                          <IconComp size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-serif font-light text-white mb-6 tracking-tight group-hover:text-[#0EA5E9] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-slate-400 font-light leading-relaxed mb-10">
                          {service.description}
                        </p>
                        <button className="text-xs font-bold tracking-[0.2em] uppercase text-white flex items-center gap-3 hover:gap-4 transition-all">
                          Inquire <ArrowRight size={14} />
                        </button>
                      </motion.div>
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
