import { withLogoPad } from "@/shared/ui/Pad/hocs/withLogoPad";
import { PageWrapper } from "@/shared/ui/PageWrapper/PageWrapper";
import { Header } from "@/widgets/header";
import { WorkspaceOverview } from "@/widgets/workspaceo-overview/ui/WorkspaceOverview/WorkspaceOverview";
import { ButtonsBar } from "./ui/ButtonsBar/ButtonsBar";
import { ProjectsListWrapper } from "@/widgets/projects-list";


export default function MyWorkspace() {
    const WorkspaceOverviewWithPad = withLogoPad(WorkspaceOverview);

    return (
        <PageWrapper>
            <Header currWorkspaceId={0} isAvatar={true} />
            <WorkspaceOverviewWithPad completed={3} total={10} />
            <ButtonsBar />
            <ProjectsListWrapper />
        </PageWrapper>
    );
}
