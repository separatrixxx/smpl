import { useRouter } from "next/navigation";
import { useTelegram } from "@/app/providers/TelegramProvider";


export const useSetup = () => {
    const router = useRouter();
    const { webApp, tgUser } = useTelegram();

    return {
        router,
        webApp,
        tgUser,
    };
};
