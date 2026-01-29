'use client';
import { ClientHtagProps } from './Htag.props';
import { ReactNode } from "react";
import { Htag } from './Htag';
import { getLocaleText } from '@/shared/utils/locale/locale';
import { useUser } from '@/shared/hooks/useUser';


export const ClientHtag = ({ tag, text, onClick, className }: ClientHtagProps): ReactNode => {
    const { tgUser } = useUser();

	return (
        <Htag className={ className } tag={ tag } onClick={ onClick }>
            { text && getLocaleText(tgUser?.language_code, text) }
        </Htag>
    );
};