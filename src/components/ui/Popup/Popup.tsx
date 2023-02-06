import {CSSTransition} from "react-transition-group";

import React from 'react';
import cn from 'classnames'

import './Popup.scss';
import Portal from "src/components/ui/Portal";
import ClickNormalize from 'src/assets/scripts/clickNormalize';

export type PopupProps = {
    open: boolean;
    onClose: (args?: any) => void;
    position: 'left' | 'right',
    isFull?: boolean;
    children: React.ReactElement;
    classNameAnimation?: string;
    classNameOverflow?: string;
    classNameContainer?: string;
    classNameContent?: string;
    onAfterExit?: () => void;
} & React.HTMLProps<HTMLDivElement>;

const Popup: React.FC<PopupProps> = ({ onClose, position, children }) => {
    const refOverflow = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        let clickNormalize: ClickNormalize;
        if (refOverflow.current) {
            clickNormalize = new ClickNormalize(refOverflow.current, {
                onClick: (): void => {
                    onClose();
                },
            });
        }

        return (): void => {
            if (clickNormalize && clickNormalize.destroy) clickNormalize.destroy();
        };
    }, [refOverflow, onClose]);

    React.useEffect(() => {
        const KeyDown = (e: KeyboardEvent): void => {
            if (e.keyCode === 27) {
                onClose();
            }
        };

        window.addEventListener('keydown', KeyDown);

        return (): void => {
            window.removeEventListener('keydown', KeyDown);
        };
    }, [onClose]);

    return(
        <div className='popup'>
            <div ref={refOverflow} className="popup__overflow" />
            <div className={cn("popup__container", `popup__container_${position}`)}>
                <div className="popup__content">
                    {children}
                </div>
            </div>
        </div>
    )
}

const PopupWrapper: React.FC<PopupProps> = ({
        classNameAnimation = 'animation-fade',
        children,
        onAfterExit,
        ...props
    }) => {
    const { open } = props;

    return (
        <Portal>
            <CSSTransition unmountOnExit in={open} timeout={1} classNames={classNameAnimation} onExited={onAfterExit}>
                <Popup {...props}>{children}</Popup>
            </CSSTransition>
        </Portal>
    );
};

export default React.memo(PopupWrapper)