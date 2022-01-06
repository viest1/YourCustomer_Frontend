import React from 'react';
import ReactDOM from 'react-dom';
import App from 'views/App';
import GeneralProvider from './providers/GeneralProvider';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import 'flag-icons/css/flag-icons.min.css';

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'de', 'pl'],
    fallbackLng: 'en',
    debug: false,
    // Options for language detector
    detection: {
      order: ['cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    react: { useSuspense: false },
    backend: {
      loadPath: 'assets/locales/{{lng}}/translation.json',
    },
  });

ReactDOM.render(
  <React.StrictMode>
    {console.log('hi')}
    <GeneralProvider>
      <App />
    </GeneralProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
