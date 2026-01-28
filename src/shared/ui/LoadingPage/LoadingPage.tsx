import { LoadingPageProps } from "./LoadingPage.props";
import { Header } from "@/widgets/header";
import { PageWrapper } from "../PageWrapper/PageWrapper";
import { withLogoPad } from "../Pad/hocs/withLogoPad";
import { WorkspaceOverview } from "@/widgets/workspaceo-overview/ui/WorkspaceOverview/WorkspaceOverview";


export default function LoadingPage({ additionalBlocks }: LoadingPageProps) {
    const WorkspaceOverviewWithPad = withLogoPad(WorkspaceOverview);
    
    return (
        <PageWrapper>
            <Header currWorkspaceId={ 0 } isAvatar={ true } />
            <WorkspaceOverviewWithPad />
            { additionalBlocks }
        </PageWrapper>
    );
}
