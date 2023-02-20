import React from 'react';
import './SingleCellCircleMic.scss';
import Picture from "src/components/ui/Picture/";
import {WithHTMLAttributes} from "../../../../types";
import { IconMic } from "@sberdevices/plasma-icons";

export type SingleCellCircleMicProps = WithHTMLAttributes<
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

const SingleCellCircleMic: React.FC<SingleCellCircleMicProps> = ({
    title,
    description,
    src,
    onClick,
    onClickMicrofon,
    ...props
}) => {
    return(
        <div className='SingleCellCircleMic' onClick={() => onClick?.()} {...props}>
            {typeof(src) === 'string' && <Picture className='usersCell__icon' src={src || './icons/users.svg'} alt='userIcon' />}
            <div className='SingleCellCircleMic__contentWrapper'>
                <div className='SingleCellCircleMic__title'>{title}</div>
                {description && <div className='SingleCellCircleMic__description'>{description}</div>}
                <div className='SingleCellCircleMic__changeDescription'>
                    Изменить выбор
                </div>
                
            </div>
            <div
                className='SingleCellCircleMic__headerMicrofonWrapper'
                onClick={(e) => {
                    onClickMicrofon?.()
                    e.stopPropagation()
                }}
            >
                <IconMic className='wrapperCell__headerMicrofon' />
            </div>
        </div>
    )
}

export default React.memo(SingleCellCircleMic);
