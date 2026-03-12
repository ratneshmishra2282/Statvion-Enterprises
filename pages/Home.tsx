
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
      <section className="relative overflow-hidden bg-slate-950 pt-16 pb-24 lg:pt-24 lg:pb-48">
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 -left-4 w-[500px] h-[500px] bg-[#FF9933] rounded-full mix-blend-multiply filter blur-[120px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-0 -right-4 w-[500px] h-[500px] bg-[#0EA5E9] rounded-full mix-blend-multiply filter blur-[120px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute -bottom-8 left-1/4 w-[600px] h-[600px] bg-blue-900 rounded-full mix-blend-multiply filter blur-[120px]"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block py-1.5 px-4 mb-8 rounded-full bg-white/5 backdrop-blur-sm text-[#FF9933] text-xs font-bold tracking-[0.2em] uppercase border border-white/10"
            >
              Strategic IT Advisory
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white leading-[0.95] mb-10 tracking-tight"
            >
              Architecting the <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-orange-400">Future</span> of Enterprise.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-xl md:text-2xl text-slate-400 mb-14 leading-relaxed font-light tracking-wide"
            >
              {content.heroSubtitle}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-8"
            >
              <a href={`#${RoutePath.CONTACT}`} className="bg-[#FF9933] text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-[#E67E22] transition-all flex items-center justify-center gap-4 group shadow-2xl shadow-[#FF9933]/20">
                Initiate Consultation <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
              <a href={`#${RoutePath.SERVICES}`} className="bg-white/5 backdrop-blur-md text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-white/10 transition-all border border-white/10">
                Our Capabilities
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4"
            >
              <h2 className="text-[#FF9933] font-bold uppercase tracking-[0.3em] text-xs mb-8 flex items-center gap-4">
                <span className="w-12 h-px bg-[#FF9933]"></span> The Firm
              </h2>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <p className="text-3xl md:text-5xl font-serif font-light text-white leading-[1.1] tracking-tight">
                Statvion Infotech is a <span className="italic text-[#0EA5E9]">premier</span> technology advisory and business consultancy, dedicated to engineering resilient, scalable, and future-ready digital ecosystems for the modern enterprise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy & Approach Grid */}
      <section className="py-40 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FF9933]/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
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
                className="space-y-10 group"
              >
                <div className="w-12 h-px bg-[#FF9933] group-hover:w-20 transition-all duration-700"></div>
                <h3 className="text-3xl font-serif font-light tracking-tight">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-xl font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Create Value Section */}
      <section className="py-40 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mb-24"
          >
            <h2 className="text-[#FF9933] font-bold uppercase tracking-[0.3em] text-xs mb-8">Value Creation</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-light text-white mb-10 tracking-tight">Impact that <span className="italic">Endures</span>.</h3>
            <p className="text-2xl text-slate-400 leading-relaxed font-light">
              We focus on outcomes that matter — improving operational efficiency, strengthening system reliability, and enabling data-driven decision-making.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              'Operational Efficiency',
              'System Reliability',
              'Data-Driven Decisions',
              'Technology Risk Reduction',
              'Long-term Sustainability',
              'Business Agility'
            ].map((value, i) => (
              <motion.div 
                key={value} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="cxo-card p-10 rounded-3xl group hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500 border border-slate-800"
              >
                <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center mb-8 group-hover:bg-[#FF9933] group-hover:text-white transition-all duration-500 text-slate-300">
                  <CheckCircle2 size={28} className="font-light" />
                </div>
                <span className="font-serif text-2xl text-white tracking-tight">{value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9933]/5 rounded-full blur-3xl"></div>
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
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF9933] to-blue-600 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
                <img 
                  src={images.homeStrategy} 
                  alt="Business Strategy" 
                  className="rounded-[2rem] shadow-2xl relative z-10 animate-float"
                  referrerPolicy="no-referrer"
                />
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute -bottom-10 -right-10 bg-[#FF9933] p-10 rounded-[2rem] text-white hidden md:block shadow-2xl z-20"
                >
                  <p className="text-5xl font-black mb-2">End-to-End</p>
                  <p className="text-orange-100 font-bold text-xl">Lifecycle Engagement</p>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h2 className="text-[#FF9933] font-bold uppercase tracking-widest text-sm mb-6">Why Statvion Infotech</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-8 tracking-tight">Expertise Across the Full Lifecycle</h3>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">
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
                    className="flex items-center gap-4 text-slate-300 font-bold text-lg"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0EA5E9] flex items-center justify-center text-white">
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
      <section className="py-40 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-slate-950 rounded-[4rem] p-20 lg:p-32 text-center relative overflow-hidden shadow-2xl"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF9933]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0EA5E9]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]"
            />
            <div className="relative z-10">
              <h2 className="text-[#FF9933] font-bold uppercase tracking-[0.4em] text-xs mb-12">Strategic Partnership</h2>
              <h3 className="text-4xl md:text-6xl font-serif font-light text-white mb-12 tracking-tight leading-[0.9]">Let’s Build What’s <span className="italic">Next</span>.</h3>
              <p className="text-slate-400 text-2xl mb-16 max-w-3xl mx-auto leading-relaxed font-light">
                Engage with our leadership team to explore your transformation roadmap.
              </p>
              <a href={`#${RoutePath.CONTACT}`} className="inline-block bg-[#FF9933] text-white px-16 py-7 rounded-full font-bold text-xl hover:bg-[#E67E22] transition-all shadow-2xl shadow-[#FF9933]/40 hover:scale-105">
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
