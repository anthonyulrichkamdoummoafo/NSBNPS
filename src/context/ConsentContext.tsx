'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Consent = 'granted' | 'denied' | 'unknown';

const STORAGE_KEY = 'analytics-consent';

const ConsentContext = createContext<{
  consent: Consent;
  setConsent: (c: Consent) => void;
}>({ consent: 'unknown', setConsent: () => {} });

export function useConsent() {
  return useContext(ConsentContext);
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  // Starts 'unknown' so nothing analytics-related runs on first paint, including
  // during SSR/prerendering (import.meta.env.SSR skips the effect below entirely).
  const [consent, setConsentState] = useState<Consent>('unknown');

  useEffect(() => {
    if (import.meta.env.SSR) return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'granted' || saved === 'denied') setConsentState(saved);
  }, []);

  const setConsent = (c: Consent) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, c);
      window.gtag?.('consent', 'update', {
        analytics_storage: c === 'granted' ? 'granted' : 'denied',
      });
    }
    setConsentState(c);
  };

  return (
    <ConsentContext.Provider value={{ consent, setConsent }}>
      {children}
    </ConsentContext.Provider>
  );
}
