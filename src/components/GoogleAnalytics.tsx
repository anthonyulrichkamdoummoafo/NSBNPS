import { useEffect } from 'react';
import { GA_MEASUREMENT_ID, isAnalyticsEnabled } from '../lib/analytics';
import { useConsent } from '../context/ConsentContext';

/**
 * Loads gtag.js, but only:
 *  - in a real production build with a real measurement ID (isAnalyticsEnabled), and
 *  - after the visitor has explicitly accepted analytics cookies.
 * There's no Next.js runtime to lazy-load this after hydration, so instead the effect
 * (which never runs during SSR/prerendering) is itself the gate: nothing is injected
 * into <head> until this condition is met, so "reject" means zero network requests to
 * googletagmanager.com/google-analytics.com, not a quietly-running background tracker.
 */
export default function GoogleAnalytics() {
  const { consent } = useConsent();

  useEffect(() => {
    if (!isAnalyticsEnabled() || consent !== 'granted') return;
    if (document.getElementById('ga4-script')) return; // already injected

    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  }, [consent]);

  return null;
}
