
import React from 'react';
import { motion } from 'motion/react';
import { PageContent, Service, RoutePath, AppImages } from '../types';
import { ArrowRight, CheckCircle2, Cpu, BarChart3, Code2, Smartphone, Database, Cloud, Users, LayoutDashboard, Settings2, Activity } from 'lucide-react';

const iconMap: Record<string, any> = {
  Cpu, BarChart3, Code2, Smartphone, Database, Cloud, Users, LayoutDashboard, Settings2, Activity
};

interface HomeProps {
  content: PageContent;
  services: Service[];
  images: AppImages;
}

const Home: React.FC<HomeProps> = ({ content, services, images }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-6 pb-24 lg:pt-6 lg:pb-48">
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 -left-4 w-[500px] h-[500px] bg-[#C5A059] rounded-full filter blur-[120px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: [0.22, 1, 0.36, 1], delay: 2 }}
            className="absolute top-0 -right-4 w-[500px] h-[500px] bg-[#1E3A8A] rounded-full filter blur-[120px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 9, repeat: Infinity, ease: [0.22, 1, 0.36, 1], delay: 4 }}
            className="absolute -bottom-8 left-1/4 w-[600px] h-[600px] bg-slate-400 rounded-full filter blur-[120px]"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block py-1.5 px-4 mb-8 rounded-full bg-white/50 backdrop-blur-sm text-[#C5A059] text-xs font-bold tracking-[0.3em] uppercase border border-slate-200"
            >
              Strategic IT Advisory
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[2rem] md:text-[3.3rem] lg:text-[4rem] font-serif font-light text-slate-900 leading-[0.95] mb-10 tracking-tighter"
            >
              Architecting the <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-orange-400">Future</span> of Enterprise.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-[1.12rem] md:text-[1.35rem] text-slate-600 mb-8 leading-relaxed font-light tracking-wide"
            >
              {content.heroSubtitle}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-8"
            >
              <a href={RoutePath.CONTACT} className="bg-[#C5A059] text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-[#A68446] transition-all flex items-center justify-center gap-4 group shadow-2xl shadow-[#C5A059]/20">
                Request Executive Briefing <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
              <a href={RoutePath.SERVICES} className="bg-white/50 backdrop-blur-md text-slate-900 px-12 py-6 rounded-full font-bold text-lg hover:bg-white transition-all border border-slate-200 shadow-sm">
                Explore Capabilities
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4"
            >
              <h2 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-xs mb-8 flex items-center gap-4">
                <span className="w-12 h-px bg-[#C5A059]"></span> The Firm
              </h2>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <p className="text-3xl md:text-5xl font-serif font-light text-slate-900 leading-[1.1] tracking-tighter">
                Statvion Infotech is a <span className="italic text-[#1E3A8A]">premier</span> technology advisory and business consultancy, dedicated to engineering resilient, scalable, and future-ready digital ecosystems for the modern enterprise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy & Approach Grid */}
      <section className="py-40 bg-slate-50 text-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C5A059]/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'How We Think', desc: 'We align technology decisions with business purpose, balancing innovation with governance and long-term value.' },
              { title: 'What We Enable', desc: 'We help organizations modernize platforms, integrate systems, and leverage data for smarter operations.' },
              { title: 'How We Work', desc: 'Our model emphasizes clarity, accountability, collaboration, and disciplined execution.' }
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="space-y-8 group bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-xl border border-slate-800 hover:border-slate-500/30 transition-all"
              >
                <div className="w-12 h-px bg-[#C5A059] group-hover:w-20 transition-all duration-700"></div>
                <h3 className="text-3xl font-serif font-light tracking-tighter">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Create Value Section */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mb-24"
          >
            <h2 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-xs mb-8">Value Creation</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-light text-slate-900 mb-10 tracking-tighter">Impact that <span className="italic">Endures</span>.</h3>
            <p className="text-2xl text-slate-600 leading-relaxed font-light">
              We focus on outcomes that matter — improving operational efficiency, strengthening system reliability, and enabling data-driven decision-making.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
            {/* Large Feature */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="md:col-span-2 md:row-span-2 p-12 rounded-[2.5rem] group hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-700 border border-slate-800 bg-slate-950 relative overflow-hidden flex flex-col justify-end"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#C5A059]/20 transition-colors duration-700"></div>
              <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-auto group-hover:bg-[#C5A059] group-hover:text-white transition-all duration-500 text-slate-400 border border-slate-800">
                <Activity size={28} className="font-light" />
              </div>
              <h4 className="text-3xl font-serif font-light text-white mb-4 tracking-tighter">Operational Efficiency</h4>
              <p className="text-slate-400 font-light text-lg leading-relaxed">
                Streamlining complex workflows and automating critical processes to drive unprecedented scale and performance across the enterprise.
              </p>
            </motion.div>

            {/* Medium Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="md:col-span-2 p-10 rounded-[2.5rem] group hover:shadow-xl transition-all duration-700 border border-slate-200 bg-slate-50 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 group-hover:bg-[#1E3A8A] group-hover:text-white transition-all duration-500 text-[#1E3A8A] shadow-sm">
                <Database size={24} className="font-light" />
              </div>
              <h4 className="text-2xl font-serif font-light text-slate-900 mb-3 tracking-tighter">Data-Driven Decisions</h4>
              <p className="text-slate-600 font-light">
                Transforming raw data into strategic foresight through advanced analytics and intelligent architecture.
              </p>
            </motion.div>

            {/* Small Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-1 p-10 rounded-[2.5rem] group hover:shadow-xl transition-all duration-700 border border-slate-800 bg-slate-900 flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-[#C5A059] transition-colors duration-500">
                <Cloud size={24} className="font-light" />
              </div>
              <h4 className="text-xl font-serif font-light text-white tracking-tighter">System Reliability</h4>
            </motion.div>

            {/* Small Feature 2 (Accent) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:col-span-1 p-10 rounded-[2.5rem] group hover:shadow-xl transition-all duration-700 bg-[#C5A059] flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                <CheckCircle2 size={24} className="font-light" />
              </div>
              <h4 className="text-xl font-serif font-light text-white tracking-tighter relative z-10">Business Agility</h4>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#C5A059] to-slate-800 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="IT Services and Technology" 
                  className="rounded-[2rem] shadow-2xl relative z-10 animate-float"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h2 className="text-[#C5A059] font-bold uppercase tracking-[0.3em] text-sm mb-6">Why Statvion Infotech</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 tracking-tighter">Expertise Across the Full Lifecycle</h3>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                We combine technical depth with business understanding across the full lifecycle of engagement.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {['Technical Depth', 'Business Understanding', 'Full Lifecycle Support', 'Disciplined Execution', 'Outcome-Focused', 'Reliable Systems'].map((item, i) => (
                  <motion.li 
                    key={item} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-4 text-slate-700 font-bold text-lg"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white">
                      <CheckCircle2 size={14} />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900 rounded-[4rem] p-20 lg:p-32 text-center relative overflow-hidden shadow-xl border border-slate-800"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A059]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1E3A8A]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]"
            />
            <div className="relative z-10">
              <h2 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-xs mb-12">Strategic Partnership</h2>
              <h3 className="text-4xl md:text-6xl font-serif font-light text-white mb-12 tracking-tighter leading-[0.9]">Let’s Build What’s <span className="italic">Next</span>.</h3>
              <p className="text-slate-400 text-2xl mb-16 max-w-3xl mx-auto leading-relaxed font-light">
                Engage with our leadership team to explore your transformation roadmap.
              </p>
              <a href={RoutePath.CONTACT} className="inline-block bg-[#C5A059] text-white px-16 py-7 rounded-full font-bold text-xl hover:bg-[#A68446] transition-all shadow-xl shadow-[#C5A059]/30 hover:scale-105">
                Start Strategy Discussion
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
