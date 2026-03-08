
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
      className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-2xl z-50 border-b border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center">
            <a href={`#${RoutePath.HOME}`} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Logo variant="light" className="h-12" logoUrl={logoUrl} />
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item, i) => (
              <motion.a
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                key={item.path}
                href={`#${item.path}`}
                className="text-slate-300 hover:text-[#0EA5E9] text-xs font-bold tracking-[0.2em] uppercase transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#0EA5E9] transition-all group-hover:w-full"></span>
              </motion.a>
            ))}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-6 border-l border-slate-800 pl-6"
            >
              <a
                href={`#${RoutePath.ADMIN_LOGIN}`}
                className="text-slate-400 hover:text-[#0EA5E9] text-xs font-bold tracking-[0.1em] uppercase transition-colors"
              >
                Admin
              </a>
              <a
                href={`#${RoutePath.CONTACT}`}
                className="bg-white text-slate-950 px-8 py-3 rounded-full text-xs font-bold tracking-[0.1em] uppercase hover:bg-slate-200 transition-all shadow-xl shadow-black/10 flex items-center gap-3 hover:scale-105"
              >
                Get Started <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300">
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
            className="md:hidden bg-black border-b border-slate-800 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  key={item.path}
                  href={`#${item.path}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-800 rounded-lg"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="border-t border-slate-800 my-2 pt-2"
              >
                <a
                  href={`#${RoutePath.ADMIN_LOGIN}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg"
                >
                  Admin Portal
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
