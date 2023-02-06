import React from 'react';
import './SingleCell.scss';
import Picture from "src/components/ui/Picture/";

import { IconChevronRight, IconMic } from "@sberdevices/plasma-icons";
import {WithHTMLAttributes} from "../../../../types";

export type SingleCellProps = WithHTMLAttributes<
    {
        title: string,
        description?: string,
        src?: string | boolean,
        className?: string,
        onClick?: () => void,
        onClickMicrofon?: () => void,
    },
    HTMLDivElement
    >;

const SingleCell: React.FC<SingleCellProps> = ({
    title,
    description,
    src,
    onClick,
    onClickMicrofon,
    ...props
}) => {
    return(
        <div className='singleCell' onClick={() => onClick?.()} {...props}>
            {typeof(src) === 'string' && <Picture className='usersCell__icon' src={src || './icons/users.svg'} alt='userIcon' />}
            <div className='singleCell__contentWrapper'>
                <div className='singleCell__title'>{title}</div>
                {description && <div className='singleCell__description'>{description}</div>}
            </div>
            <div
                className='singleCell__microfon'
                onClick={(e) => {
                    onClickMicrofon?.()
                    e.stopPropagation()
                }}
            >
                <IconMic />
            </div>
            <IconChevronRight className='singleCell__arroy' />
        </div>
    )
}

export default React.memo(SingleCell);
