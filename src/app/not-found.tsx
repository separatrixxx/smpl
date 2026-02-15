'use client';
import { BackButton } from "@/shared/ui/BackButton/BackButton";
import { removeFromStorage } from "@/shared/utils/storage/storage";
import { WORKSPACE_KEY } from "@/shared/constants";
import { useSetup } from "@/shared/hooks/useSetup";


export default function NotFound() {
    const { router } = useSetup();
    
    return (
        <>
            <BackButton redirectPath='/' />
            <div>Not found</div>
            <button onClick={ () => {
                removeFromStorage(WORKSPACE_KEY);
                router.push('/');
            } }>Тык</button>
        </>
    );
}
