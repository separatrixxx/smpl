import LoadingPage from "@/shared/ui/LoadingPage/LoadingPage";
import { ButtonsBar } from "./ui/ButtonsBar/ButtonsBar";


export default function Loading() {
    return <LoadingPage additionalBlocks={ <ButtonsBar /> } />;
}
