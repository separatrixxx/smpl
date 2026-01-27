'use client'
import { useFirstSetup } from "@/features/common/hooks/useFirstSetup";
import { useWorkspaceRedirect } from "@/features/workspace/hooks/useWorkspaceRedirect";


export default function Home() {
    useWorkspaceRedirect();
    useFirstSetup();

    return <div>Loading...</div>;
}
