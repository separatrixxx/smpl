'use client'
import { useBackButton } from "@/features/backButton/hooks/useBackButton";


export default function Profile() {
    useBackButton('/my-workspace');

    return (
        <>
            Profile
        </>
    );
}
