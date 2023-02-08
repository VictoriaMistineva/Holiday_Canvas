import React from "react";
import './SendReportPage.scss'

import { observer } from 'mobx-react-lite'

import store, {SendReportType} from "src/store";

import cn from 'classnames';

import {sendAE} from "../../utils";


const SendReportPage = () => {
    return(
        <div className='sendReportPage'>
            <div className={cn('sendReportPage__contentWrapper', !(store.data as SendReportType).status &&  'sendReportPage__contentWrapper_error')}>
                <img
                    className='sendReportPage__icon'
                    src={`./icons/${(store.data as SendReportType).status ? 'success' : 'error'}.svg`}
                    alt='icon'
                />
                <div className='sendReportPage__textContent'>
                    Открытка {(store.data as SendReportType).status ? ' ' : ' не'} отправлена.
                    <div>{(store.data as SendReportType).name}</div>
                    {(store.data as SendReportType).status ? ' ' : ' не '}
                    получит push-уведомление.
                </div>
                <div
                    className='sendReportPage__button'
                    onClick={() => sendAE('SUBSCRIBE_NOTIFICATION', {})}
                >
                    Подписаться на уведомления о праздниках коллеги (Скоро)
                </div>
            </div>
        </div>
    )
}

export default observer(SendReportPage);
