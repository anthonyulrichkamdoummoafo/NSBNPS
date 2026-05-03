import React from 'react';
import { motion } from 'motion/react';
import { SCHOOL_INFO } from '../../constants';
import { Heart, Target, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      {/* African pattern inspired background deco */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl opacity-50 -mr-48 -mt-24" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50 -ml-48 -mb-24" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative"
        >
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl">
             <img 
               src="https://images.unsplash.com/photo-1544367350-f8fa266e7552?auto=format&fit=crop&q=80&w=1200" 
               alt="School Activity"
               className="w-full aspect-[4/5] object-cover"
             />
             <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
          </div>
          
          <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl max-w-xs border border-slate-100 z-20">
             <h4 className="text-xl font-black text-slate-900 mb-2">Madame Djoubang Desiree</h4>
             <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Proprietress</p>
             <p className="text-slate-600 text-sm italic leading-relaxed">
               "Our mission is to nurture the leaders of tomorrow with discipline and bilingual excellence."
             </p>
          </div>
          
          <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-yellow-400 rounded-full opacity-20" />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              Our Legacy
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
              Decades of <span className="text-blue-600 italic">Bilingual</span> Brilliance.
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              Located in the heart of Isokolo Mokindi Village, Limbe, NSBNPS has been a beacon of quality education for children in Cameroon. We blend modern pedagogy with traditional values.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
             <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4">
                   <Target className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Our Mission</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {SCHOOL_INFO.mission}
                </p>
             </div>
             <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-green-200 transition-colors">
                <div className="w-10 h-10 bg-green-600 text-white rounded-xl flex items-center justify-center mb-4">
                   <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Our Vision</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {SCHOOL_INFO.vision}
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
