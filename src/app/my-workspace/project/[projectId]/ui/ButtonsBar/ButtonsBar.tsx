'use client';
import styles from './ButtonsBar.module.scss';
import { ButtonIcon } from '@/widgets/button-icon';
import { ReactElement } from "react";
import { getLocaleText } from '@/shared/utils/locale/locale';
import { useUser } from '@/shared/hooks/useUser';


export const ButtonsBar = (): ReactElement => {
    const { tgUser } = useUser();

    return (
        <section className={ styles.buttonsBar }>
            <ButtonIcon type='pencil' text={ getLocaleText(tgUser?.language_code, 'add_task') }
                onClick={ () => { } } />
            <ButtonIcon type='people' text={ getLocaleText(tgUser?.language_code, 'call') }
                onClick={ () => { } } />
            <ButtonIcon type='bell' text={ getLocaleText(tgUser?.language_code, 'reminder') }
                onClick={ () => { } } />
        </section>
    );
};
