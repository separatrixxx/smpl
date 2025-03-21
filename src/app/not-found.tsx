import { BackButton } from "@/shared/ui/BackButton/BackButton";


export default function NotFound() {
    return (
        <>
            <BackButton redirectPath='/' />
            <div>Not found</div>;
        </>
    );
}
