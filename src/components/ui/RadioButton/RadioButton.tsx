import './RadioButton.scss';

import cn from 'classnames';
import * as React from 'react';
import { WithHTMLAttributes } from 'src/types';

export type RadioButtonBase = {
  onChange?: (checked: boolean, value?: string) => void;
  checked?: boolean;
};

export type RadioButtonProps = WithHTMLAttributes<RadioButtonBase, HTMLInputElement>;

const RadioButton: React.FC<RadioButtonProps> = ({
  children,
  className,
  onChange,
  checked,
  ...props
}) => {
  return (
    <label
      className={cn('radioButton', checked && 'radioButton_checked', className)}
    >
      <input
        className="radioButton__input"
        type="radio"
        checked={checked}
        onChange={(): void => {
          onChange?.(!checked);
        }}
        {...props}
      />
      <span className='radioButton__check-mark' />
      {children && (
        <div className="radioButton__content">
          {children}
        </div>
      )}
    </label>
  );
};

export default React.memo(RadioButton);
