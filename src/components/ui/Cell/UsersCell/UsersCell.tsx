import {WithHTMLAttributes} from "../../../../types";
import React from "react";
import { WrapperCell } from "..";

import './UsersCell.scss';
import Picture from "src/components/ui/Picture";

export type UsersCellElement = {
    title: string,
    description?: string,
    src?: string | false,
}

export type UsersCellProps = WithHTMLAttributes<
    {
        title: string,
        description?: string,
        elements: UsersCellElement[],
        onClick?: () => void,
        className?: string,
        titleMargin?: boolean,
        withMicrofon?: boolean,
        onClickMicrofon: () => void;
    },
    HTMLDivElement
    >;

const UsersCell: React.FC<UsersCellProps> = ({
    title,
    elements,
    className,
    titleMargin,
    description,
    ...props
}) => {
    return(
        <WrapperCell title={title} description={description} className={className} titleMargin {...props}>
            <div className='usersCell__wrapper'>
                {elements.map(({ title, src, description }) => (
                    <div className='usersCell' key={title}>
                        {typeof(src) === 'string' && <Picture className='usersCell__icon' src={src || './icons/users.svg'} alt='userIcon' />}
                        <div>
                            <div className='usersCell__title'>{title}</div>
                            <div className='usersCell__description'>{description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </WrapperCell>
    )
}

export default React.memo(UsersCell);