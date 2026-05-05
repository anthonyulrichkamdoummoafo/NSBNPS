import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, GraduationCap, Globe } from 'lucide-react';
import { NAV_LINKS } from '../../constants';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();

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
            ? "bg-white/80 backdrop-blur-xl shadow-lg border border-white/50" 
            : "bg-transparent"
        )}
      >
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform overflow-hidden border-2 border-slate-900">
            <img src="input_file_3.png" alt="NSBNPS Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "font-serif font-black text-xl leading-none tracking-tight transition-colors",
              isScrolled ? "text-slate-900" : "text-slate-900"
            )}>
              NSBNPS
            </span>
            <span className="text-[10px] font-black text-cm-green uppercase tracking-widest leading-none mt-1">
              Mokindi
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.href} 
              href={link.href}
              className="text-xs font-black uppercase tracking-[0.1em] text-slate-700 hover:text-cm-red transition-colors relative group"
            >
              {lang === 'EN' ? link.label_en : link.label_fr}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cm-red transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border-2 border-slate-900 text-xs font-black text-slate-900 hover:bg-slate-900 hover:text-white transition-all active:scale-95"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang}
          </button>
          
          <a 
            href="#admissions"
            className="hidden md:block bg-cm-red text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-cm-red/20 hover:bg-slate-900 transition-all active:scale-95"
          >
            {lang === 'EN' ? 'Enroll Now' : 'S\'inscrire'}
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
                key={link.href} 
                href={link.href}
                className="text-4xl font-serif font-black text-slate-900 hover:text-cm-red"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {lang === 'EN' ? link.label_en : link.label_fr}
              </a>
            ))}
            <div className="h-px bg-slate-100 my-2" />
            <div className="flex flex-col gap-4">
              <button 
               onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')}
               className="flex items-center gap-3 text-lg font-black text-slate-900 p-4 border-2 border-slate-900 rounded-2xl"
              >
                <Globe className="w-6 h-6 text-cm-green" /> 
                {lang === 'EN' ? 'Switch to French' : 'Changer en Anglais'}
              </button>
              <a 
                href="#admissions"
                className="w-full bg-cm-red text-white text-center py-5 rounded-2xl font-black text-xl shadow-xl shadow-cm-red/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {lang === 'EN' ? 'Start Admission' : 'Commencer l\'Inscription'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
