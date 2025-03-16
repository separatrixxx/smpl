import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { getCurrentDate } from "@/shared/utils/date/date";


export const formatDate = (locale: string): string[] => {
    const date = getCurrentDate();

    const selectedLocale = locale === 'ru' ? ru : enUS;

    const formattedDate = format(date, 'd MMMM', { locale: selectedLocale });
    const formattedDay = format(date, 'EEEE', { locale: selectedLocale });

    return [formattedDate, formattedDay];
};
