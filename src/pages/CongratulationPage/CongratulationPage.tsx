import React from "react";

import './CongratulationPage.scss'

import Picture from "src/components/ui/Picture";
import store, {CongratulationDataType, AppDataType} from 'src/store'
import {observer} from "mobx-react";
import Suggest from "src/components/ui/Suggest/Suggest";
import {sendAE} from "../../utils";
import {IconChevronLeft,IconChevronDown} from "@sberdevices/plasma-icons";
import Curtain from "src/components/ui/Сurtain";
import { typography } from "@sberdevices/plasma-tokens";
import CurtainAlert from "src/components/ui/СurtainAlert";
import SendAlert from "../SendAlert";

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

const handleClickThanks = () =>{
    sendAE("sendAppreciate", {});
    store.setIsCurtainThanks(true);
    store.setSaggestWebThanks(true);
}

const handleClickBACK= () =>{
    sendAE("BACK", {})
    store.cleanSelected()
    console.log("store.backButtonToExit-- " + store.backButtonToExit )
}

const CongratulationPage = () => {
    {console.log(store.isCurtainThanks  + "store.isCurtainThanks ")}
    return(
        <div onClick={() => {store.setAlertUser(false);store.setIsCurtainThanks(false);store.setSendAlert(false)}}>
            <div className='congratulationPage__wrapper' >
                <div className='congratulationPage'>
                    <button className='congratulationPage__buttonBack' onClick={handleClickBACK}>
                        {store.backButtonToExit ? <IconChevronDown/> : <IconChevronLeft />}
                    </button>
                    <Picture alt='letter' src='https://content.sberdevices.ru/smartmarket-smide-prod/258851/606230/E7anAznyPqwNbSn2.png' className='congratulationPage__letter' />
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
                {(!store.isSaggestWebThanks || store.isMobile ) && !store.isCurtainThanks && 
                    <div className="saggestConteiner">
                        <Suggest title='Пожелать хорошего дня'
                                        onClick={() => sendAE("sendCongratulationGoodDay", {})}
                        >
                        </Suggest >
                        <Suggest title='Поблагодарить'
                                        onClick={() => handleClickThanks()}
                                    >
                        </Suggest >
                    </div>
                };
                {(store.isSaggestWebThanks || store.isCurtainThanks  ) && !store.isMobile  && 
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
                <Curtain isOpen={store.isOpenAlertUser} isAutoClose={true}>
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
            
            <Curtain isOpen={store.isOpenAlertUser} isAutoClose={true} > <SendAlert title={store.openAlertUserMsg} subtitle={store.openAlertUserSubMsg} /> </Curtain>
        </div>
    )
}

export default observer(CongratulationPage);