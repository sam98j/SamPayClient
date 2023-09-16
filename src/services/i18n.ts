import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {loginPageArContent} from '../locales/ar/login'
import {loginPageEnContent} from '../locales/en/login'
import { ArContent } from '../pages/Dashboard/Locales/ar';
import { EnContent } from '../pages/Dashboard/Locales/en';
import {SideBarArContent} from '../components/SideBar/Locales/ar'
import { SideBarEnContent } from '../components/SideBar/Locales/en';
import {PagesNames} from '../types/enums/locales/PagesNames';
import { CardsEnContent } from '../pages/Dashboard/AccountCard/Locales/en';
import { CardsArContent } from '../pages/Dashboard/AccountCard/Locales/ar';
import { TransHistoryEnContent } from '../pages/Dashboard/TransactionsHistory/Locales/en';
import { TransHistoryArContent } from '../pages/Dashboard/TransactionsHistory/Locales/ar';
import { TransferMoneyEnContent } from '../pages/Dashboard/TransferMoney/Locales/en';
import { TransferMoneyArContent } from '../pages/Dashboard/TransferMoney/Locales/ar';
import { ReceiversHistoryEnContent } from '../pages/Dashboard/ReceviersHistory/Locales/en';
import { ReceiversHistoryArContent } from '../pages/Dashboard/ReceviersHistory/Locales/ar';

const {
    LOGIN_PAGE,
    DASHBOARD,
    SIDEBARLINKS,
    ACCOUNT_CARD,
    TRANS_HISTORY,
    QUICK_TRASFER_WIDGET,
    RECEIVERS_HISTORY_WIDGET
} = PagesNames;

const resources = {
    en: { 
        translation: { 
            [LOGIN_PAGE]: loginPageEnContent,
            [DASHBOARD]: EnContent,
            [SIDEBARLINKS]: SideBarEnContent,
            [ACCOUNT_CARD]: CardsEnContent,
            [TRANS_HISTORY]: TransHistoryEnContent,
            [QUICK_TRASFER_WIDGET]: TransferMoneyEnContent,
            [RECEIVERS_HISTORY_WIDGET]: ReceiversHistoryEnContent
        }
    },
    ar: { 
        translation: {
            [LOGIN_PAGE]: loginPageArContent,
            [DASHBOARD]: ArContent,
            [ACCOUNT_CARD]: CardsArContent,
            [SIDEBARLINKS]: SideBarArContent,
            [TRANS_HISTORY]: TransHistoryArContent,
            [QUICK_TRASFER_WIDGET]: TransferMoneyArContent,
            [RECEIVERS_HISTORY_WIDGET]: ReceiversHistoryArContent
        }
    }
}

// @ts-ignore
i18n.use(initReactI18next).init({resources, lng: 'en', interpolation: {escapeValue: false}});

export default i18n;