import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, ArrowUpRight, GraduationCap } from 'lucide-react';
import { SCHOOL_INFO, NAV_LINKS } from '../../constants';

export default function Contact() {
  return (
    <footer id="contact" className="bg-slate-900 pt-32 pb-12 px-6 overflow-hidden relative">
      {/* Decorative text */}
      <div className="absolute top-20 right-[-10%] text-white/[0.03] text-[20vw] font-black pointer-events-none select-none">
        NSBNPS
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-32">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-900/50">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black text-white">NSBNPS Mukundi</h2>
            </div>
            
            <h3 className="text-5xl font-black text-white leading-tight mb-12 max-w-md">
              Let's shape the <span className="text-blue-500 italic">future</span> together.
            </h3>

            <div className="space-y-10">
               <div className="flex gap-6 group cursor-pointer">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                     <MapPin className="w-6 h-6 text-blue-400 group-hover:text-white" />
                  </div>
                  <div>
                     <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">Our Location</p>
                     <p className="text-xl text-white font-bold leading-tight">{SCHOOL_INFO.location}</p>
                     <p className="text-slate-400 text-sm mt-1">Limbe, South West Region, Cameroon</p>
                  </div>
               </div>

               <div className="flex gap-6 group cursor-pointer">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                     <Phone className="w-6 h-6 text-green-400 group-hover:text-white" />
                  </div>
                  <div>
                     <p className="text-xs font-black text-green-400 uppercase tracking-widest mb-1">Call Us</p>
                     {SCHOOL_INFO.contact.phone.map(p => (
                        <p key={p} className="text-xl text-white font-bold">{p}</p>
                     ))}
                  </div>
               </div>

               <div className="flex gap-6 group cursor-pointer">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                     <Mail className="w-6 h-6 text-yellow-400 group-hover:text-white" />
                  </div>
                  <div>
                     <p className="text-xs font-black text-yellow-400 uppercase tracking-widest mb-1">Email Us</p>
                     <p className="text-xl text-white font-bold">{SCHOOL_INFO.contact.email}</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-[3rem] p-10 md:p-16 border border-white/10 backdrop-blur-md">
             <h4 className="text-2xl font-black text-white mb-8">Send a Message</h4>
             <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                   <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all" />
                   <input type="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all" />
                </div>
                <input type="text" placeholder="Subject" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all" />
                <textarea rows={4} placeholder="How can we help you?" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all" />
                <button className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all">
                   Submit Message <ArrowUpRight className="w-5 h-5" />
                </button>
             </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-slate-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} NSBNPS Mukundi. Limbe, Cameroon.
           </p>
           
           <div className="flex gap-8">
              {NAV_LINKS.map(link => (
                 <a key={link.label} href={link.href} className="text-slate-400 hover:text-white text-sm font-bold transition-colors uppercase tracking-widest">
                    {link.label}
                 </a>
              ))}
           </div>

           <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                 <a key={idx} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                 </a>
              ))}
           </div>
        </div>
      </div>
    </footer>
  );
}
