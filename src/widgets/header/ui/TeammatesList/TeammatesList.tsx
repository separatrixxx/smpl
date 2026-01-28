import { TeammatesListProps } from './TeammatesList.props';
import { ReactElement } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { avatarPlaceholder } from '@/shared/utils/placeholder/placeholder';
import { MyImage } from '@/shared/ui/MyImage/MyImage';


export const TeammatesList = ({ visibleTeammates, className }: TeammatesListProps): ReactElement => {
    return (
        <>
            { visibleTeammates.map((vt, i) => (
                <Skeleton key={ i } width={ 32 } height={ 32 } isReady={ Boolean(vt.photo_url) } isRound={ true }>
                    <MyImage className={ className } src={ vt.photo_url || avatarPlaceholder }
                        alt={ `${vt.first_name} teammate image` } width={ 32 } height={ 32 }
                        style={ { zIndex: 3 - i } } />
                </Skeleton>
            )) }
        </>
    );
}
