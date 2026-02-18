import { TeammatesListProps } from './TeammatesList.props';
import { ReactElement } from 'react';
import { avatarPlaceholder } from '@/shared/utils/placeholder/placeholder';
import { MyImage } from '@/shared/ui/MyImage/MyImage';


export const TeammatesList = ({ visibleTeammates, className }: TeammatesListProps): ReactElement => {
    return (
        <>
            { visibleTeammates.map((vt, i) => (
                <MyImage key={ i } className={ className } src={ avatarPlaceholder }
                    alt={ `${vt.first_name} teammate image` } width={ 32 } height={ 32 }
                    style={ { zIndex: 3 - i } } />
            )) }
        </>
    );
}
