import LoadingPage from "@/shared/ui/LoadingPage/LoadingPage";
import { ButtonsBar } from "./ui/ButtonsBar/ButtonsBar";


export default function WorkspaceLoading() {
    return <LoadingPage additionalBlocks={ <ButtonsBar /> } />;
}
