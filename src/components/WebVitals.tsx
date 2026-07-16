import { useEffect } from 'react';
import { reportWebVitals } from '../lib/analytics';
import { useConsent } from '../context/ConsentContext';
import { isAnalyticsEnabled } from '../lib/analytics';

/** Reports Core Web Vitals (CLS, FCP, LCP, INP, TTFB) to GA4, gated the same way as
 * GoogleAnalytics: only after consent, and only in a real production build. */
export function WebVitals() {
  const { consent } = useConsent();

  useEffect(() => {
    if (!isAnalyticsEnabled() || consent !== 'granted') return;

    let cancelled = false;
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onINP, onTTFB }) => {
      if (cancelled) return;
      onCLS(reportWebVitals);
      onFCP(reportWebVitals);
      onLCP(reportWebVitals);
      onINP(reportWebVitals);
      onTTFB(reportWebVitals);
    });
    return () => {
      cancelled = true;
    };
  }, [consent]);

  return null;
}
