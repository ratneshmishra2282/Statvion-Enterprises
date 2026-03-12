
import React from 'react';
import { motion } from 'motion/react';
import { RoutePath } from '../types';
import { Linkedin, Instagram, Mail, Phone, MapPin, Twitter, Github } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  logoUrl?: string;
}

const Footer: React.FC<FooterProps> = ({ logoUrl }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-32 pb-16 border-t border-slate-800 overflow-hidden relative">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-[#0EA5E9] rounded-full filter blur-[150px] translate-y-1/2"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-8"
          >
            <a href={`#${RoutePath.HOME}`} className="inline-block hover:opacity-70 transition-opacity">
              <Logo variant="light" className="h-14" logoUrl={logoUrl} />
            </a>
            <p className="text-slate-400 leading-relaxed text-lg font-light">
              Empowering global enterprises through strategic technology leadership and engineering excellence.
            </p>
            <div className="flex space-x-6">
              <a href="https://linkedin.com/company/statvioninfotech/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#0EA5E9] transition-all hover:-translate-y-1"><Linkedin size={20} /></a>
              <a href="https://www.instagram.com/statvioninfotech/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#0EA5E9] transition-all hover:-translate-y-1"><Instagram size={20} /></a>
              <a href={`#${RoutePath.HOME}`} className="text-slate-500 hover:text-[#0EA5E9] transition-all hover:-translate-y-1"><Twitter size={20} /></a>
              <a href={`#${RoutePath.HOME}`} className="text-slate-500 hover:text-[#0EA5E9] transition-all hover:-translate-y-1"><Github size={20} /></a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h3 className="text-xs font-bold text-white mb-8 tracking-[0.3em] uppercase">Navigation</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href={`#${RoutePath.HOME}`} className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[#0EA5E9] transition-all group-hover:w-4"></span>Home</a></li>
              <li><a href={`#${RoutePath.ABOUT}`} className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[#0EA5E9] transition-all group-hover:w-4"></span>About</a></li>
              <li><a href={`#${RoutePath.SERVICES}`} className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[#0EA5E9] transition-all group-hover:w-4"></span>Services</a></li>
              <li><a href={`#${RoutePath.CONTACT}`} className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[#0EA5E9] transition-all group-hover:w-4"></span>Contact</a></li>
              <li><a href={`#${RoutePath.ADMIN_LOGIN}`} className="hover:text-[#0EA5E9] transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[#FF9933] transition-all group-hover:w-4"></span>Admin Login</a></li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h3 className="text-xs font-bold text-white mb-8 tracking-[0.3em] uppercase">Expertise</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[#0EA5E9] transition-all group-hover:w-4"></span>IT Infrastructure</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[#0EA5E9] transition-all group-hover:w-4"></span>Business Strategy</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[#0EA5E9] transition-all group-hover:w-4"></span>App Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[#0EA5E9] transition-all group-hover:w-4"></span>Cloud Solutions</a></li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <h3 className="text-xs font-bold text-white mb-8 tracking-[0.3em] uppercase">Connect</h3>
            <ul className="space-y-6 text-sm font-medium">
              <li className="flex items-start gap-4 group cursor-pointer">
                <MapPin className="text-[#FF9933] shrink-0 group-hover:scale-110 transition-transform" size={18} />
                <span className="text-slate-400 group-hover:text-white transition-colors">Lucknow Uttar Pradesh.</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <Phone className="text-[#FF9933] shrink-0 group-hover:scale-110 transition-transform" size={18} />
                <span className="text-slate-400 group-hover:text-white transition-colors">+91 6388205751</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <Mail className="text-[#FF9933] shrink-0 group-hover:scale-110 transition-transform" size={18} />
                <span className="text-slate-400 group-hover:text-white transition-colors">contact@statvioninfotech.in</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <p className="text-xs text-slate-500 tracking-widest uppercase font-bold">
            &copy; {new Date().getFullYear()} STATVION INFOTECH.
          </p>
          <div className="flex gap-8 text-xs text-slate-500 tracking-widest uppercase font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href={`#${RoutePath.ADMIN_LOGIN}`} className="hover:text-[#0EA5E9] transition-colors">Admin Portal</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
