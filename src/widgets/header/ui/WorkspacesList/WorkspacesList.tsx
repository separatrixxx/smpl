import { WorkspacesListProps } from './WorkspacesList.props';
import styles from './WorkspacesList.module.scss';
import { ReactElement } from "react";
import { WorkspaceItem } from '../WorkspaceItem/WorkspaceItem';


export const WorkspacesList = ({ currWorkspaceId, workspaces }: WorkspacesListProps): ReactElement => {
return (
        <div className={ styles.workspacesList }>
            { workspaces
                .filter(w => w.id !== currWorkspaceId)
                .sort((a, b) => {
                    if (a.is_my_workspace === b.is_my_workspace) return 0;
                    return a.is_my_workspace ? 1 : -1;
                })
                .map(w => (
                    <WorkspaceItem key={ w.id } workspaceId={ w.id } title={ w.title }
                        isMyWorkspace={ w.is_my_workspace } />
                )) }
        </div>
    );
}