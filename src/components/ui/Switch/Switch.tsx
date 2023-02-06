import React from 'react';
import './Switch.scss';
import {WithHTMLAttributes} from "src/types";
import cn from 'classnames';

export type SwitchProps = WithHTMLAttributes<
    {
        isChecked: boolean,
        onChange: (value: boolean) => void;
        className?: string;
    },
    HTMLLabelElement
    >;

const Switch: React.FC<SwitchProps> = ({
    isChecked,
    onChange,
    className,
    children
}) => {
    return(
        <label className={cn("switch", className)}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={(): void => {
                    onChange(!isChecked);
                }}
            />
            <span className="switch__slider" />
            {children && <div className='switch__children'>{children}</div>}
        </label>
    )
}

export default React.memo(Switch);
