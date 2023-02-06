import React from 'react';
import './WrapperCell.scss';
import cn from 'classnames'

import { IconMic } from "@sberdevices/plasma-icons";
import {WithHTMLAttributes} from "../../../../types";
import {observer} from "mobx-react";

export type WrapperCellProps = WithHTMLAttributes<
    {
        title: string,
        description?: string,
        className?: string,
        onClick?: () => void,
        titleMargin?: boolean,
        withMicrofon?: boolean,
        onClickMicrofon?: () => void;
    },
    HTMLDivElement
    >;

const WrapperCell: React.FC<WrapperCellProps> = ({
    title,
    description,
    children,
    className,
    onClick,
    titleMargin,
    withMicrofon= true,
    onClickMicrofon,
    ...props
}) => {

    const onHandlerClick = React.useCallback(() => {
        if(onClick) {
            onClick()
        }
    }, [])

    return(
        <div onClick={onHandlerClick} className={cn('wrapperCell', className)} {...props}>
            <div className={cn('wrapperCell__header', titleMargin && 'wrapperCell__header_withTitleMargin')}>
                <div>
                    <div className='wrapperCell__headerTitle'>{title}</div>
                    <div className='wrapperCell__headerDescription'>{description}</div>
                </div>
                {withMicrofon && onClickMicrofon && (
                    <button className='wrapperCell__headerMicrofonWrapper' onClick={(e) => {
                        onClickMicrofon()
                        e.stopPropagation()
                    }}>
                        <IconMic className='wrapperCell__headerMicrofon' />
                    </button>
                )}
            </div>
            {children}
        </div>
    )
}

export default observer(WrapperCell);
