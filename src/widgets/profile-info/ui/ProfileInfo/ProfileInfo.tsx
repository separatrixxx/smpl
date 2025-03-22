import styles from './ProfileInfo.module.scss';
import { ReactElement } from "react";
import { ProfileAvatar } from '../ProfileAvatar/ProfileAvatar';
import { ChangeInfoBlock } from '../ChangeInfoBlock/ChangeInfoBlock';


export const ProfileInfo = (): ReactElement => {
    return (
        <section className={styles.profileInfo}>
            <ProfileAvatar />
            <ChangeInfoBlock />
        </section>
    );
}