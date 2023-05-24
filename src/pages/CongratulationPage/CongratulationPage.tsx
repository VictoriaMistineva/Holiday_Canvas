import React from "react";

import './CongratulationPage.scss'

import Picture from "src/components/ui/Picture";
import store, {CongratulationDataType} from 'src/store'
import {observer} from "mobx-react";
import Suggest from "src/components/ui/Suggest/Suggest";
import {sendAE} from "../../utils";
import {IconChevronLeft} from "@sberdevices/plasma-icons";
import Curtain from "src/components/ui/Сurtain";
import { typography } from "@sberdevices/plasma-tokens";
import CurtainAlert from "src/components/ui/СurtainAlert";

/**
   * Returns the average of two numbers.
   *
   * @remarks
   * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
   *
   * @param test - The first input number
   * @param test2 - The second input number
   * @returns The arithmetic mean of `x` and `y`
   *
   */

const handleClickThacks = () =>{
    sendAE("sendAppreciate", {});
    store.setIsCurtainThanks(true);
    store.setSaggestWebThanks(true);
}

const CongratulationPage = () => {
    return(
        <div>
            <div className='congratulationPage__wrapper' >
                <div className='congratulationPage' onClick={() => {store.setAlertUser(false);store.setIsCurtainThanks(false);store.setSendAlert(false)}}>
                    <button className='congratulationPage__buttonBack' onClick={() => sendAE("BACK", {})}>
                        <IconChevronLeft />
                    </button>
                    <Picture alt='letter' src='https://cntnt-ift.sberdevices.ru/ift-smartappide-ba/263/12381/o5gDZ6cNFLeXdecR.png' className='congratulationPage__letter' />
                    <div className='congratulationPage__whiteBlock'>
                        <Picture alt='picture' src={(store.data as CongratulationDataType).picture} className='congratulationPage__picture' />
                        <div className='congratulationPage__pictureContent'>
                            <div className='congratulationPage__title'>{(store.data as CongratulationDataType).title}</div>
                            <div className='congratulationPage__description'>
                                {(store.data as CongratulationDataType).description.map((el) => (
                                    <div className='congratulationPage__descriptionContent'>{el}</div>
                                ))}
                            </div>
                        </div>
                        <div className='congratulationPage__sender'>{(store.data as CongratulationDataType).sender}</div>
                    </div>
                    
                </div>
                {(!store.isSaggestWebThanks || store.isMobile ) && 
                    <div className="saggestConteiner">
                        <Suggest title='Пожелать хорошего дня'
                                        onClick={() => sendAE("sendCongratulationGoodDay", {})}
                                    >
                        </Suggest >
                        <Suggest title='Поблагодарить'
                                        onClick={() => handleClickThacks()}
                                    >
                        </Suggest >
                    </div>
                };
                {store.isSaggestWebThanks &&
                    <div className="saggestConteiner">
                        <Suggest title='Отправить открытку'
                                        onClick={() => sendAE("sendCongratulation", {})}
                                    >
                        </Suggest >
                        <Suggest title='Отправить текст «Благодарю за открытку»'
                                        onClick={() => {sendAE("sendTextCongratulation", {})}}
                                    >
                        </Suggest >
                    </div>
                }
            </div>
            {store.isMobile &&
                <Curtain isOpen={store.isOpenAlertUser}>
                        <div className="sendAlertMobile__contentWrappers">
                            <img className="sendAlertMobile__icon" src="./icons/warning.svg" alt="none" />
                            <div style={typography.body1} className="sendAlertMobile__textContent">
                                {store.openAlertUserMsg}
                            </div>
                                <div style={typography.body1} className="sendAlertMobile__subtitle">
                                    {store.openAlertUserSubMsg}
                                </div>
                        </div>
                </Curtain>
            }
            <CurtainAlert isOpen={store.isOpenSendAlert} title={store.openAlertUserMsg} subtitle={store.openAlertUserSubMsg}></CurtainAlert>
        </div>
    )
}

export default observer(CongratulationPage);