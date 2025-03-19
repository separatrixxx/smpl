import { MyImageProps } from './MyImage.props';
import styles from './MyImage.module.scss';
import { ReactElement } from "react";
import Image from 'next/image';
import cn from 'classnames';


export const MyImage = ({ src, alt, width, height, style, priority, className, onClick }: MyImageProps): ReactElement => {
    return (
        <Image className={cn(styles.myImage, className)} draggable='false'
            src={src}
            alt={alt}
            width={width || 1}
            height={height || 1}
            style={style}
            priority={priority}
            onClick={onClick}
        />
    );
}