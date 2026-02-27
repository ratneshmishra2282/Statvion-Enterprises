
import React from 'react';
import { PageContent } from '../types';
import { Target, Eye, Gem, Users } from 'lucide-react';

const About: React.FC<{ content: PageContent }> = ({ content }) => {
  return (
    <div className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mb-32">
          <h2 className="text-[#FF9933] font-bold uppercase tracking-[0.3em] text-xs mb-8">About the Firm</h2>
          <h1 className="text-5xl md:text-8xl font-serif font-light text-slate-900 mb-10 tracking-tight leading-[0.9]">
            Pioneering <span className="italic">Digital</span> Leadership.
          </h1>
          <p className="text-2xl text-slate-500 leading-relaxed font-light">
            Statvion Infotech is a global leader in digital transformation, focusing on sustainable growth and operational excellence for the world's most ambitious organizations.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center mb-40">
          <div className="lg:col-span-7">
            <h2 className="text-4xl font-serif font-light text-slate-900 mb-10 tracking-tight">Our Philosophy</h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed font-light">
              {content.aboutText}
            </p>
            <p className="text-xl text-slate-600 leading-relaxed font-light italic">
              "Founded on the principles of integrity, innovation, and impact, we have grown into a multi-national IT services and consultancy powerhouse. We believe that technology should be an enabler, not a barrier, to business success."
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#0EA5E9]/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <img 
                src="https://picsum.photos/seed/about/800/1000" 
                alt="Office Life" 
                className="rounded-[2rem] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-40">
          <div className="bg-slate-950 p-16 rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="w-16 h-16 bg-blue-600/10 border border-blue-600/20 rounded-2xl flex items-center justify-center mb-10 text-blue-500">
              <Eye size={32} />
            </div>
            <h3 className="text-3xl font-serif font-light mb-6 tracking-tight">Our Vision</h3>
            <p className="text-slate-400 text-xl leading-relaxed font-light">{content.vision}</p>
          </div>
          <div className="bg-slate-50 p-16 rounded-[3rem] text-slate-900 border border-black/[0.03] group">
            <div className="w-16 h-16 bg-white border border-black/[0.05] rounded-2xl flex items-center justify-center mb-10 text-[#FF9933] shadow-sm">
              <Target size={32} />
            </div>
            <h3 className="text-3xl font-serif font-light mb-6 tracking-tight">Our Mission</h3>
            <p className="text-slate-500 text-xl leading-relaxed font-light">{content.mission}</p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-xs font-bold text-slate-400 text-center mb-20 tracking-[0.4em] uppercase">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Gem, title: 'Quality', text: 'Uncompromising standards in every line of code and every strategic plan.' },
              { icon: Users, title: 'Collaboration', text: 'Working as an extension of your team to achieve shared goals.' },
              { icon: Target, title: 'Innovation', text: 'Constantly evolving to stay ahead of the technology curve.' },
              { icon: Gem, title: 'Integrity', text: 'Honesty and transparency in all our business relationships.' }
            ].map((value, idx) => (
              <div key={idx} className="cxo-card p-10 rounded-3xl text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl text-slate-900 flex items-center justify-center mx-auto mb-8 group-hover:bg-slate-950 group-hover:text-white transition-all duration-500">
                  <value.icon size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-2xl font-serif font-light mb-4 tracking-tight">{value.title}</h4>
                <p className="text-slate-500 font-light leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
