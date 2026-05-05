import React from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon, Play, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Gallery() {
  const { lang } = useLanguage();

  const galleryItems = [
    { 
      id: 1, 
      title: lang === 'EN' ? "Excursion 2023" : "Excursion 2023", 
      category: lang === 'EN' ? "Excursion" : "Sortie", 
      size: "col-span-2 row-span-2", 
      img: "fun3.jpg" 
    },
    { 
      id: 2, 
      title: lang === 'EN' ? "Merry-go-round Fun" : "Manège Amusant", 
      category: lang === 'EN' ? "Excursion" : "Sortie", 
      img: "fun2.jpg" 
    },
    { 
      id: 3, 
      title: lang === 'EN' ? "Trampoline Day" : "Journée Trampoline", 
      category: lang === 'EN' ? "Excursion" : "Sortie", 
      img: "fun1.jpg" 
    },
    { 
      id: 4, 
      title: lang === 'EN' ? "Christmas Party 2021" : "Journée Culturelle 2021", 
      category: lang === 'EN' ? "Event" : "Événement", 
      size: "col-span-2", 
      img: "christ.png" 
    },
    { 
      id: 5, 
      title: lang === 'EN' ? "Science Lab" : "Laboratoire de Sciences", 
      category: lang === 'EN' ? "Academic" : "Académique", 
      img: "fun3.jpg" 
    },
  ];

  return (
    <section id="gallery" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
           <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-widest mb-6">
                Excursion 2023
              </span>
              <h2 className="text-5xl md:text-8xl font-serif font-black text-slate-900 leading-[0.9]">
                 {lang === 'EN' ? (
                   <>Memorable <br />Moments of <span className="text-cm-red italic underline decoration-cm-yellow underline-offset-8">Joy.</span></>
                 ) : (
                   <>Des Moments <br />de <span className="text-cm-red italic underline decoration-cm-yellow underline-offset-8">Joie</span> Mémorables.</>
                 )}
              </h2>
           </div>
           <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-cm-red transition-colors shadow-xl shadow-slate-200 uppercase text-xs tracking-widest">
              <ImageIcon className="w-5 h-5" /> {lang === 'EN' ? 'View All Photos' : 'Voir Toutes les Photos'}
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
