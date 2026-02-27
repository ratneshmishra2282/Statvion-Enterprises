
import React, { useState } from 'react';
import { RoutePath } from '../types';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: RoutePath.HOME },
    { label: 'About', path: RoutePath.ABOUT },
    { label: 'Services', path: RoutePath.SERVICES },
    { label: 'Sectors', path: RoutePath.SECTORS },
    { label: 'Contact', path: RoutePath.CONTACT },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-2xl z-50 border-b border-black/[0.03]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center">
            <a href={`#${RoutePath.HOME}`} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Logo className="h-12" />
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={`#${item.path}`}
                className="text-slate-900 hover:text-[#0EA5E9] text-xs font-bold tracking-[0.2em] uppercase transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#0EA5E9] transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a
              href={`#${RoutePath.CONTACT}`}
              className="bg-slate-950 text-white px-8 py-3 rounded-full text-xs font-bold tracking-[0.1em] uppercase hover:bg-slate-800 transition-all shadow-xl shadow-black/10 flex items-center gap-3"
            >
              Get Started <ArrowRight size={14} />
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={`#${item.path}`}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
