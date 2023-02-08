import React from "react";

import './CongratulationPage.scss'

import Picture from "src/components/ui/Picture";
import store, {CongratulationDataType} from 'src/store'
import {observer} from "mobx-react";
import Suggest from "src/components/ui/Suggest/Suggest";
import {sendAE} from "../../utils";
import {IconChevronLeft} from "@sberdevices/plasma-icons";

const CongratulationPage = () => {
    return(
        <div className='congratulationPage__wrapper'>
            <div className='congratulationPage'>
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
        </div>
    )
}

export default observer(CongratulationPage);