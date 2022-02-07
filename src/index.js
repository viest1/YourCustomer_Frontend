import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from 'views/App';
import GeneralProvider from './providers/GeneralProvider';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import 'flag-icons/css/flag-icons.min.css';
import LoadingSpinner from './components/atoms/LoadingSpinner/LoadingSpinner';

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'de', 'pl'],
    fallbacks: true,
    fallbackLng: 'en',
    whitelist: 'en',
    debug: false,
    // Options for language detector
    detection: {
      order: ['cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'querystring', 'path', 'subdomain'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18n',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  });

// const LoadingMarkup = () => (
//   <div style={{ display: 'flex', justifyContent: 'center' }}>
//     <LoadingSpinner asOverlay />
//   </div>
// );

ReactDOM.render(
  <Suspense fallback={<LoadingSpinner asOverlay />}>
    <React.StrictMode>
      <GeneralProvider>
        <App />
      </GeneralProvider>
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);
