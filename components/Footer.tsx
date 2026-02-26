
import React from 'react';
import { RoutePath } from '../types';
import { Linkedin, Twitter, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <a href={`#${RoutePath.HOME}`} className="inline-block hover:opacity-80 transition-opacity">
              <Logo variant="light" className="h-12" />
            </a>
            <p className="text-slate-400 leading-relaxed">
              Empowering businesses through cutting-edge IT solutions and strategic consultancy. Your end-to-end partner for digital excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0EA5E9] hover:text-white transition-all"><Linkedin size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0EA5E9] hover:text-white transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0EA5E9] hover:text-white transition-all"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0EA5E9] hover:text-white transition-all"><Instagram size={18} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-[#0EA5E9] pl-4">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href={`#${RoutePath.HOME}`} className="hover:text-[#0EA5E9] transition-colors">Home</a></li>
              <li><a href={`#${RoutePath.ABOUT}`} className="hover:text-[#0EA5E9] transition-colors">About Us</a></li>
              <li><a href={`#${RoutePath.SERVICES}`} className="hover:text-[#0EA5E9] transition-colors">Services</a></li>
              <li><a href={`#${RoutePath.CONTACT}`} className="hover:text-[#0EA5E9] transition-colors">Contact</a></li>
              <li><a href={`#${RoutePath.ADMIN_LOGIN}`} className="hover:text-[#0EA5E9] transition-colors text-sm opacity-50">Admin Access</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-[#0EA5E9] pl-4">Services</h3>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-[#0EA5E9] transition-colors">IT Infrastructure</a></li>
              <li><a href="#" className="hover:text-[#0EA5E9] transition-colors">Business Strategy</a></li>
              <li><a href="#" className="hover:text-[#0EA5E9] transition-colors">App Development</a></li>
              <li><a href="#" className="hover:text-[#0EA5E9] transition-colors">Cloud Solutions</a></li>
              <li><a href="#" className="hover:text-[#0EA5E9] transition-colors">AI & Data Analytics</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-[#FF9933] pl-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#FF9933] shrink-0" size={20} />
                <span>123 Innovation Drive, Tech City, ST 54321</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#FF9933] shrink-0" size={20} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#FF9933] shrink-0" size={20} />
                <span>contact@statvion.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} STATVION INFOTECH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
