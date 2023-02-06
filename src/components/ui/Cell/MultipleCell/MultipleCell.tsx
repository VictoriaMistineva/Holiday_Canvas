import React from 'react';
import './MultipleCell.scss';

import { IconChevronRight } from "@sberdevices/plasma-icons";
import {WithHTMLAttributes} from "src/types";
import {WrapperCell} from "src/components/ui/Cell";

export type MultipleCellElement = {
    title: string,
    onClick: () => void,
}

export type MultipleCellProps = WithHTMLAttributes<
    {
        title: string,
        description?: string,
        elements: MultipleCellElement[],
        className?: string,
        titleMargin?: boolean,
        withMicrofon?: boolean,
        onClickMicrofon: () => void,
        onClick?: () => void,
    },
    HTMLDivElement
    >;

const MultipleCell: React.FC<MultipleCellProps> = ({
    title,
    elements,
    className,
    titleMargin,
    description,
    ...props
}) => {
    return(
        <WrapperCell title={title} description={description} className={className} titleMargin {...props}>
            {elements.map(({ title, onClick }, index) => (
                <button key={index} className='multipleCell__card' onClick={onClick}>
                    <div className='multipleCell__cardTitle'>{title}</div>
                    <IconChevronRight className='multipleCell__arroyIcon' />
                </button>
            ))}
        </WrapperCell>
    )
}

export default React.memo(MultipleCell);
