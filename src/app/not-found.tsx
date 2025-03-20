'use client'
import { useBackButton } from "@/features/backButton/hooks/useBackButton";


export default function NotFound() {
    useBackButton('/');

    return <div>Not found</div>;
}
