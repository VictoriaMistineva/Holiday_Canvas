import React from "react";
import './Textarea.scss'

import {WithHTMLAttributes} from "src/types";
import cn from 'classnames';

export type TextAreaProps = WithHTMLAttributes<
    {
        value: string[];
        isMobile: boolean;
        onChange?: (newValue: string[], e: React.ChangeEvent) => void;
        className?: string,
        readOnly?: boolean;
        maxLength?: number;
    },
    HTMLTextAreaElement
    >;

const Textarea: React.FC<TextAreaProps> = ({
    value,
    onChange,
    isMobile,
    readOnly,
    maxLength = 100,
    className,
    ...props
}) => {
    const [localValue, setLocalValue] = React.useState(value.join("\n"));
    const [textareaRef, setTextareaRef] = React.useState<null | HTMLTextAreaElement>(null);

    React.useEffect(() => {
        setLocalValue(value.join("\n"))
    }, [value])

    React.useEffect(() => {
        if(textareaRef && !isMobile) {
            textareaRef!.style.height = 'auto';
            textareaRef!.style.height = `${textareaRef!.scrollHeight}px`;
        }
    }, [value])

    const onChangeHandle = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        
        if (onChange && maxLength > e.target.value.length) {
            onChange(e.target.value.split("\n"), e);
            setLocalValue(e.target.value)
        }
        if (!isMobile) {
            textareaRef!.style.height = 'auto';
            textareaRef!.style.height = `${textareaRef!.scrollHeight}px`;
        }
    }, [value, textareaRef, maxLength]);

    return(
         <textarea
             readOnly={readOnly}
             className={cn('textarea', className)}
             onChange={onChangeHandle} value={localValue}
             ref={setTextareaRef}
             suppressContentEditableWarning={true}
             contentEditable
             {...props}
         />
    )
}

export default Textarea;
