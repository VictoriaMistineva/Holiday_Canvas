import React from "react";
import './ChoosePostcard.scss'
import { IconChevronRight } from "@sberdevices/plasma-icons";

import store, {AppDataType} from "../../../store";
import { observer } from 'mobx-react-lite'
import RadioButton from "../RadioButton/RadioButton";
import {sendAE} from "../../../utils";
import Curtain from "../Сurtain";

const ChoosePostcard = () => {

    const onHandlerSelect = React.useCallback(() => {
        let index = store.activeRadioButton;
        sendAE("NEW_POSTCARD_CATEGORY", {index});
        store.setIsCurtain(false);
    }, [store.isCurtain, store.activeRadioButton])

    React.useEffect(() => {
        if(store.isCurtainThanks)
        {
            sendAE("sendAppreciate", {});
        }
    },[store.isCurtainThanks])
    
    
    return(
        <>
            <Curtain isOpen={store.isCurtain} isAutoClose={false}>
                <div className='choosePostcard__title'>Хотите изменить категорию?</div>
                <div className='choosePostcard__radioButtonWrapper'>
                    {(store.data as AppDataType)?.postcards?.map(({title}, index) => (
                        <RadioButton className='choosePostcard__radioButton' checked={index === store.activeRadioButton} onClick={() => store.setActiveRadioButton(index)}>
                            {title}
                        </RadioButton>
                    ))}
                </div>
                <div className='choosePostcard__button' onClick={onHandlerSelect}>
                    Выбрать
                </div>
            </Curtain>

            {store.isMobile && <Curtain isOpen={store.isCurtainThanks} isAutoClose={false}>
                    <div className='choosePostcard__curtainThanks'  >
                        <div className='choosePostcard__curtainConteiner'onClick={()=>{store.setIsCurtainThanks(false);sendAE("sendCongratulation", {})}}>
                            <div className='choosePostcard__titleCurtain'>
                                Отправить открытку
                            </div>
                            <IconChevronRight/>
                        </div>
                        <div className='choosePostcard__curtainConteiner' onClick={()=>{store.setIsCurtainThanks(false);sendAE("sendTextCongratulation", {})}} >
                            <div className='choosePostcard__titleCurtain'>
                                Отправить текст <br></br>«Благодарю за открытку» 
                            </div>
                            <IconChevronRight/>
                        </div>
                    </div>

                </Curtain>
            }
        </>
        
    )
}

export default observer(ChoosePostcard)
