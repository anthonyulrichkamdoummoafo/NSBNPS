import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, GraduationCap, Globe } from 'lucide-react';
import { NAV_LINKS, SCHOOL_INFO } from '../../constants';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'EN' | 'FR'>('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 py-4 md:px-8",
        isScrolled ? "py-3" : "py-6"
      )}
    >
      <nav 
        className={cn(
          "max-w-7xl mx-auto rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500",
          isScrolled 
            ? "bg-white/70 backdrop-blur-xl shadow-lg border border-white/50" 
            : "bg-transparent"
        )}
      >
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "font-black text-xl leading-none tracking-tight transition-colors",
              isScrolled ? "text-slate-900" : "text-slate-900"
            )}>
              NSBNPS
            </span>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none mt-1">
              Mukundi
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(l => l === 'EN' ? 'FR' : 'EN')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95"
          >
            <Globe className="w-3.5 h-3.5 text-blue-500" />
            {lang}
          </button>
          
          <a 
            href="#admissions"
            className="hidden md:block bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-95"
          >
            Enroll Now
          </a>

          <button 
            className="lg:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-slate-100 lg:hidden flex flex-col gap-6"
          >
            {NAV_LINKS.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                className="text-2xl font-black text-slate-900 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-slate-100 my-2" />
            <div className="flex items-center justify-between">
              <button 
               onClick={() => setLang(l => l === 'EN' ? 'FR' : 'EN')}
               className="flex items-center gap-2 text-sm font-bold text-slate-600"
              >
                <Globe className="w-4 h-4" /> Switch Language ({lang})
              </button>
            </div>
            <a 
              href="#admissions"
              className="w-full bg-blue-600 text-white text-center py-4 rounded-2xl font-bold shadow-xl shadow-blue-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start Admission
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
