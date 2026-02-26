
import React from 'react';
import { Building2, HeartPulse, ShoppingCart, Gem, BookOpen, Hotel, Milk, Factory, Waves, Trophy, Utensils, FlaskConical, Car, Cpu, Package, Warehouse, BarChart3, Wallet, Construction, GraduationCap, Landmark, ShieldCheck } from 'lucide-react';

const sectors = [
  { name: 'Healthcare & Pharma', icon: <HeartPulse className="text-rose-500" /> },
  { name: 'Retail', icon: <ShoppingCart className="text-blue-500" /> },
  { name: 'Gems and Jewelry', icon: <Gem className="text-amber-500" /> },
  { name: 'Publication', icon: <BookOpen className="text-indigo-500" /> },
  { name: 'Mall and Facilities', icon: <Hotel className="text-emerald-500" /> },
  { name: 'Dairy', icon: <Milk className="text-sky-500" /> },
  { name: 'Manufacturing and Production', icon: <Factory className="text-slate-600" /> },
  { name: 'Oil and Gas', icon: <Waves className="text-cyan-600" /> },
  { name: 'Sports', icon: <Trophy className="text-yellow-500" /> },
  { name: 'F&B / Consumer Products', icon: <Utensils className="text-orange-500" /> },
  { name: 'Chemical', icon: <FlaskConical className="text-lime-600" /> },
  { name: 'Car Rental', icon: <Car className="text-red-500" /> },
  { name: 'High Tech and Electronics', icon: <Cpu className="text-purple-500" /> },
  { name: 'Automotive', icon: <Car className="text-blue-600" /> },
  { name: 'Packaging', icon: <Package className="text-brown-500" /> },
  { name: 'Warehouse', icon: <Warehouse className="text-gray-600" /> },
  { name: 'Trading and Distribution', icon: <BarChart3 className="text-green-600" /> },
  { name: 'Fintech', icon: <Wallet className="text-teal-500" /> },
  { name: 'ECO (Engineering, Construction & Operations)', icon: <Construction className="text-orange-600" /> },
  { name: 'Education', icon: <GraduationCap className="text-blue-700" /> },
  { name: 'Public Sector', icon: <Landmark className="text-slate-700" /> },
  { name: 'Banking, Financial Services & Insurance (BFSI)', icon: <ShieldCheck className="text-indigo-700" /> },
];

const Sectors: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF9933] rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0EA5E9] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
            Industry <span className="text-[#FF9933]">Sectors</span> We Serve
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            STATVION INFOTECH provides specialized IT solutions and consultancy across a diverse range of industries, 
            empowering businesses with cutting-edge technology tailored to their unique challenges.
          </p>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sectors.map((sector, index) => (
              <div 
                key={index}
                className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#FF9933]/10 transition-colors">
                  {React.cloneElement(sector.icon as React.ReactElement, { size: 36 })}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#FF9933] transition-colors">
                  {sector.name}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  Tailored digital transformation and strategic IT consulting for the {sector.name.toLowerCase()} industry.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#FF9933]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-10 tracking-tight">Ready to transform your industry operations?</h2>
          <a 
            href="#/contact" 
            className="inline-flex items-center px-10 py-5 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20"
          >
            Consult Our Experts
          </a>
        </div>
      </section>
    </div>
  );
};

export default Sectors;
