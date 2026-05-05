import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Send, MapPin, ClipboardList } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Admissions() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { lang, t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  const steps = [
    { 
      icon: CheckCircle, 
      title: lang === 'EN' ? "Cameroonian Values" : "Valeurs Camerounaises", 
      desc: lang === 'EN' ? "Education rooted in our unique heritage and bilingual tradition." : "Éducation enracinée dans notre héritage unique et notre tradition bilingue." 
    },
    { 
      icon: ClipboardList, 
      title: lang === 'EN' ? "Simple Enrollment" : "Inscription Simple", 
      desc: lang === 'EN' ? "Easy documentation process handled by our friendly staff." : "Processus de documentation facile géré par notre personnel amical." 
    },
    { 
      icon: MapPin, 
      title: lang === 'EN' ? "Campus Visits" : "Visites du Campus", 
      desc: lang === 'EN' ? "Tour our North West inspired grounds in Mokindi Village." : "Visitez nos locaux inspirés du Nord-Ouest au village Mokindi." 
    }
  ];

  return (
    <section id="admissions" className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Background Orbs with flag colors */}
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] uniform-plaid opacity-5 -mr-48 -mt-24 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-uniform-navy rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-uniform-tan rounded-full blur-3xl opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="text-slate-900">
            <div className="flex gap-1 mb-8">
              <div className="w-8 h-12 bg-uniform-navy shadow-lg" />
              <div className="w-8 h-12 bg-uniform-red flex items-center justify-center text-white font-black text-xs shadow-lg">★</div>
              <div className="w-8 h-12 bg-uniform-tan shadow-lg" />
            </div>
            <h2 className="text-5xl md:text-8xl font-serif font-black leading-[0.9] mb-8">
              {lang === 'EN' ? (
                <>Secure Your Child's <span className="text-uniform-red">Spot.</span></>
              ) : (
                <>Réservez la Place de Votre <span className="text-uniform-red">Enfant.</span></>
              )}
            </h2>
            <p className="text-xl text-slate-700 leading-relaxed mb-12 max-w-xl font-medium">
              {t.admissions.desc}
            </p>

            <div className="space-y-10">
               {steps.map((item, idx) => (
                 <div key={idx} className="flex gap-6">
                    <div className="w-14 h-14 bg-uniform-navy rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                       <item.icon className="w-6 h-6 text-uniform-tan" />
                    </div>
                    <div>
                       <h4 className="text-xl font-serif font-black text-slate-900 mb-2">{item.title}</h4>
                       <p className="text-slate-600 font-medium">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-uniform-red opacity-5 blur-3xl rounded-[3rem] -rotate-6" />
             <div className="bg-uniform-navy rounded-3xl p-10 md:p-14 shadow-2xl relative border-t-8 border-uniform-red text-white">
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-24 h-24 bg-uniform-red/20 text-uniform-red rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                        <CheckCircle className="w-12 h-12" />
                      </div>
                      <h3 className="text-4xl font-serif font-black mb-4">{t.admissions.success_title}</h3>
                      <p className="text-slate-400 text-lg mb-8 font-medium">
                        {t.admissions.success_desc}
                      </p>
                      <button 
                        onClick={() => setFormState('idle')}
                        className="african-btn"
                      >
                        {lang === 'EN' ? 'Submit Another' : 'Soumettre un Autre'}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{t.admissions.form_student}</label>
                           <input required type="text" placeholder={lang === 'EN' ? "Full legal name" : "Nom complet"} className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-uniform-red focus:bg-white/10 transition-all outline-none text-white font-medium" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{t.admissions.form_grade}</label>
                           <select className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-uniform-red focus:bg-white/10 transition-all outline-none text-white font-medium appearance-none">
                              <option className="text-slate-900">Nursery 1 / Maternelle 1</option>
                              <option className="text-slate-900">Nursery 2 / Maternelle 2</option>
                              <option className="text-slate-900">Class 1 / SIL</option>
                              <option className="text-slate-900">Class 2 / CP</option>
                              <option className="text-slate-900">Class 3 / CE1</option>
                              <option className="text-slate-900">Class 4 / CE2</option>
                              <option className="text-slate-900">Class 5 / CM1</option>
                              <option className="text-slate-900">Class 6 / CM2</option>
                           </select>
                         </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{t.admissions.form_parent}</label>
                        <input required type="text" placeholder={lang === 'EN' ? "First and last name" : "Prénom et nom"} className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-uniform-red focus:bg-white/10 transition-all outline-none text-white font-medium" />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{t.admissions.form_phone}</label>
                           <input required type="tel" placeholder="+237 ..." className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-uniform-red focus:bg-white/10 transition-all outline-none text-white font-medium" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{t.admissions.form_email}</label>
                           <input type="email" placeholder="email@example.com" className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-uniform-red focus:bg-white/10 transition-all outline-none text-white font-medium" />
                         </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{t.admissions.form_info}</label>
                        <textarea rows={3} placeholder={lang === 'EN' ? "Tell us about your child's needs..." : "Parlez-nous des besoins de votre enfant..."} className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-uniform-red focus:bg-white/10 transition-all outline-none text-white font-medium" />
                      </div>

                      <button 
                        disabled={formState === 'submitting'}
                        className="w-full bg-uniform-red text-white font-black py-5 rounded-xl shadow-xl shadow-uniform-red/20 hover:bg-white hover:text-slate-900 active:scale-95 transition-all flex items-center justify-center gap-3"
                      >
                        {formState === 'submitting' ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-5 h-5" /> {t.admissions.form_submit}
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
