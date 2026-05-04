import React from 'react';
import { motion } from 'motion/react';
import { Users, BookOpen, Award, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Stats() {
  const { lang } = useLanguage();

  const stats = [
    { 
      label: lang === 'EN' ? "Active Students" : "Éleves Actifs", 
      value: "450+", 
      icon: Users, 
      color: "bg-cm-green text-white" 
    },
    { 
      label: lang === 'EN' ? "Bilingual Staff" : "Personnel Bilingue", 
      value: "32", 
      icon: Globe, 
      color: "bg-cm-red text-white" 
    },
    { 
      label: lang === 'EN' ? "Success Rate" : "Taux de Réussite", 
      value: "98%", 
      icon: Award, 
      color: "bg-cm-yellow text-slate-900" 
    },
    { 
      label: lang === 'EN' ? "Years of Excellence" : "Années d'Excellence", 
      value: "15+", 
      icon: BookOpen, 
      color: "bg-slate-900 text-white" 
    },
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-20 h-20 ${stat.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-current/10`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-serif font-black text-slate-900 mb-2 leading-none">{stat.value}</h3>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest leading-none mt-2">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
