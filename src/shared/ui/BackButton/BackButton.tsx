'use client';
import { ReactElement } from 'react';
import { BackButtonProps } from './BackButton.props';
import { useBackButton } from '@/features/backButton/hooks/useBackButton';


export const BackButton = ({ redirectPath }: BackButtonProps): ReactElement => {
    useBackButton(redirectPath);

    return <></>;
}