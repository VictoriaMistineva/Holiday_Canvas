import React from 'react';
import './HolidayPage.scss';
import './Alert.css'

import { typography } from "@sberdevices/plasma-tokens";

import {MultipleCell, SingleCellCircleMic, WrapperCell, UsersCell} from "src/components/ui/Cell";
import { IconChevronRight, IconChevronLeft, IconMic } from "@sberdevices/plasma-icons";

import store, {AppDataType, CongratulationDataType} from "src/store";
import { observer } from 'mobx-react-lite'

import { CONGRATULATE } from 'src/App';
import Curtain from "src/components/ui/Сurtain";
import Picture from "src/components/ui/Picture/Picture";
import Switch from "src/components/ui/Switch/Switch";
import Carusel from "src/components/ui/Carusel";
import Textarea from "src/components/ui/Textarea/Textarea";
import cn from "classnames";
import { getDate } from "src/assets/scripts/Date";
import {sendAE} from "src/utils";
import useDetectKeyboardOpen from "use-detect-keyboard-open";



import SendAlert from "src/pages/SendAlert"

import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg';
import Suggest from "src/components/ui/Suggest/Suggest";
import SendReportPage from '../SendReportPage';

const HolidayPage: React.FC = () => {
    const isKeyboardOpen = useDetectKeyboardOpen();
    const [firstTab, setFirstTab] = React.useState<any>(null);
    const [secondTab, setSecondTab] = React.useState<any>(null);
    const [title, setTitle] = React.useState<string>('');
    const sendCongratulation = React.useCallback(() => {
        store.send()
    }, [])

    React.useEffect(() => {
        switch ((store.data as AppDataType).holidayType) {
            case 'holiday':
                setTitle('Давайте выберем кого поздравить, категорию открытки и поздравление')
                break;
            case 'BD':
                setTitle('Давайте выберем категорию открытки и поздравление')
                break;
            case 'GD':
                setTitle('Давайте выберем кого поздравить, категорию открытки и поздравление')
                break;
        }
    }, [(store.data as AppDataType).holidayType])

    React.useEffect(() => {
        switch(true) {
            case (store.selected.length === 1):

                setFirstTab(
                    <SingleCellCircleMic
                        title={store.selected[0].title}
                        description={store.selected[0].description}
                        src={store.selected[0].src as string}
                        onClick={() => {
                            if((store.data as AppDataType).holidayType !== 'BD')
                            sendAE("CLICK__RESETCHOOSE", {})
                            store.cleanSelected()
                        }}
                        onClickMicrofon={() => sendAE("CLICK_RESETCHOOSE", {})}
                        
                    />
                    
                        
                    
                )
                // TODO убрать!!!!
                // sendAE("HOLIDAY_PAGE_CELLS", {
                //                 id: store.selected[0].id,
                //                 title: store.selected[0].title, 
                //                 description: store.selected[0].description,
                //                 src: store.selected[0].src})
                break
            case store.selected.length > 1:
                setFirstTab(
                    <UsersCell
                        onClick={() => {
                            store.cleanSelected()
                            sendAE("CLICK_RESETCHOOSE", {})
                        }}
                        title='Список коллег'
                        description='изменить выбор'
                        elements={store.selected}
                        onClickMicrofon={() => sendAE("CLICK_RESETCHOOSE", {})} 
                    />
                )
                break
            default:
                setFirstTab(
                    <MultipleCell
                        title='Кого поздравить '
                        elements={CONGRATULATE}
                        onClickMicrofon={() => sendAE("VOISE_CONGRATULATE", {})}
                    />
                )
                break
        }
    }, [store.selected, (store.data as AppDataType).holidayType])

    React.useEffect(() => {
        setSecondTab(
            <WrapperCell
                title='Добавить к открытке пожелание'
                className='holidayPage__multipleCellAdd holidayPage__multipleCellAdd_input'
                onClick={() => sendAE("OPEN_WISH", {})}
                withMicrofon={!(store.wish.length > 0)}
                onClickMicrofon={() => sendAE("VOISE_WISH", {})}
            >
                {store.wish.length > 0 && (
                    <Textarea isMobile={store.isMobile} value={store.wish} className='holidayPage__textarea' readOnly />
                )}
            </WrapperCell>
        )
    }, [(store.data as AppDataType).holidayType, store.wish])

    const date = React.useMemo(() => {
        return getDate().split(', ')[1];
    }, []);

    if(store.isMobile) {
        return (
            <div className='holidayPage'onClick={() => store.setAlertUser(false)}>
                <Carusel
                    carouselPictures={(store.data as AppDataType)?.pictures}
                    activeItem={store.activeCaruselItem}
                    setActiveItem={store.setActiveCaruselItem}
                />
                <div className={isKeyboardOpen ? "holidayPage__wrapperScreen" : "holidayPage__wrapper"} >
                    <div className='holidayPage__header'>
                        <button className='holidayPage__buttonBack' onClick={() => sendAE("BACK", {})}>
                            <IconChevronLeft />
                        </button>
                        {!store.isViewing && <div className='holidayPage__date'>{`Сегодня ${date}`}</div>}
                    </div>
                    {store.isViewing ? (
                        <div className='holidayPage__viewingContent'>
                            <div className='holidayPage__viewingTitle'>
                                {(store.data as AppDataType).holidayType !== 'BD' ?
                                (store.data as AppDataType).title :
                                'C ДНЕМ РОЖДЕНИЯ!'}
                            </div>
                            {store.wish.map((title) => (
                                <div className='holidayPage__viewingDescription'>{title}</div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {store.selected.length > 0 ? (
                                <Switch onChange={store.switchColor} isChecked={(store.data as AppDataType).color === 'white'} className='holidayPage__switch'>
                                    Светлый шрифт
                                </Switch>
                                
                            ) : (
                                <div className='holidayPage__headline'>{(store.data as AppDataType | CongratulationDataType).title}</div>
                            )}
                            
                            <div className='holidayPage__content'>
                                <div className='holidayPage__cells'>
                                    {firstTab}
                                </div>
                                <div className={cn('holidayPage__changeSlide',
                                    (store.data as AppDataType)?.postcards?.length > 0 && 'holidayPage__changeSlide_postcards')}
                                >
                                    <button className='holidayPage__button' onClick={() => store.setActiveCaruselItem(store.activeCaruselItem - 1)}>
                                        <IconChevronLeft />
                                    </button>
                                    <div
                                        className='holidayPage__changeSlidesTitle'
                                        onClick={() => store.setIsCurtain((store.data as AppDataType)?.postcards?.length > 0 && !store.isCurtain)}
                                    >
                                        <div>Выберите открытку</div>
                                        {(store.data as AppDataType).postcards && (
                                            <>
                                                <div>из категории {(store.data as AppDataType)?.postcards[store.activeRadioButton]?.title}</div>
                                                <div className='holidayPage__changeSlidesDescription'>
                                                    изменить выбор
                                                    <IconMic className='holidayPage__postcardMicrofon' />
                                                </div>
                                            </>)}
                                    </div>
                                    <button className='holidayPage__button' onClick={() => store.setActiveCaruselItem(store.activeCaruselItem + 1)}>
                                        <IconChevronRight />
                                    </button>
                                </div>
                                <div className='holidayPage__wish'>
                                    <WrapperCell
                                        onClickMicrofon={() => sendAE("VOISE_WISH", {})}
                                        title='Добавить к открытке пожелание'
                                        className='holidayPage__multipleCellAdd holidayPage__multipleCellAdd_input'
                                    >
                                        <Textarea isMobile={store.isMobile} value={store.wish} className='holidayPage__textarea' onChange={store.setWish} />
                                    </WrapperCell>
                                </div>
                            </div>
                        </>
                    )}
                    {store.selected.length > 0 && (
                        <>
                            <div className='holidayPage__suggest'>
                                {!store.isViewing ? (
                                    <Suggest title='К просмотру' onClick={() => store.setIsViewing(true)} />
                                ) : (
                                    <>
                                        <div className='holidayPage__sender'>{store.senderFio}</div>
                                        <Suggest title='Изменить' onClick={() => store.setIsViewing(false)} />
                                        <Suggest title='Отправить' onClick={store.send} />
                                    </>
                                )}
                            </div>
                        </>
                    )}
                {/* <>{console.log((store.data as CongratulationDataType).sender)}</> */}
                </div>
                <Curtain isOpen={store.isOpenAlertUser}>
                    {/* <SendAlert title={store.openAlertUserMsg} subtitle={store.openAlertUsertSubMsg}/> */}
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
            </div>
        )
    }

    return(
        <div className='holidayPage' onClick={() => store.setAlertUser(false)}>
            <div className='holidayPage__title'>{title}</div>
            <div className='holidayPage__configurator'>
                <div>
                    {/* {console.log( "color___"+ (store.data as AppDataType).color)}
                    {console.log( "color2___"+ (store.switchColor))} */}
                    <Switch onChange={store.switchColor} isChecked={(store.data as AppDataType).color === 'white'} className='holidayPage__switch'>
                        Светлый шрифт
                    </Switch>
                    {firstTab}
                </div>
                <div className='holidayPage__pictureWrapper'>
                    <button className='holidayPage__pictureIcon' onClick={() => store.setActiveCaruselItem(store.activeCaruselItem - 1)}>
                        <IconChevronLeft />
                    </button>
                    <div className='holidayPage__phonePictureWrapper'>
                        <Picture className='holidayPage__phonePicture' src='https://cntnt-ift.sberdevices.ru/ift-smartappide-ba/263/12381/G0PCj1ZqOzWGikUo.png' alt='phone' />
                        <Picture className='holidayPage__lavasharPicture' src='https://cntnt-ift.sberdevices.ru/ift-smartappide-ba/263/12381/nDFs6zNjPGiGV3O5.png' alt='phone' />
                        <div className='holidayPage__pictureSliderWrapper'>
                            {(store.data as AppDataType)?.pictures?.length > 0 &&
                            <Carusel activeItem={store.activeCaruselItem} setActiveItem={store.setActiveCaruselItem}
                                     carouselPictures={(store.data as AppDataType).pictures} />
                            }
                        </div>
                        <div className='holidayPage__pictureContentWrapper'>
                            <div className='holidayPage__pictureTitle'>
                                {(store.data as AppDataType).holidayType !== 'BD' ?
                                    (store.data as AppDataType).title :
                                    'C ДНЕМ РОЖДЕНИЯ!'
                                }
                            </div>
                            <div className='holidayPage__pictureDescription'>
                                {store.wish.map((title, index) => (
                                    <div key={'wish' + index} className='holidayPage__pictureDescriptionContent'>{title}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => store.setActiveCaruselItem(store.activeCaruselItem + 1)}
                        className='holidayPage__pictureIcon'>
                        <IconChevronRight />
                    </button>
                </div>
                {secondTab}

            </div>
            <div className='holidayPage__postcardsWrapper'>
                {(store.data as AppDataType)?.postcards?.length > 0 && (
                    <>
                        <div className='holidayPage__postcardsTitle'>Категории открыток</div>
                        <div className='holidayPage__postcards'>
                            {(store.data as AppDataType)?.postcards.map(({src, title}, index) => (
                                <button key={index + title} className='holidayPage__postcard' onClick={() => sendAE("NEW_POSTCARD_CATEGORY", {index})}>
                                    <Picture className='holidayPage__postcardPicture' src={src} alt={title} />
                                    <div className='holidayPage__postcardContent'>
                                        <div className='holidayPage__postcardTitle'>{title}</div>
                                        <div className='holidayPage__postcardMicrofonWrapper'>
                                            <IconMic className='holidayPage__postcardMicrofon' />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </>)}
            </div>
            <div
                className={cn('holidayPage__send',
                    store.selected.length > 0 &&
                    'holidayPage__send_active')}
                onClick={store.selected.length > 0 ? sendCongratulation : undefined}
            >
                Отправить
            </div>
            
            <Curtain isOpen={store.isOpenAlertUser}> <SendAlert title={store.openAlertUserMsg} subtitle={store.openAlertUserSubMsg} /> </Curtain>
        </div>
    )
}

export default observer(HolidayPage);