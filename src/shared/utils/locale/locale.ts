import { en } from "@/shared/locales/en.locale";
import { ru } from "@/shared/locales/ru.locale";


type LocaleType = typeof en;

export const getLocale = (locale: string | undefined): LocaleType => {
    switch (locale) {
        case 'ru':
            return ru;
        default:
            return en;
    }
};

export const getLocaleText = (locale: string | undefined, text: string): string => {
    return getLocale(locale)[text as '$'];
};
