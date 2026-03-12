
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoutePath } from '../types';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  logoUrl?: string;
}

const Navbar: React.FC<NavbarProps> = ({ logoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: RoutePath.HOME },
    { label: 'About', path: RoutePath.ABOUT },
    { label: 'Services', path: RoutePath.SERVICES },
    { label: 'Sectors', path: RoutePath.SECTORS },
    { label: 'Contact', path: RoutePath.CONTACT },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 bg-white/30 backdrop-blur-md z-50 border-b border-slate-200/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center">
            <a href={RoutePath.HOME} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Logo variant="dark" className="h-12" logoUrl={logoUrl} />
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-12">
            {navItems.map((item, i) => (
              <motion.a
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                key={item.path}
                href={item.path}
                className="text-slate-900 hover:text-[#1E3A8A] text-xs font-bold tracking-[0.3em] uppercase transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#1E3A8A] transition-all group-hover:w-full"></span>
              </motion.a>
            ))}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-6 border-l border-slate-300 pl-6"
            >
              <a
                href={RoutePath.CONTACT}
                className="bg-slate-900 text-white px-8 py-3 rounded-full text-xs font-bold tracking-[0.1em] uppercase hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-3 hover:scale-105"
              >
                Speak with a Partner <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/90 backdrop-blur-xl border-b border-slate-200 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-slate-900 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
