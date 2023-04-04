import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LOGIN_AR from '../locales/ar/login.json'
import LOGIN_EN from '../locales/en/login.json'

const resources = {
    en: { 
        translation: { 
            LOGIN_PAGE: LOGIN_AR,
            login_with_google: "Login with Google",
        }
    },
    ar: { 
        translation: {
            login_with_google: "تسجيل الدخول بحساب جوجل",
            login: "تسجيل الدخول الى حسابك"
        }
    }
}

// @ts-ignore
i18n.use(initReactI18next).init({resources, lng: 'en', interpolation: {escapeValue: false}});

export default i18n;