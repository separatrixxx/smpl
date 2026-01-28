import { useEffect } from 'react';
import { useSetup } from '@/shared/hooks/useSetup';
import { getFromStorage } from '@/shared/utils/storage/storage';
import { WORKSPACE_KEY } from '@/shared/constants';


export const useWorkspaceRedirect = () => {
    const { router } = useSetup();

    useEffect(() => {
        const workspace = getFromStorage(WORKSPACE_KEY);

        if (workspace && workspace !== '0') {
            router.push('/workspace/' + workspace);
        } else {
            router.push('/my-workspace');
        }
    }, [router]);
};