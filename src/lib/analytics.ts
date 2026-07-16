/**
 * Google Analytics 4 utilities for a Vite SPA.
 *
 * Adapted from the @next/third-parties pattern, but with no Next.js runtime available:
 * GA is loaded by hand-injecting the gtag.js script (see components/GoogleAnalytics.tsx),
 * gated on both environment and explicit visitor consent (see context/ConsentContext.tsx).
 */

// Vite only exposes env vars prefixed with VITE_ to client code (equivalent of Next's
// NEXT_PUBLIC_ prefix).
export const GA_MEASUREMENT_ID: string =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || 'G-XXXXXXXXXX';

/** True only in a real production build with a real measurement ID configured. */
export const isAnalyticsEnabled = (): boolean => {
  return (
    import.meta.env.PROD &&
    Boolean(GA_MEASUREMENT_ID) &&
    GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX'
  );
};

export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
}

export interface GAEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
}

function gtag(...args: unknown[]): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/** Reports Core Web Vitals (CLS/FCP/LCP/INP/TTFB) to GA4 as a `web_vitals` event. */
export function reportWebVitals(metric: WebVitalsMetric): void {
  if (!isAnalyticsEnabled()) {
    if (import.meta.env.DEV) console.info('Web Vitals (dev):', metric);
    return;
  }
  // CLS is a small unitless score; GA event values must be integers, so scale it up.
  const value = Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value);
  gtag('event', 'web_vitals', {
    event_category: 'Web Vitals',
    event_label: metric.name,
    value,
    metric_id: metric.id,
    metric_rating: metric.rating,
    metric_delta: metric.delta,
    non_interaction: true,
  });
}

/** Sends a custom event to GA4. */
export function trackEvent(event: GAEvent): void {
  if (!isAnalyticsEnabled()) return;
  gtag('event', event.action, {
    event_category: event.category || 'engagement',
    event_label: event.label,
    value: event.value,
    ...event.custom_parameters,
  });
}

/** Common event trackers for typical site interactions. */
export const analytics = {
  trackExternalLink: (url: string, text?: string) => {
    trackEvent({
      action: 'click_external_link',
      category: 'engagement',
      label: url,
      custom_parameters: { link_text: text, link_url: url },
    });
  },

  trackFormSubmission: (formName: string, success: boolean = true) => {
    trackEvent({
      action: 'form_submission',
      category: 'engagement',
      label: formName,
      value: success ? 1 : 0,
      custom_parameters: { form_name: formName, submission_success: success },
    });
  },

  // NSBNPS-specific: language toggle usage, admissions CTA clicks.
  trackLanguageToggle: (lang: 'EN' | 'FR') => {
    trackEvent({
      action: 'language_toggle',
      category: 'engagement',
      label: lang,
    });
  },

  trackAdmissionsCTA: (location: string) => {
    trackEvent({
      action: 'admissions_cta_click',
      category: 'engagement',
      label: location,
    });
  },
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
