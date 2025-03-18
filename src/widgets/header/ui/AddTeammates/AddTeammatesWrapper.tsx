'use client';
import { fetchTeammatesMock } from '@/entities/teammates/mocks/teammatesMock';
import { useSetup } from '@/shared/hooks/useSetup';
import { useSWRData } from '@/shared/lib/useSWRData';
import { TeammatesInterface } from '@/entities/teammates/interfaces/teammates.interface';
import { AddTeammates } from './AddTeammates';


export const AddTeammatesWrapper = () => {
    const { workspace } = useSetup();

    const { data: teammatesData, isLoading: isTeammatesLoading } = useSWRData<TeammatesInterface>(
        fetchTeammatesMock,
        'Failed to fetch teammates',
        `/teammates/${workspace}?userId=${1}`,
        (workspace || 1), 1
    );

    const visibleTeammates = teammatesData?.teammates.slice(0, 3) || [];

    return <AddTeammates visibleTeammates={visibleTeammates} isTeammatesLoading={isTeammatesLoading} />;
};