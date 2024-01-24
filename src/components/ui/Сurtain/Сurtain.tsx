import React from "react";
import './Сurtain.scss'
import store, {CongratulationDataType, AppDataType} from '../../../store'
import cn from 'classnames';

export type CurtainProps = {
    isOpen: boolean;
    isAutoClose:boolean;
    color?: 'black' | 'green';
} & React.HTMLAttributes<HTMLDivElement>;

const Curtain: React.FC<CurtainProps> = (
    {
        isOpen,
        color = 'black',
        children,
        isAutoClose,
    }) => {
     // Добавляем состояние для отслеживания времени открытия
     const [timeIsOpen, setTimeIsOpen] = React.useState<boolean>(true);

     React.useEffect(() => {
         if (timeIsOpen && isOpen && isAutoClose) {
            console.log("isAutoClose" + isAutoClose)
             const timer = setTimeout(() => {
                 setTimeIsOpen(false);
                 store.setAlertUser(false)
             }, 5000);
 
             return () => {
                 clearTimeout(timer);
             };
         }
         else if(!timeIsOpen && isOpen)
        {
            setTimeIsOpen(true);
        }
     }, [isOpen, timeIsOpen]);

    return(
        <div className={cn('curtain', isOpen && 'curtain_open', `curtain_${color}`)}>
            {children}
        </div>
    )
}

export default React.memo(Curtain);