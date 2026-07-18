import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SCHOOL_INFO } from '../constants';
import { analytics } from '../lib/analytics';

/** Converts "+237 671 23 45 67" to "237671234567" for a wa.me link. */
function toWhatsAppDigits(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

export default function WhatsAppButton() {
  const { lang } = useLanguage();

  const phoneDigits = toWhatsAppDigits(SCHOOL_INFO.contact.phone[0]);
  const message = lang === 'EN'
    ? "Hello! I'd like to know more about admissions at NSBNPS."
    : "Bonjour ! J'aimerais en savoir plus sur les admissions à NSBNPS.";
  const href = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => analytics.trackSocialInteraction('whatsapp', 'click_chat')}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      aria-label={lang === 'EN' ? 'Chat with us on WhatsApp' : 'Discutez avec nous sur WhatsApp'}
      className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
      <MessageCircle className="w-8 h-8 relative z-10 fill-white/10" />
    </motion.a>
  );
}
