'use client'
import styles from './CalendarBadge.module.scss';
import { ReactElement } from "react";
import { Htag } from '@/shared/ui/Htag/Htag';
import { useSetup } from '@/shared/hooks/useSetup';
import { Icon } from '@/shared/ui/Icon/Icon';
import { formatDate } from '../../utils/formatDate';


export const CalendarBadge = (): ReactElement => {
    const { tgUser } = useSetup();

    const [formattedDate, formattedDay] = formatDate(tgUser?.language_code || 'en');

    return (
        <div className={styles.calendarBadge}>
            <Icon type='calendar' size='l' />
            <div>
                <Htag tag='m'>
                    {formattedDate}
                </Htag>
                <Htag tag='s'>
                    {formattedDay}
                </Htag>
            </div>
        </div>
    );
}