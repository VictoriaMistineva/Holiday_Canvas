import React from "react";
import styles from './СurtainAlert.module.scss';
import { typography } from "@sberdevices/plasma-tokens";
import cn from 'classnames';
import Error from '../../../assets/img/icons/err.svg';
import store, {MainType} from "src/store";
export type СurtainAlertProps = {
    isOpen: boolean;
    title: string;
    subtitle: string;
} & React.HTMLAttributes<HTMLDivElement>;

const СurtainAlert: React.FC<СurtainAlertProps> = (
    {
        isOpen,
        title,
        subtitle,
    }) => {

    // Добавляем состояние для отслеживания времени открытия
    const [timeIsOpen, setTimeIsOpen] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (timeIsOpen && isOpen) {
            const timer = setTimeout(() => {
                setTimeIsOpen(false);
                store.setSendAlert(false)
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
        else if(!timeIsOpen && isOpen)
        {
            setTimeIsOpen(true);
        }
    }, [timeIsOpen,isOpen]);

    return (
        <div className={cn(styles.alertItem, timeIsOpen && isOpen && styles.alertItem_active)}>
            
            <div className={styles.alertItem__content}>
                
                <div className={styles.alertItem__icon}>
                    <img src={Error} alt="none" />
                </div>
                <div className={styles.alertItem__headline} style={typography.headline3}>
                    {title}
                </div>
                <div className={styles.alertItem__errorText} style={typography.footnote1} >
                    {subtitle}
                </div>
            </div>
        </div>
    )
}

export default React.memo(СurtainAlert);