import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Send, User, MapPin, ClipboardList } from 'lucide-react';

export default function Admissions() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <section id="admissions" className="py-32 px-6 bg-blue-600 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full">
         <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20" />
         <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-800 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-white">
            <span className="inline-block px-4 py-1.5 bg-blue-500 text-blue-50 rounded-full text-xs font-black uppercase tracking-widest mb-8">
               Enrollment 2026/2027
            </span>
            <h2 className="text-5xl md:text-7xl font-black leading-[1] mb-8">
              Join the <span className="text-blue-200">New Standard</span> School.
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-12 max-w-xl">
              Registration is now open for Nursery and Primary sections. Secure a place for your child in an environment designed for excellence.
            </p>

            <div className="space-y-8">
               {[
                 { icon: CheckCircle, title: "Simple Process", desc: "Fill out the form and our team will contact you." },
                 { icon: ClipboardList, title: "Required Documents", desc: "Birth certificate, vaccination records, and parent IDs." },
                 { icon: MapPin, title: "Visit Us", desc: "Daily tours available from 8 AM to 3 PM in Mukundi Village." }
               ].map((item, idx) => (
                 <div key={idx} className="flex gap-6">
                    <div className="w-12 h-12 bg-blue-500/50 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0 border border-blue-400/30">
                       <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                       <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                       <p className="text-blue-100/70">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-black/10 blur-3xl rounded-[3rem]" />
             <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl relative">
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-50">
                        <CheckCircle className="w-12 h-12" />
                      </div>
                      <h3 className="text-4xl font-black text-slate-900 mb-4">Registration Sent!</h3>
                      <p className="text-slate-600 text-lg mb-8">
                        Thank you for your interest. A member of our administration office will contact you shortly.
                      </p>
                      <button 
                        onClick={() => setFormState('idle')}
                        className="bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all"
                      >
                        Submit Another
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
                           <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Student Name</label>
                           <input required type="text" placeholder="Full legal name" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-300 focus:bg-white transition-all outline-none text-slate-900 font-medium" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Target Grade</label>
                           <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-300 focus:bg-white transition-all outline-none text-slate-900 font-medium appearance-none">
                              <option>Nursery 1</option>
                              <option>Nursery 2</option>
                              <option>Class 1</option>
                              <option>Class 2</option>
                              <option>Class 3</option>
                              <option>Class 4</option>
                              <option>Class 5</option>
                              <option>Class 6</option>
                           </select>
                         </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Parent/Guardian Name</label>
                        <input required type="text" placeholder="First and last name" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-300 focus:bg-white transition-all outline-none text-slate-900 font-medium" />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Phone Number</label>
                           <input required type="tel" placeholder="+237 ..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-300 focus:bg-white transition-all outline-none text-slate-900 font-medium" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Email (Optional)</label>
                           <input type="email" placeholder="email@example.com" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-300 focus:bg-white transition-all outline-none text-slate-900 font-medium" />
                         </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Additional Information</label>
                        <textarea rows={3} placeholder="Tell us about your child's needs..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-300 focus:bg-white transition-all outline-none text-slate-900 font-medium" />
                      </div>

                      <button 
                        disabled={formState === 'submitting'}
                        className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-xl shadow-slate-200 hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center gap-3"
                      >
                        {formState === 'submitting' ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-5 h-5" /> Submit Application
                          </>
                        )}
                      </button>
                      <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                         Secure 256-bit Student Portal Registration
                      </p>
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
