import { BackButton } from "@/shared/ui/BackButton/BackButton";
import { ClientHtag } from "@/shared/ui/Htag/ClientHtag";
import { PageWrapper } from "@/shared/ui/PageWrapper/PageWrapper";
import { ProfileInfo } from "@/widgets/profile-info";


export default function Profile() {
    return (
        <PageWrapper isMoreGap={ true }>
            <BackButton redirectPath='/my-workspace' />
            <ClientHtag tag='xl' text='my_profile' />
            <ProfileInfo />
        </PageWrapper>
    );
}
