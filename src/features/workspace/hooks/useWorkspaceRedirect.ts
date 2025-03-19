import { useEffect } from 'react';
import { useSetup } from '@/shared/hooks/useSetup';
import { getFromStorage } from '@/shared/utils/storage/storage';


export const useWorkspaceRedirect = () => {
  const { router } = useSetup();

  const WORKSPACE_KEY = 'currentWorkspace';

  useEffect(() => {
    const workspace = getFromStorage(WORKSPACE_KEY);

    if (workspace) {
      router.push('/workspace/' + workspace);
    } else {
      router.push('/my-workspace');
    }
  }, [router]);
};