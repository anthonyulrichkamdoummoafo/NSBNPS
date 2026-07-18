import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SCHOOL_INFO } from '../../constants';

export default function FAQ() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = lang === 'EN' ? [
    {
      q: "What age groups do you accept?",
      a: "We welcome children from Nursery 1 (around age 2.5) through to Class 6, covering the full nursery and primary journey.",
    },
    {
      q: "What language(s) is teaching done in?",
      a: "NSBNPS is fully bilingual: lessons are taught in both English and French, so every child graduates confident in both languages.",
    },
    {
      q: "How do I apply for admission?",
      a: "Fill out the Admissions form above with your child's details, or call our admin team directly. We'll follow up to guide you through the rest of the process.",
    },
    {
      q: "What documents will I need?",
      a: "Requirements can vary by grade level. Contact our admissions office and we'll send you the exact document checklist for your child's intended class.",
    },
    {
      q: "What are the current school fees?",
      a: "Fees depend on the grade level and are updated each academic year. Please contact us directly by phone or email for the current fee schedule.",
    },
    {
      q: "Do you offer transport or a meal program?",
      a: "Please reach out to the school directly to ask about transport and canteen arrangements for the current term, as these can vary.",
    },
  ] : [
    {
      q: "Quels groupes d'âge acceptez-vous ?",
      a: "Nous accueillons les enfants de la Maternelle 1 (environ 2,5 ans) jusqu'à la Classe de CM2, couvrant tout le parcours maternel et primaire.",
    },
    {
      q: "Dans quelle(s) langue(s) l'enseignement est-il dispensé ?",
      a: "NSBNPS est entièrement bilingue : les cours sont dispensés en anglais et en français, afin que chaque enfant soit à l'aise dans les deux langues.",
    },
    {
      q: "Comment puis-je inscrire mon enfant ?",
      a: "Remplissez le formulaire d'Admissions ci-dessus avec les informations de votre enfant, ou appelez directement notre équipe administrative. Nous vous guiderons pour la suite du processus.",
    },
    {
      q: "Quels documents dois-je fournir ?",
      a: "Les exigences peuvent varier selon la classe. Contactez notre bureau des admissions et nous vous enverrons la liste exacte des documents nécessaires.",
    },
    {
      q: "Quels sont les frais de scolarité actuels ?",
      a: "Les frais dépendent de la classe et sont mis à jour chaque année académique. Veuillez nous contacter directement par téléphone ou email pour connaître le barème actuel.",
    },
    {
      q: "Proposez-vous le transport ou un service de cantine ?",
      a: "Veuillez contacter directement l'école pour vous renseigner sur le transport et la cantine pour le trimestre en cours, car ces services peuvent varier.",
    },
  ];

  return (
    <section id="faq" className="py-32 px-6 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-uniform-navy rounded-full blur-3xl opacity-5 -ml-48 -mt-24" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="w-16 h-16 bg-uniform-navy text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-black text-slate-900 leading-[0.9] mb-6">
            {lang === 'EN' ? (
              <>Frequently Asked <span className="text-uniform-red italic">Questions.</span></>
            ) : (
              <>Questions <span className="text-uniform-red italic">Fréquentes.</span></>
            )}
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            {lang === 'EN'
              ? <>Can't find what you're looking for? Call us at <span className="font-black text-slate-900">{SCHOOL_INFO.contact.phone[0]}</span>.</>
              : <>Vous ne trouvez pas votre réponse ? Appelez-nous au <span className="font-black text-slate-900">{SCHOOL_INFO.contact.phone[0]}</span>.</>
            }
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-8 py-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-lg font-serif font-black text-slate-900">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-uniform-red transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-8 pb-6 text-slate-600 leading-relaxed font-medium">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
