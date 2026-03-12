
import React from 'react';
import { motion } from 'motion/react';
import { Service } from '../types';
import { Cpu, BarChart3, Code2, Smartphone, Database, Cloud, ArrowRight, Users, LayoutDashboard, Settings2, Activity } from 'lucide-react';

const iconMap: Record<string, any> = {
  Cpu, BarChart3, Code2, Smartphone, Database, Cloud, Users, LayoutDashboard, Settings2, Activity
};

const ServicesPage: React.FC<{ services: Service[] }> = ({ services }) => {
  return (
    <div className="flex flex-col">
      <section className="pt-16 pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
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
              className="text-4xl md:text-6xl font-serif font-light text-slate-900 mb-10 tracking-tight leading-[0.9]"
            >
              Strategic <span className="italic">Capabilities</span>.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl text-slate-600 leading-relaxed font-light"
            >
              From strategic consulting to end-to-end technical implementation, we provide the tools you need to excel in the digital age.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="flex flex-col">
        {['it', 'consultancy', 'development'].map((cat, catIndex) => {
          const catServices = services.filter(s => s.category === cat);
          if (catServices.length === 0) return null;

          return (
            <section key={cat} className="py-32 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-8 mb-16"
                >
                  <h2 className="text-xs font-bold tracking-[0.4em] uppercase whitespace-nowrap text-slate-500">
                    {cat === 'it' ? 'IT Infrastructure' : cat === 'consultancy' ? 'Business Consultancy' : 'Software Development'}
                  </h2>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-px w-full origin-left bg-slate-200"
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
                        className="cxo-card p-10 rounded-3xl group hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-500 border border-slate-800 bg-slate-900"
                      >
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-10 transition-all duration-500 bg-slate-800 text-slate-400 group-hover:bg-[#FF9933] group-hover:text-white">
                          <IconComp size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-serif font-light mb-6 tracking-tight transition-colors group-hover:text-[#0EA5E9] text-white">
                          {service.title}
                        </h3>
                        <p className="font-light leading-relaxed mb-10 text-slate-400">
                          {service.description}
                        </p>
                        <button className="text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-3 hover:gap-4 transition-all text-white">
                          Inquire <ArrowRight size={14} className="text-[#FF9933]" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesPage;
