'use client';
import { NoTextProps } from './NoText.props';
import styles from './NoText.module.scss';
import { ReactElement } from 'react';
import { Htag } from '../Htag/Htag';
import { getLocaleText } from '@/shared/utils/locale/locale';
import { useUser } from '@/shared/hooks/useUser';


export const NoText = ({ text }: NoTextProps): ReactElement => {
    const { tgUser } = useUser();

    return (
        <div className={ styles.noText }>
             <Htag tag='xl'>
                { getLocaleText(tgUser?.language_code, text) }
            </Htag>
        </div>
    );
}
