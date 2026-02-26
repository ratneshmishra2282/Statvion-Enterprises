
import React from 'react';
import { PageContent, Service, RoutePath } from '../types';
import { ArrowRight, CheckCircle2, Cpu, BarChart3, Code2, Smartphone, Database, Cloud, Users, LayoutDashboard, Settings2, Activity } from 'lucide-react';

const iconMap: Record<string, any> = {
  Cpu, BarChart3, Code2, Smartphone, Database, Cloud, Users, LayoutDashboard, Settings2, Activity
};

interface HomeProps {
  content: PageContent;
  services: Service[];
}

const Home: React.FC<HomeProps> = ({ content, services }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-32 pb-24 lg:pt-48 lg:pb-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-[#FF9933] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-[#0EA5E9] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-4 mb-6 rounded-full bg-[#FF9933]/10 text-[#FF9933] text-sm font-bold tracking-wider uppercase border border-[#FF9933]/20">
            Next-Gen IT Consulting
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
            Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-orange-500">Future of Business</span> with Technology.
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed font-medium">
            {content.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href={`#${RoutePath.CONTACT}`} className="bg-[#FF9933] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#E67E22] transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-[#FF9933]/20">
              Start Your Journey <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </a>
            <a href={`#${RoutePath.SERVICES}`} className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20">
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF9933] to-transparent opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-[#FF9933] font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-[#FF9933]"></span> Who We Are
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Statvion Infotech is an <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] via-blue-600 to-[#FF9933]">end-to-end IT services</span> and business consultancy firm focused on building reliable, scalable, and future-ready digital systems.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy & Approach Grid */}
      <section className="py-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FF9933]/5 skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-8 group">
              <div className="w-16 h-1 bg-[#FF9933] group-hover:w-24 transition-all duration-500"></div>
              <h3 className="text-3xl font-bold">How We Think</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                We align technology decisions with business purpose, balancing innovation with governance and long-term value.
              </p>
            </div>
            <div className="space-y-8 group">
              <div className="w-16 h-1 bg-[#FF9933] group-hover:w-24 transition-all duration-500"></div>
              <h3 className="text-3xl font-bold">What We Enable</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                We help organizations modernize platforms, integrate systems, and leverage data for smarter operations.
              </p>
            </div>
            <div className="space-y-8 group">
              <div className="w-16 h-1 bg-[#FF9933] group-hover:w-24 transition-all duration-500"></div>
              <h3 className="text-3xl font-bold">How We Work</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                Our model emphasizes clarity, accountability, collaboration, and disciplined execution.
              </p>
            </div>
          </div>
          
          <div className="mt-24 pt-24 border-t border-slate-800/50">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                <h3 className="text-4xl font-bold mb-6">Start a Strategy Discussion</h3>
                <p className="text-slate-400 text-xl leading-relaxed">
                  Engage with our team to explore practical pathways for transformation and growth.
                </p>
              </div>
              <a href={`#${RoutePath.CONTACT}`} className="bg-[#FF9933] text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-[#E67E22] transition-all shadow-2xl shadow-[#FF9933]/20 whitespace-nowrap">
                Start Discussion
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How We Create Value Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-[#FF9933] font-bold uppercase tracking-widest text-sm mb-6">Our Impact</h2>
            <h3 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight">How We Create Value</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We focus on outcomes that matter — improving operational efficiency, strengthening system reliability, enabling data-driven decision-making, reducing technology risk, and supporting long-term sustainability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Operational Efficiency',
              'System Reliability',
              'Data-Driven Decisions',
              'Technology Risk Reduction',
              'Long-term Sustainability',
              'Business Agility'
            ].map((value) => (
              <div key={value} className="flex items-center gap-5 p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#FF9933]/30 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-[#FF9933]/10 flex items-center justify-center group-hover:bg-[#FF9933] group-hover:text-white transition-colors">
                  <CheckCircle2 size={24} />
                </div>
                <span className="font-bold text-slate-800 text-lg">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us (Updated to Why Statvion Infotech) */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9933]/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF9933] to-blue-600 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
                <img 
                  src="https://picsum.photos/seed/strategy/800/600" 
                  alt="Business Strategy" 
                  className="rounded-[2rem] shadow-2xl relative z-10 animate-float"
                />
                <div className="absolute -bottom-10 -right-10 bg-[#FF9933] p-10 rounded-[2rem] text-white hidden md:block shadow-2xl z-20">
                  <p className="text-5xl font-black mb-2">End-to-End</p>
                  <p className="text-orange-100 font-bold text-xl">Lifecycle Engagement</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-[#FF9933] font-bold uppercase tracking-widest text-sm mb-6">Why Statvion Infotech</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">Expertise Across the Full Lifecycle</h3>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                We combine technical depth with business understanding across the full lifecycle of engagement.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {['Technical Depth', 'Business Understanding', 'Full Lifecycle Support', 'Disciplined Execution', 'Outcome-Focused', 'Reliable Systems'].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-slate-700 font-bold text-lg">
                    <div className="w-6 h-6 rounded-full bg-[#0EA5E9] flex items-center justify-center text-white">
                      <CheckCircle2 size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section (Business Value) */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-16 lg:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9933]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0EA5E9]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-[#FF9933] font-bold uppercase tracking-widest text-sm mb-8">Business Value</h2>
              <h3 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">Let’s Build What’s Next.</h3>
              <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Start a conversation with our team to explore your transformation roadmap.
              </p>
              <a href={`#${RoutePath.CONTACT}`} className="inline-block bg-[#FF9933] text-white px-14 py-6 rounded-full font-black text-xl hover:bg-[#E67E22] transition-all shadow-2xl shadow-[#FF9933]/40">
                Start Strategy Discussion
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
