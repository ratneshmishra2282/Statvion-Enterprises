
import React from 'react';
import { RoutePath } from '../types';
import { Linkedin, Twitter, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-32 pb-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-4 space-y-8">
            <a href={`#${RoutePath.HOME}`} className="inline-block hover:opacity-70 transition-opacity">
              <Logo variant="light" className="h-14" />
            </a>
            <p className="text-slate-400 leading-relaxed text-lg font-light">
              Empowering global enterprises through strategic technology leadership and engineering excellence.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-500 hover:text-[#0EA5E9] transition-all"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-[#0EA5E9] transition-all"><Twitter size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-[#0EA5E9] transition-all"><Facebook size={20} /></a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold text-white mb-8 tracking-[0.3em] uppercase">Navigation</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href={`#${RoutePath.HOME}`} className="hover:text-white transition-colors">Home</a></li>
              <li><a href={`#${RoutePath.ABOUT}`} className="hover:text-white transition-colors">About</a></li>
              <li><a href={`#${RoutePath.SERVICES}`} className="hover:text-white transition-colors">Services</a></li>
              <li><a href={`#${RoutePath.CONTACT}`} className="hover:text-white transition-colors">Contact</a></li>
              <li><a href={`#${RoutePath.ADMIN_LOGIN}`} className="hover:text-[#0EA5E9] transition-colors">Admin Login</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold text-white mb-8 tracking-[0.3em] uppercase">Expertise</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">IT Infrastructure</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Business Strategy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">App Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cloud Solutions</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold text-white mb-8 tracking-[0.3em] uppercase">Connect</h3>
            <ul className="space-y-6 text-sm font-medium">
              <li className="flex items-start gap-4">
                <MapPin className="text-[#FF9933] shrink-0" size={18} />
                <span className="text-slate-400">123 Innovation Drive, Tech City, ST 54321</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-[#FF9933] shrink-0" size={18} />
                <span className="text-slate-400">contact@statvion.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs text-slate-500 tracking-widest uppercase font-bold">
            &copy; {new Date().getFullYear()} STATVION INFOTECH.
          </p>
          <div className="flex gap-8 text-xs text-slate-500 tracking-widest uppercase font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href={`#${RoutePath.ADMIN_LOGIN}`} className="hover:text-[#0EA5E9] transition-colors">Admin Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
