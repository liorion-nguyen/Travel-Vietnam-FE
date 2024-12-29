import i18n, { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from '../locales/translations/en';
import { vi } from '../locales/translations/vi';

use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
