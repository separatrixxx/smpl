'use client'
import styles from './ChangeInfoBlock.module.scss';
import { ReactElement, useState } from "react";
import { Input } from '@/shared/ui/Input/Input';
import { getLocaleText } from '@/shared/utils/locale/locale';
import { useUser } from '@/shared/hooks/useUser';


export const ChangeInfoBlock = (): ReactElement => {
    const { tgUser } = useUser();

    const myTgName = (tgUser?.first_name ?? '') + (tgUser?.last_name ? ` ${tgUser.last_name}` : '');

    const [name, setName] = useState<string>(myTgName || '');
    const [specialty, setSpecialty] = useState<string>('');

    return (
        <div className={ styles.changeInfoBlock }>
            <Input placeholder={ getLocaleText(tgUser?.language_code, 'my_name') } value={ name }
                name='user name' ariaLabel='user name' handleChange={ (e) => setName(e.target.value) } />
            <Input placeholder={ getLocaleText(tgUser?.language_code, 'my_specialty') } value={ specialty }
                name='user specialty' ariaLabel='user specialty' handleChange={ (e) => setSpecialty(e.target.value) } />
        </div>
    );
}