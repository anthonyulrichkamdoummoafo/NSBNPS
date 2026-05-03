/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/Layout/Navbar';
import ThreeScene from './components/ThreeScene';
import About from './components/Sections/About';
import Academics from './components/Sections/Academics';
import Admissions from './components/Sections/Admissions';
import Gallery from './components/Sections/Gallery';
import Stats from './components/Sections/Stats';
import Contact from './components/Sections/Contact';
import { SCHOOL_INFO } from './constants';
import { ArrowDown, Check } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="z-10"
            >
              <div className="flex items-center gap-2 mb-8">
                <span className="w-12 h-px bg-blue-600" />
                <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">
                  Bilingual Education Excellence
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tight text-slate-900 mb-8">
                Standard <br />
                <span className="text-blue-600 italic">Learning</span>, <br />
                Limitless <span className="text-green-600">Future</span>.
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-lg mb-10">
                Discover the New Standard in Limbe. Where discipline meets quality, and every child becomes a bilingual leader.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a 
                  href="#admissions"
                  className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
                >
                  Enroll Your Child
                </a>
                <a 
                  href="#about"
                  className="w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group"
                >
                  Learn More 
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </a>
              </div>

              <div className="mt-16 flex items-center gap-8">
                 <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                       <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Student" />
                       </div>
                    ))}
                 </div>
                 <div>
                    <p className="text-sm font-bold text-slate-900">450+ Active Students</p>
                    <p className="text-xs text-slate-500 font-medium tracking-wide">Limbe's Trusted Choice</p>
                 </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-100 rounded-[3rem] blur-3xl opacity-50 transform rotate-12 scale-90" />
              <Suspense fallback={
                <div className="w-full h-[600px] flex items-center justify-center bg-slate-50 rounded-[3rem] border border-slate-100">
                   <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                </div>
              }>
                <ThreeScene />
              </Suspense>
            </motion.div>
          </div>
        </section>

        <Stats />
        <About />
        <Academics />
        <Admissions />
        <Gallery />
        <Contact />
      </main>

      {/* Trust Badge Floating */}
      <div className="fixed bottom-8 left-8 z-[100] hidden lg:block pointer-events-none">
         <motion.div 
           initial={{ x: -100, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 group pointer-events-auto cursor-pointer active:scale-95 transition-all"
         >
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white">
               <Check className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Quality Verified</p>
               <p className="text-xs font-bold text-slate-900">Ministry Approved</p>
            </div>
         </motion.div>
      </div>
    </div>
  );
}

