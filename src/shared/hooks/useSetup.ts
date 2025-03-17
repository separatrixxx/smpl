import { useRouter } from "next/navigation";
import { useTelegram } from "@/app/providers/TelegramProvider";
import { useUserStore } from "@/entities/user/store/userStore";
import { useWorkspaceStore } from "@/entities/workspace/store/workspaceStore";


export const useSetup = () => {
    const router = useRouter();
    const { webApp, tgUser } = useTelegram();

    const { user, setUser, clearUser } = useUserStore();
    const { workspace, setWorkspace } = useWorkspaceStore();

    return {
        router,
        webApp,
        tgUser,
        user,
        setUser,
        clearUser,
        workspace,
        setWorkspace,
    };
};
