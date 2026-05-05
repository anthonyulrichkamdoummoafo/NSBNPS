import React from 'react';
import { motion } from 'motion/react';
import { Calculator, Smile, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Academics() {
  const { lang, t } = useLanguage();

  const programs = [
    {
      title: t.academics.nursery,
      desc: t.academics.nursery_desc,
      subjects: lang === 'EN' 
        ? ["Sensory play", "Basic Numeracy", "Bilingual Songs", "Art & Creativity"]
        : ["Jeux sensoriels", "Numératie", "Chants bilingues", "Art et Créativité"],
      icon: Smile,
    },
    {
      title: t.academics.primary,
      desc: t.academics.primary_desc,
      subjects: lang === 'EN'
        ? ["English & French", "Mathematics", "Science", "Citizenship", "ICT"]
        : ["Anglais et Français", "Mathématiques", "Sciences", "Citoyenneté", "TIC"],
      icon: Calculator,
    }
  ];

  return (
    <section id="academics" className="py-32 px-6 bg-uniform-navy relative overflow-hidden">
      {/* Subtle school plaid pattern for dark bg */}
      <div className="absolute inset-0 uniform-plaid opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <div className="flex justify-center gap-1 mb-8">
            <div className="w-8 h-2 bg-uniform-navy border border-white/20" />
            <div className="w-8 h-2 bg-uniform-red" />
            <div className="w-8 h-2 bg-uniform-tan" />
          </div>
          <h2 className="text-5xl md:text-8xl font-serif font-black text-white leading-[1] mb-8">
            {lang === 'EN' ? (
              <>Pathways to <span className="text-uniform-red italic">Prestige.</span></>
            ) : (
              <>Parcours vers le <span className="text-uniform-red italic">Prestige.</span></>
            )}
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            {t.academics.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {programs.map((program, idx) => {
            const Icon = program.icon;
            const borderClass = idx === 0 ? 'border-uniform-red' : 'border-uniform-tan';
            const bgClass = idx === 0 ? 'bg-uniform-red text-white' : 'bg-uniform-tan text-white';
            return (
              <motion.div 
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`p-12 rounded-3xl border-l-8 ${borderClass} ${bgClass} shadow-2xl group transition-all duration-500`}
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-serif font-black mb-6">{program.title}</h3>
                <p className="opacity-90 text-lg mb-10 leading-relaxed font-medium">
                  {program.desc}
                </p>
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] mb-6 opacity-60">
                    {lang === 'EN' ? 'Program Highlights' : 'Points Forts du Programme'}
                  </p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {program.subjects.map(s => (
                       <div key={s} className="flex items-center gap-3 font-bold text-sm">
                          <Check className="w-4 h-4 opacity-70" />
                          {s}
                       </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
