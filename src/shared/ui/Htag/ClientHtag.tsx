'use client'
import { ClientHtagProps } from './Htag.props';
import { ReactNode } from "react";
import { Htag } from './Htag';
import { useSetup } from '@/shared/hooks/useSetup';
import { getLocaleText } from '@/shared/utils/locale/locale';


export const ClientHtag = ({ tag, text, onClick, className }: ClientHtagProps): ReactNode => {
    const { tgUser } = useSetup();

	return (
        <Htag className={className} tag={tag} onClick={onClick}>
            {text && getLocaleText(tgUser?.language_code, text)}
        </Htag>
    );
};