import { withLogoPad } from "@/shared/ui/Pad/hocs/withLogoPad";
import { PageWrapper } from "@/shared/ui/PageWrapper/PageWrapper";
import { Header } from "@/widgets/header";
import { WorkspaceOverview } from "@/widgets/workspaceo-overview/ui/WorkspaceOverview/WorkspaceOverview";


export default function MyWorkspace() {
    const WorkspaceOverviewWithPad = withLogoPad(WorkspaceOverview);

    return (
        <PageWrapper>
            <Header isAvatar={true} />
            <WorkspaceOverviewWithPad />
        </PageWrapper>
    );
}
