
import React from 'react';
import { motion } from 'motion/react';
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
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative pt-24 pb-48 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#FF9933] rounded-full mix-blend-multiply filter blur-[120px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0EA5E9] rounded-full mix-blend-multiply filter blur-[120px]"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#FF9933] font-bold uppercase tracking-[0.3em] text-xs mb-8"
            >
              Industry Expertise
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-light text-white mb-10 tracking-tight leading-[0.9]"
            >
              Sectors We <span className="italic">Empower</span>.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl text-slate-400 max-w-3xl leading-relaxed font-light"
            >
              Statvion Infotech provides specialized IT solutions and consultancy across a diverse range of industries, 
              tailoring cutting-edge technology to unique enterprise challenges.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-40 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {sectors.map((sector, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                className="cxo-card p-10 rounded-3xl group hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500 border border-slate-800"
              >
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#FF9933] group-hover:text-white transition-all duration-500">
                  {React.cloneElement(sector.icon as React.ReactElement, { size: 32, strokeWidth: 1.5 })}
                </div>
                <h3 className="text-xl font-serif font-light text-white mb-6 tracking-tight group-hover:text-[#0EA5E9] transition-colors">
                  {sector.name}
                </h3>
                <p className="text-slate-400 font-light leading-relaxed">
                  Tailored digital transformation and strategic IT consulting for the {sector.name.toLowerCase()} industry.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-serif font-light text-white mb-12 tracking-tight"
          >
            Ready to transform your <span className="italic">industry</span> operations?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a 
              href="#/contact" 
              className="inline-flex items-center px-14 py-6 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-all shadow-2xl shadow-black/10 hover:-translate-y-1"
            >
              Consult Our Experts
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Sectors;
