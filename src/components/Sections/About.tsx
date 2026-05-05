import React from 'react';
import { motion } from 'motion/react';
import { SCHOOL_INFO } from '../../constants';
import { Target, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function About() {
  const { lang, t } = useLanguage();

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden bg-white">
      {/* School uniform inspired background deco */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] uniform-plaid opacity-10 -mr-48 -mt-24 rotate-12" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-uniform-red rounded-full blur-3xl opacity-10 -ml-48 -mb-24" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-900 translate-x-4 translate-y-4">
             <img 
               src="graduate.png" 
               alt="School Activity"
               className="w-full h-96 object-cover"
             />
          </div>
          <div className="absolute inset-0 border-4 border-uniform-tan rounded-2xl -translate-x-4 -translate-y-4" />
          
          <div className="absolute -bottom-10 -right-4 bg-uniform-navy p-8 rounded-xl shadow-2xl max-w-xs border-l-8 border-uniform-red z-20">
             <h4 className="text-xl font-serif font-black text-white mb-2">{t.about.proprietress}</h4>
             <p className="text-sm font-bold text-uniform-tan uppercase tracking-widest mb-4">{t.about.role}</p>
             <p className="text-slate-300 text-sm italic leading-relaxed">
               "{t.about.quote}"
             </p>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="mb-12">
            <div className="flex gap-2 mb-6">
              <div className="w-12 h-2 bg-cm-green rounded-full" />
              <div className="w-8 h-2 bg-cm-red rounded-full" />
              <div className="w-4 h-2 bg-cm-yellow rounded-full" />
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-black text-slate-900 leading-[1] mb-10">
              {lang === 'EN' ? (
                <>Honoring <br />Our <span className="text-uniform-red">Heritage.</span></>
              ) : (
                <>Honorer <br />Notre <span className="text-uniform-red">Héritage.</span></>
              )}
            </h2>
            <p className="text-xl text-slate-700 leading-relaxed font-medium mb-12">
              {t.about.desc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
             <div className="p-8 bg-slate-50 rounded-2xl border-b-4 border-uniform-navy shadow-sm group hover:bg-uniform-navy hover:text-white transition-all duration-500">
                <div className="w-12 h-12 bg-uniform-navy text-white rounded-xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-uniform-navy">
                   <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-black mb-4">{t.about.mission_title}</h3>
                <p className="text-sm leading-relaxed opacity-80">
                  {lang === 'EN' ? SCHOOL_INFO.mission_en : SCHOOL_INFO.mission_fr}
                </p>
             </div>
             <div className="p-8 bg-slate-50 rounded-2xl border-b-4 border-uniform-tan shadow-sm group hover:bg-uniform-tan hover:text-slate-900 transition-all duration-500">
                <div className="w-12 h-12 bg-uniform-tan text-white rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-uniform-tan">
                   <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-black mb-4">{t.about.vision_title}</h3>
                <p className="text-sm leading-relaxed opacity-80">
                  {lang === 'EN' ? SCHOOL_INFO.vision_en : SCHOOL_INFO.vision_fr}
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
