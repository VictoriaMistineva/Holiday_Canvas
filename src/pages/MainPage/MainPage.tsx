import React from 'react';
import './MainPage.scss';
import {SingleCell, MultipleCell} from "src/components/ui/Cell";
import {IconChevronLeft, IconChevronRight, IconMic} from "@sberdevices/plasma-icons";

import { CONGRATULATE } from 'src/App';

import Picture from "../../components/ui/Picture/Picture";
import {sendAE} from "../../utils";


import { observer } from 'mobx-react-lite'
import store, {MainType} from "src/store";
import {getDate2} from "../../assets/scripts/Date";
import CurtainAlert from "src/components/ui/СurtainAlert";

const MainPage: React.FC = () => {
    return(
        <div className='mainPage__mainPageWrapper' onClick={() => {store.setSendAlert(false)}}>
            {store.isMobile && <div className='mainPage__backgroundPicture'>
                <img src={(store.data as MainType).bg} alt='bg' />
            </div>}
            <div className='mainPage'>
                <div className='mainPage__card'>
                    <div className='mainPage__buttonBack' onClick={() => sendAE("BACK", {})}>
                        <IconChevronLeft />
                        <div className='mainPage__buttonBackDescription'>
                            Праздники сегодня, {getDate2()}
                        </div>
                    </div>
                    <div className='mainPage__cardHeader'>
                        <div className='mainPage__cardsNumberWrapper'>1</div>
                        <div className='mainPage__cardsTitle'>Выберите событие — и мы вместе создадим открытку</div>
                    </div>
                    {(store.data as MainType).holiday && (
                        <div className='mainPage__cardContent mainPage__cardContent_holiday'>
                            <div className='mainPage__cardTitle' onClick={() => sendAE("OPEN_HOLIDAY", {})}>
                                {(store.data as MainType).holiday}
                                <IconChevronRight className='mainPage__iconArrot' />
                            </div>
                            <MultipleCell title='Кого поздравить ' elements={CONGRATULATE} onClickMicrofon={() => sendAE("VOISE_CONGRATULATE", {})} />
                        </div>
                    )}
                    {(store.data as MainType).birthdays.length > 0 && (
                        <div className='mainPage__cardContent'>
                            <div className='mainPage__cardTitle'>
                                Дни рождения
                                <IconChevronRight className='mainPage__iconArrot' />
                            </div>
                            <div>
                                {(store.data as MainType).birthdays.map(({id, title, birthday, description, src}) => (
                                    
                                    <SingleCell
                                        key={id}
                                        title={title}
                                        description={description}
                                        src={src}
                                        onClick={() => {
                                            console.log("CHOOSE_BIRTHDAY-----   " + id+ title+ birthday+ description+ src)
                                            sendAE("CHOOSE_BIRTHDAY", {id:id, title: title, birthday: birthday, description: description , src: src});
                                            store.setSelected({id, title, description, src,birthday});
                                        }}
                                        onClickMicrofon={() => sendAE("VOISE_RESETCHOOSE", {})}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    <div className='mainPage__cardContent mainPage__cardContent_goodDay'>
                        <div className='mainPage__cardTitle' onClick={() => sendAE("OPEN_GD", {})}>
                            <div
                                className='mainPage__cardMicrofonWrapper'
                                onClick={(e) => {
                                    sendAE("VOISE_RESETCHOOSE", {})
                                    e.stopPropagation()
                                }}
                            >
                                <IconMic className='popupContent__microfon' />
                            </div>
                            ХОРОШИЙ ДЕНЬ!
                            <IconChevronRight className='mainPage__iconArrot' />
                        </div>
                    </div>
                </div>
                <div className='mainPage__card'>
                    <div className='mainPage__cardHeader'>
                        <div className='mainPage__cardsNumberWrapper'>2</div>
                        <div className='mainPage__cardsTitle'>Адресат получит push-уведомление и перейдет к открытке в мобильном приложении</div>
                    </div>
                    <div className='mainPage__cardPicture'>
                        <Picture src='https://cntnt-ift.sberdevices.ru/ift-smartappide-ba/263/12381/1mRiwQmG0nYUTzpL.png' alt='phones' />
                    </div>
                </div>
            </div>
            <CurtainAlert isOpen={store.isOpenSendAlert} title={store.openAlertUserMsg} subtitle={store.openAlertUserSubMsg}></CurtainAlert>
        </div>
    )
}

export default observer(MainPage);
