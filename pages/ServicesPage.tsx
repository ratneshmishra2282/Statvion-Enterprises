
import React from 'react';
import { Service } from '../types';
import { Cpu, BarChart3, Code2, Smartphone, Database, Cloud, ArrowRight, Users, LayoutDashboard, Settings2, Activity } from 'lucide-react';

const iconMap: Record<string, any> = {
  Cpu, BarChart3, Code2, Smartphone, Database, Cloud, Users, LayoutDashboard, Settings2, Activity
};

const ServicesPage: React.FC<{ services: Service[] }> = ({ services }) => {
  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Our Services</h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-600">
            From strategic consulting to end-to-end technical implementation, we provide the tools you need to excel in the digital age.
          </p>
        </div>

        <div className="space-y-24">
          {['it', 'consultancy', 'development'].map((cat) => {
            const catServices = services.filter(s => s.category === cat);
            if (catServices.length === 0) return null;

            return (
              <div key={cat} className="space-y-10">
                <h2 className="text-3xl font-bold text-slate-900 border-l-8 border-blue-600 pl-6 capitalize">
                  {cat === 'it' ? 'IT Infrastructure' : cat === 'consultancy' ? 'Business Consultancy' : 'Software Development'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {catServices.map((service) => {
                    const IconComp = iconMap[service.icon] || Cpu;
                    return (
                      <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                          <IconComp size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                          Get a Quote <ArrowRight size={18} />
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
