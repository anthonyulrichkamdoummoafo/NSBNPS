import { useConsent } from '../context/ConsentContext';
import { useLanguage } from '../context/LanguageContext';

export function CookieConsentBanner() {
  const { consent, setConsent } = useConsent();
  const { t } = useLanguage();

  if (consent !== 'unknown') return null; // already decided, stay hidden

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[200] bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-6 py-5"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <p className="text-sm text-slate-700 font-medium flex-1 text-center sm:text-left">
          {t.cookieConsent.message}
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setConsent('denied')}
            className="px-6 py-3 rounded-xl font-bold text-sm border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-all"
          >
            {t.cookieConsent.reject}
          </button>
          <button
            onClick={() => setConsent('granted')}
            className="african-btn px-6 py-3 text-sm"
          >
            {t.cookieConsent.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
