'use client';
import { fetchTeammates } from '@/entities/teammates/api/teammatesApi';
import { useSetup } from '@/shared/hooks/useSetup';
import { useSWRData } from '@/shared/lib/useSWRData';
import { TeammatesInterface } from '@/entities/teammates/interfaces/teammates.interface';
import { AddTeammates } from './AddTeammates';


export const AddTeammatesWrapper = () => {
    const { workspace } = useSetup();

    const { data: teammatesData, isLoading: isTeammatesLoading } = useSWRData<TeammatesInterface>(
        fetchTeammates,
        'Failed to fetch teammates',
        `/api/teammate/${workspace}`,
        workspace || 1
    );

    const visibleTeammates = teammatesData?.teammates.slice(0, 3) || [];

    return <AddTeammates visibleTeammates={ visibleTeammates } isTeammatesLoading={ isTeammatesLoading } />;
};