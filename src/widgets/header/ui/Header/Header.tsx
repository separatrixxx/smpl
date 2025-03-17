import { HeaderProps } from './Header.props';
import styles from './Header.module.scss';
import { ReactElement } from "react";
import { Avatar } from '../Avatar/Avatar';
import { SwitchWorkspace } from '../SwitchWorkspace/SwitchWorkspace';


export const Header = ({ currWorkspaceId, isAvatar }: HeaderProps): ReactElement => { 
    return (
        <header className={styles.header}>
            <SwitchWorkspace currWorkspaceId={currWorkspaceId} />
            {
                isAvatar ? 
                    <Avatar />
                : <></>
            }
        </header>
    );
}