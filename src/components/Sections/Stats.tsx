import React from 'react';
import { motion } from 'motion/react';
import { Users, BookOpen, Award, Globe } from 'lucide-react';

const stats = [
  { label: "Active Students", value: "450+", icon: Users, color: "bg-blue-100 text-blue-600" },
  { label: "Bilingual Staff", value: "32", icon: Globe, color: "bg-green-100 text-green-600" },
  { label: "Success Rate", value: "98%", icon: Award, color: "bg-yellow-100 text-yellow-600" },
  { label: "Years of Excellence", value: "15+", icon: BookOpen, color: "bg-purple-100 text-purple-600" },
];

export default function Stats() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm shadow-current/10`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-2 leading-none">{stat.value}</h3>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
