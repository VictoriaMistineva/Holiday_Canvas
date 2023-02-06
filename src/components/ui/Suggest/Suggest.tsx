import React from "react";
import './Suggest.scss'
import {WithHTMLAttributes} from "../../../types";
import cn from 'classnames';

export type SuggestProps = WithHTMLAttributes<
    {
        title: string,
        onClick: () => void,
        className?: string
    },
    HTMLDivElement
    >;

const Suggest: React.FC<SuggestProps> = ({ title, onClick, className}) => {
    return(
        <div className={cn('suggest', className)} onClick={onClick}>
            {title}
        </div>
    )
}

export default React.memo(Suggest);