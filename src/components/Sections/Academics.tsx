import React from 'react';
import { motion } from 'motion/react';
import { Book, Palette, Music, Calculator, Languages, Smile } from 'lucide-react';

const programs = [
  {
    title: "Nursery Section",
    desc: "A warm, nurturing environment where children from ages 2.5 to 5 begin their educational journey.",
    subjects: ["Sensory play", "Basic Numeracy", "Bilingual Songs", "Art & Creativity"],
    icon: Smile,
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-100"
  },
  {
    title: "Primary Section",
    desc: "A robust curriculum from Class 1 to Class 6, focusing on academic rigor and character building.",
    subjects: ["English & French", "Mathematics", "Science", "Citizenship", "ICT"],
    icon: Calculator,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100"
  }
];

export default function Academics() {
  return (
    <section id="academics" className="py-32 px-6 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            Educational Path
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
            Our <span className="text-green-600 italic">Bilingual</span> Curriculum.
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We provide a world-class education that respects both English and French systems, preparing students for a global future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {programs.map((program, idx) => {
            const Icon = program.icon;
            return (
              <motion.div 
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`p-12 rounded-[2.5rem] bg-white border ${program.border} shadow-xl shadow-slate-200/50 group hover:-translate-y-2 transition-all duration-500`}
              >
                <div className={`w-20 h-20 ${program.bg} ${program.color} rounded-3xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform shadow-inner`}>
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-6">{program.title}</h3>
                <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                  {program.desc}
                </p>
                <div className="space-y-4">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Key Focus Areas</p>
                  <div className="grid grid-cols-2 gap-4">
                    {program.subjects.map(s => (
                       <div key={s} className="flex items-center gap-3 text-slate-700 font-medium">
                          <div className={`w-2 h-2 rounded-full ${program.bg.replace('50', '400')}`} />
                          {s}
                       </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Bilingualism", desc: "Fluent in English & French from Day 1.", icon: Languages },
             { title: "Creativity", desc: "Music, Arts, and Expression modules.", icon: Palette },
             { title: "Technology", desc: "Early introduction to digital literacy.", icon: Book }
           ].map((item) => (
             <div key={item.title} className="p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-white flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-blue-600 mb-6">
                   <item.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-600">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
