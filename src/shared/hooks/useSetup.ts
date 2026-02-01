import { useRouter } from "next/navigation";
import { useTelegram } from "@/app/providers/TelegramProvider";
import { useUserStore } from "@/entities/user/store/userStore";
import { useWorkspaceStore } from "@/entities/workspace/store/workspaceStore";
import { useTaskTypeStore, useTasksStore } from "@/entities/tasks/store/taskStore";


export const useSetup = () => {
    const router = useRouter();
    const { webApp } = useTelegram();

    const { user, setUser, clearUser } = useUserStore();
    const { workspace, setWorkspace } = useWorkspaceStore();
    const { taskType, setTaskType } = useTaskTypeStore();
    const { tasks, setTasks, moveTask } = useTasksStore();

    return {
        router,
        webApp,
        user,
        setUser,
        clearUser,
        workspace,
        setWorkspace,
        taskType,
        setTaskType,
        tasks,
        setTasks,
        moveTask,
    };
};
