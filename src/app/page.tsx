'use client'
import { useWorkspaceRedirect } from "@/features/workspace/hooks/useWorkspaceRedirect";
import LoadingPage from "@/shared/ui/LoadingPage/LoadingPage";


export default function Home() {
    useWorkspaceRedirect();

    return <LoadingPage />;
}
