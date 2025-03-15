import { HeaderProps } from './Header.props';
import styles from './Header.module.scss';
import { ReactElement } from "react";
import { Avatar } from '../Avatar/Avatar';
import { SwitchWorkspace } from '../SwitchWorkspace/SwitchWorkspace';


export const Header = ({ isAvatar }: HeaderProps): ReactElement => {
    return (
        <header className={styles.header}>
            <SwitchWorkspace />
            {
                isAvatar ? 
                    <Avatar />
                : <></>
            }
        </header>
    );
}