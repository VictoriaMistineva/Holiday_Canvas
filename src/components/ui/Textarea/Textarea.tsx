import React from "react";
import './Textarea.scss'

import { WithHTMLAttributes } from "src/types";
import cn from 'classnames';
import {sendAE} from "src/utils";

export type TextAreaProps = WithHTMLAttributes<
    {
        value: string[];
        isMobile: boolean;
        onChange?: (newValue: string[], e: React.ChangeEvent) => void;
        onFocus?: (e: React.FocusEvent) =>  void;
        onBlur?: (e: React.FocusEvent) =>  void;
        className?: string,
        readOnly?: boolean;
        maxLength?: number;
    },
    HTMLTextAreaElement
>;

const Textarea: React.FC<TextAreaProps> = ({
    value,
    onChange,
    onFocus,
    onBlur,
    isMobile,
    readOnly,
    maxLength = 100,
    className,
    ...props
}) => {
    const [localValue, setLocalValue] = React.useState(value.join("\n"));
    const [textareaRef, setTextareaRef] = React.useState<null | HTMLTextAreaElement>(null);
    const [isFocus, setIsFocus] = React.useState(false);
    const [isBlur, setIsBlur] = React.useState(false);

    React.useEffect(() => {
        setLocalValue(value.join("\n"))
    }, [value])

    React.useEffect(() => {
        if (textareaRef && !isMobile) {
            textareaRef!.style.height = 'auto';
            textareaRef!.style.height = `${textareaRef!.scrollHeight}px`;
        }
    }, [value])

    const onChangeHandle = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>):void=> {

        if (onChange && maxLength > e.target.value.length) {
            onChange(e.target.value.split("\n"), e);
            setLocalValue(e.target.value)
        }
        if (!isMobile) {
            textareaRef!.style.height = 'auto';
            textareaRef!.style.height = `${textareaRef!.scrollHeight}px`;
        }
    }, [value, textareaRef, maxLength]);

    // Handling input onFocus event
    const onFocusHandle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIsFocus(true);
        setIsBlur(false);

        // Do something with event
        //console.log(event);
    };

    // Handling input onBlur event
    const onBlurHandle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIsFocus(false);
        setIsBlur(true);
        sendAE("CLOSE_WISH", {})
        // Do something with event
        //console.log(event);
    };

    return (
        <textarea
            readOnly={readOnly}
            className={cn('textarea', className)}
            onChange={onChangeHandle} value={localValue}
            onBlur={onBlurHandle}
            onFocus={onFocusHandle}
            ref={setTextareaRef}
            contentEditable
            suppressContentEditableWarning={true}
            {...props}
        />
    )
}

export default Textarea;