
import React from 'react';
import { PageContent } from '../types';
import { Target, Eye, Gem, Users } from 'lucide-react';

const About: React.FC<{ content: PageContent }> = ({ content }) => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">About Us</h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
            Leading the way in digital transformation with a focus on sustainable growth and operational excellence.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Philosophy</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {content.aboutText}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Founded on the principles of integrity, innovation, and impact, we have grown into a multi-national IT services and consultancy powerhouse. We believe that technology should be an enabler, not a barrier, to business success.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/about/800/600" 
              alt="Office Life" 
              className="rounded-3xl shadow-xl"
            />
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-slate-900 p-12 rounded-3xl text-white">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-900/40">
              <Eye size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-slate-400 text-lg leading-relaxed">{content.vision}</p>
          </div>
          <div className="bg-blue-600 p-12 rounded-3xl text-white">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-blue-50/80 text-lg leading-relaxed">{content.mission}</p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Gem, title: 'Quality', text: 'Uncompromising standards in every line of code and every strategic plan.' },
              { icon: Users, title: 'Collaboration', text: 'Working as an extension of your team to achieve shared goals.' },
              { icon: Target, title: 'Innovation', text: 'Constantly evolving to stay ahead of the technology curve.' },
              { icon: Gem, title: 'Integrity', text: 'Honesty and transparency in all our business relationships.' }
            ].map((value, idx) => (
              <div key={idx} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm text-blue-600 flex items-center justify-center mx-auto mb-6">
                  <value.icon size={28} />
                </div>
                <h4 className="text-xl font-bold mb-4">{value.title}</h4>
                <p className="text-slate-600">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
