import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Maximize2, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Gallery() {
  const { lang } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
      img: "christ.jpg" 
    },
    { 
      id: 5, 
      title: lang === 'EN' ? "Science Lab" : "Laboratoire de Sciences", 
      category: lang === 'EN' ? "Academic" : "Académique", 
      img: "fun3.jpg" 
    },
  ];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length)),
    [galleryItems.length]
  );
  const showNext = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % galleryItems.length)),
    [galleryItems.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

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
           <button
             onClick={() => setLightboxIndex(0)}
             className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-cm-red transition-colors shadow-xl shadow-slate-200 uppercase text-xs tracking-widest"
           >
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
               onClick={() => setLightboxIndex(idx)}
               className={`group relative overflow-hidden rounded-[2rem] shadow-sm cursor-pointer ${item.size || ''}`}
             >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Persistent small badge: visible without hover, so touch devices see the tap affordance */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                   <Maximize2 className="w-3.5 h-3.5" />
                </div>
                {/* Persistent bottom gradient sliver with title, always visible at low opacity so touch users
                    know there's content here without needing a hover state */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none flex items-end p-4">
                   <h4 className="text-white text-sm font-black truncate">{item.title}</h4>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                   <span className="text-blue-400 text-xs font-black uppercase tracking-widest mb-2">{item.category}</span>
                   <h4 className="text-white text-2xl font-black">{item.title}</h4>
                   <div className="mt-4 flex items-center gap-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                        aria-label={lang === 'EN' ? 'View full size' : 'Voir en taille réelle'}
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all"
                      >
                         <Maximize2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); window.open(item.img, '_blank', 'noopener,noreferrer'); }}
                        aria-label={lang === 'EN' ? 'Open image in new tab' : "Ouvrir l'image dans un nouvel onglet"}
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all"
                      >
                         <ExternalLink className="w-4 h-4" />
                      </button>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <button
              onClick={closeLightbox}
              aria-label={lang === 'EN' ? 'Close' : 'Fermer'}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              aria-label={lang === 'EN' ? 'Previous photo' : 'Photo précédente'}
              className="absolute left-4 md:left-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              aria-label={lang === 'EN' ? 'Next photo' : 'Photo suivante'}
              className="absolute right-4 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
            >
              <img
                src={galleryItems[lightboxIndex].img}
                alt={galleryItems[lightboxIndex].title}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-6 text-center">
                <span className="text-blue-400 text-xs font-black uppercase tracking-widest">{galleryItems[lightboxIndex].category}</span>
                <h4 className="text-white text-2xl font-black mt-1">{galleryItems[lightboxIndex].title}</h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
