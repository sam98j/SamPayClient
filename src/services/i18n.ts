import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {loginPageArContent} from '../locales/ar/login'
import {loginPageEnContent} from '../locales/en/login'
import {PagesNames} from '../types/enums/locales/PagesNames';

const {LOGIN_PAGE} = PagesNames;

const resources = {
    en: { 
        translation: { 
            [LOGIN_PAGE]: loginPageEnContent,
        }
    },
    ar: { 
        translation: {
            [LOGIN_PAGE]: loginPageArContent
        }
    }
}

// @ts-ignore
i18n.use(initReactI18next).init({resources, lng: 'en', interpolation: {escapeValue: false}});

export default i18n;