import LoadingPage from "@/shared/ui/LoadingPage/LoadingPage";
import { ButtonsBar } from "./ui/ButtonsBar/ButtonsBar";


export default function MyWorkspaceLoading() {
    return <LoadingPage additionalBlocks={ <ButtonsBar /> } />;
}
