import React from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon, Play, ExternalLink } from 'lucide-react';

const galleryItems = [
  { id: 1, title: "Cultural Day", category: "Event", size: "col-span-2 row-span-2", img: "https://images.unsplash.com/photo-1544367350-f8fa266e7552?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Science Lab", category: "Academic", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600" },
  { id: 3, title: "Football Match", category: "Sports", img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600" },
  { id: 4, title: "Class Project", category: "Nursery", size: "col-span-2", img: "https://images.unsplash.com/photo-1524388658896-67704badaba1?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "Music Class", category: "Arts", img: "https://images.unsplash.com/photo-1514320298574-2b12e20ffda3?auto=format&fit=crop&q=80&w=600" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
           <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                School Life
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1]">
                 Moments of <span className="text-orange-500 italic">Joy</span> & Learning.
              </h2>
           </div>
           <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-colors shadow-xl shadow-slate-200">
              <ImageIcon className="w-5 h-5" /> View All Photos
           </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
           {galleryItems.map((item, idx) => (
             <motion.div 
               key={item.id}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className={`group relative overflow-hidden rounded-[2rem] shadow-sm ${item.size || ''}`}
             >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                   <span className="text-blue-400 text-xs font-black uppercase tracking-widest mb-2">{item.category}</span>
                   <h4 className="text-white text-2xl font-black">{item.title}</h4>
                   <div className="mt-4 flex items-center gap-4">
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all">
                         <Play className="w-4 h-4 fill-current" />
                      </button>
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all">
                         <ExternalLink className="w-4 h-4" />
                      </button>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
