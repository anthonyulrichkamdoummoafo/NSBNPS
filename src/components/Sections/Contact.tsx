import React from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Facebook, Twitter, Instagram, ArrowUpRight } from 'lucide-react';
import { SCHOOL_INFO, NAV_LINKS } from '../../constants';
import { useLanguage } from '../../context/LanguageContext';

export default function Contact() {
  const { lang, t } = useLanguage();

  return (
    <footer id="contact" className="bg-slate-950 pt-32 pb-12 px-6 overflow-hidden relative">
      {/* Decorative text with Toghu feel */}
      <div className="absolute top-20 right-[-10%] text-white/[0.02] text-[25vw] font-serif font-black pointer-events-none select-none">
        NSBNPS
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start mb-32">
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="flex gap-1">
                 <div className="w-2 h-10 bg-cm-green" />
                 <div className="w-2 h-10 bg-cm-red" />
                 <div className="w-2 h-10 bg-cm-yellow" />
              </div>
              <h2 className="text-3xl font-serif font-black text-white">NSBNPS Mukundi</h2>
            </div>
            
            <h3 className="text-6xl font-serif font-black text-white leading-[0.9] mb-12 max-w-md">
              {lang === 'EN' ? (
                <>The Pride of <br /><span className="text-cm-yellow italic underline decoration-cm-red decoration-2 underline-offset-8">Limbe</span>.</>
              ) : (
                <>La Fierté de <br /><span className="text-cm-yellow italic underline decoration-cm-red decoration-2 underline-offset-8">Limbe</span>.</>
              )}
            </h3>

            <div className="space-y-10 relative z-10">
               <div className="flex gap-6 group cursor-pointer">
                  <div className="w-14 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-cm-green group-hover:border-cm-green transition-all">
                     <MapPin className="w-6 h-6 text-cm-green" />
                  </div>
                  <div>
                     <p className="text-xs font-black text-cm-green uppercase tracking-widest mb-1">{t.contact.location_label}</p>
                     <p className="text-xl text-white font-black leading-tight">{SCHOOL_INFO.location}</p>
                     <p className="text-slate-400 text-sm mt-1 uppercase font-bold tracking-wider">
                        {lang === 'EN' ? "South West Region, Cameroon" : "Région du Sud-Ouest, Cameroun"}
                     </p>
                  </div>
               </div>

               <div className="flex gap-6 group cursor-pointer">
                  <div className="w-14 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-cm-red group-hover:border-cm-red transition-all">
                     <Phone className="w-6 h-6 text-cm-red" />
                  </div>
                  <div>
                     <p className="text-xs font-black text-cm-red uppercase tracking-widest mb-1">{t.contact.phone_label}</p>
                     {SCHOOL_INFO.contact.phone.map(p => (
                        <p key={p} className="text-xl text-white font-black">{p}</p>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-3xl p-10 md:p-16 border border-white/10 backdrop-blur-md relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 toghu-pattern opacity-10 -mr-16 -mt-16 group-hover:rotate-45 transition-transform duration-1000 pointer-events-none" />
             <h4 className="text-2xl font-serif font-black text-white mb-8">{t.contact.form_title}</h4>
             <form className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                   <input type="text" placeholder={t.contact.form_name} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cm-yellow transition-all" />
                   <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cm-yellow transition-all" />
                </div>
                <input type="text" placeholder={lang === 'EN' ? "Subject" : "Sujet"} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cm-yellow transition-all" />
                <textarea rows={4} placeholder={t.contact.form_msg} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cm-yellow transition-all" />
                <button className="w-full bg-cm-red text-white font-black py-5 rounded-xl flex items-center justify-center gap-3 hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-cm-red/10">
                   {t.contact.form_submit} <ArrowUpRight className="w-5 h-5" />
                </button>
             </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-slate-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} NSBNPS Mukundi. Limbe, {lang === 'EN' ? 'Cameroon' : 'Cameroun'}.
           </p>
           
           <div className="flex gap-8">
              {NAV_LINKS.map(link => (
                 <a key={link.href} href={link.href} className="text-slate-400 hover:text-white text-sm font-bold transition-colors uppercase tracking-widest">
                    {lang === 'EN' ? link.label_en : link.label_fr}
                 </a>
              ))}
           </div>

           <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                 <a key={idx} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400 hover:bg-cm-red hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                 </a>
              ))}
           </div>
        </div>
      </div>
    </footer>
  );
}
