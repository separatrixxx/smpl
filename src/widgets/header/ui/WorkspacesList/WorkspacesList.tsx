import { WorkspacesListProps } from './WorkspacesList.props';
import styles from './WorkspacesList.module.scss';
import { ReactElement } from "react";
import { WorkspaceItem } from '../WorkspaceItem/WorkspaceItem';


export const WorkspacesList = ({ currWorkspaceId, workspaces }: WorkspacesListProps): ReactElement => {
return (
        <div className={styles.workspacesList}>
            {workspaces
                .filter(w => w.id !== currWorkspaceId)
                .sort((a, b) => {
                    if (a.isMyWorkspace === b.isMyWorkspace) return 0;
                    return a.isMyWorkspace ? 1 : -1;
                })
                .map(w => (
                    <WorkspaceItem key={w.id} workspaceId={w.id} title={w.title}
                        isMyWorkspace={w.isMyWorkspace} />
                ))}
        </div>
    );
}