import React from "react";
import './Сurtain.scss'

import cn from 'classnames';

export type CurtainProps = {
    isOpen: boolean;
    color?: 'black' | 'green';
} & React.HTMLAttributes<HTMLDivElement>;

const Curtain: React.FC<CurtainProps> = (
    {
        isOpen,
        color = 'black',
        children
    }) => {
        
    return(
        <div className={cn('curtain', isOpen && 'curtain_open', `curtain_${color}`)}>
            {children}
        </div>
    )
}

export default React.memo(Curtain);