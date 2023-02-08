import React from "react";
import './SendAlert.scss';

import { typography } from "@sberdevices/plasma-tokens";

import { observer } from 'mobx-react-lite'

import store, { SendReportType } from "src/store";

import cn from 'classnames';



const SendAlert = (props: any) => {
    return (
        <div className='sendAlert'>
            <div className={cn('sendAlert__contentWrappers')}>
                <img
                    className='sendAlert__icon'
                    src={`./icons/warning.svg`}
                    alt='icon'
                />
                <div style={typography.headline2} className='sendAlert__textContent'>
                    <div>{props.title}</div>
                </div>
                <div style={typography.headline2} className="sendAlert__subtitle">
                    {props.subtitle}
                </div>
            </div>
        </div>
    )
}

export default observer(SendAlert);
