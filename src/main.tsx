import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import { ConsentProvider } from './context/ConsentContext';
import GoogleAnalytics from './components/GoogleAnalytics';
import { WebVitals } from './components/WebVitals';
import { CookieConsentBanner } from './components/CookieConsentBanner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <ConsentProvider>
        <App />
        {/* Analytics: only mounts network requests once consent is granted */}
        <GoogleAnalytics />
        <WebVitals />
        <CookieConsentBanner />
      </ConsentProvider>
    </LanguageProvider>
  </StrictMode>,
);
