import React from 'react';
import './App.scss';
import {
    createAssistant,
    createSmartappDebugger,
} from '@salutejs/client';
import { Spinner } from "@sberdevices/plasma-ui";

import HolidayPage from 'src/pages/HolidayPage'
import CongratulationPage from "src/pages/CongratulationPage";
import SendReportPage from "src/pages/SendReportPage";

import Popup from "./components/ui/Popup/Popup";
import PopupContent from "./components/PopupContent/PopupContent";


import store, { AppDataType, CongratulationDataType, MainType } from "src/store";
import cn from "classnames";
import { observer } from 'mobx-react-lite'
import Debug from 'src/components/Debug';
import { MultipleCellElement } from "src/components/ui/Cell/MultipleCell/MultipleCell";
import { sendAE } from "./utils";
import { getDate, getTime } from "./assets/scripts/Date";
import SoundControl from "./components/ui/SoundСontrol";
import MainPage from "src/pages/MainPage";

import ChoosePostcard from "./components/ui/ChoosePostcard";
import AlertItem from './components/AlertItem';

const initialize = (getState: any) => {
    //eslint-disable-next-line no-constant-condition
    if (process.env.REACT_APP_DEB === "t") {
        return createSmartappDebugger({
            token: process.env.REACT_APP_ASSISTANT_TOKEN || '1',
            initPhrase: "запусти морковку",
            getState,
        });
    }
    return createAssistant({ getState });
};

export const CONGRATULATE: MultipleCellElement[] = [
    {
        title: 'Напоминаю поздравить коллег (скоро)',
        onClick: () => {
            sendAE("REMIND_COLLEAGUE", {})
        },
    },
    {
        title: 'Поздравить коллегу',
        onClick: () => {
            sendAE("CHOOSE_COLLEAGUE", {})
        },
    },
    {
        title: 'Поздравить  agile |  подраздление  ',
        onClick: () => {
            sendAE("CHOOSE_DIVISION", {})
        },
    },
    {
        title: 'Выбрать из своих списков',
        onClick: () => {
            sendAE("THEIR_LISTS", {})
        },
    }
]

function App() {
    const [debug, setDebug] = React.useState<string[]>([]);
    const [isDebugOpen, setIsDebugOpen] = React.useState(false);
    const [width, setWidth] = React.useState(window.innerWidth);
    const [time, setTime] = React.useState('');
    const [date, setDate] = React.useState('');
    const timer: any = React.useRef(null);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    React.useEffect(() => {
        clearTimeout(timer.current);
        timer.current = setInterval(() => {
            setTime(getTime());
            setDate(getDate());
        }, 100);

        return () => clearInterval(timer)
    }, [])

    React.useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    React.useEffect(() => {
        if (width <= 1024) {
            store.setIsMobile(true);
        } else {
            store.setIsMobile(false);
        }
    }, [width]);

    const toggleDebug = React.useCallback(() => {
        setIsDebugOpen(!isDebugOpen)
    }, [isDebugOpen])

    React.useEffect(() => {
        // @ts-ignore
        window.evg_assistant = initialize(() => null);
        // @ts-ignore
        window.evg_assistant.on("data", (appData: any) => {
            // console.log(appData)
            setDebug((prev) => {
                return [JSON.stringify(appData), ...prev]
            })

            if (appData.smart_app_data?.commandName === "showAlert") {
                alert(`${appData.smart_app_data.commandParams.upperText}, ${appData.smart_app_data.commandParams.lowerText}`)
            }

            if (appData?.smart_app_data?.commandParams?.screenName?.length > 0) {
                store.setPage(appData.smart_app_data.commandParams.screenName)
                store.setData(appData.smart_app_data.commandParams.params.data)
            }

            if (appData?.smart_app_data?.commandParams?.params?.select?.popupType &&
                appData?.smart_app_data?.commandParams?.params?.select?.popupType !== 'none') {
                store.setSelect(appData.smart_app_data.commandParams.params.select);
            }

            if (appData?.smart_app_data?.commandParams?.params?.selected) {
                store.setSelected(appData.smart_app_data.commandParams.params.selected);
            }

            // if (appData?.smart_app_data?.commandParams?.params?.soundControl) {
            //     store.setSoundControl(appData.smart_app_data.commandParams.params.soundControl);
            // }
            if (appData?.smart_app_data?.commandName === "soundControl") {
                store.setSoundControl(appData.smart_app_data.commandParams.soundControl);
            }

            if (appData?.smart_app_data?.commandParams?.params?.wish) {
                store.setWish(appData.smart_app_data.commandParams.params.wish);
            }

            if (appData?.smart_app_data?.commandParams?.params?.senderFio) {
                store.setSenderFio(appData.smart_app_data.commandParams.params.senderFio);
            }

            if (appData?.smart_app_data?.commandParams?.params?.isViewing !== undefined) {
                store.setIsViewing(appData.smart_app_data.commandParams.params.isViewing);
            }

            if (appData?.smart_app_data?.commandParams?.params?.pictureNext) {
                store.setActiveCaruselItem(store.activeCaruselItem + 1);
            }

            if (appData?.smart_app_data?.commandParams?.params?.picturePrev) {
                store.setActiveCaruselItem(store.activeCaruselItem - 1);
            }

            if (appData?.smart_app_data?.commandParams?.params?.toSend) {
                store.send();
            }

            if (appData?.smart_app_data?.commandParams?.params?.alertUser) {
                if (appData.smart_app_data.commandParams.params.alertUser === true) {
                    store.setAlertUser(appData.smart_app_data.commandParams.params.alertUser);
                    store.setOpenAlertUserMsg(appData.smart_app_data.commandParams.params.alertTitle);
                    store.setOpenAlertUserSubMsg(appData.smart_app_data.commandParams.params.alertSubtitle);
                    store.cleanSelected();
                }
            }
        });
    }, []);

    if (isDebugOpen) {
        return (
            <>
                <button className="App__debug" onClick={toggleDebug}>Debug</button>
                <Debug data={debug} />
            </>
        )
    }

    return (
        <div
            className={cn(
                "App",
                (store.data as AppDataType | CongratulationDataType).color !== 'white' && 'App_dark',
                store.isMobile && "App__mobile"
            )}
        >
            {
                !store.page ? (
                    <Spinner className='App__spinner' />
                ) : (
                    <>
                        {(!store.isMobile || (store.page === 'holidayConfigurator' && store.isMobile)) && <SoundControl />}
                        <button className="App__debug" onClick={toggleDebug}>Debug</button>
                        {!store.isMobile && store.page !== 'congratulation' && <div className='App__title'>{(store.data as AppDataType | CongratulationDataType | MainType).title}</div>}
                        {!store.isMobile && <div className='App__dateWrapper'>
                            <div className='App__time'>
                                {time}
                            </div>
                            <div className='App__date'>
                                {' '}{date}
                            </div>
                        </div>}
                        {store.page === 'main' && <MainPage />}
                        {store.page === 'holidayConfigurator' && <HolidayPage />}
                        {store.page === 'congratulation' && <CongratulationPage />}
                        {store.page === 'sendReport' && <SendReportPage />}
                        {/*<MainPage />*/}
                        {/* {console.log("test isOpenAlertUser----------", store.isOpenAlertUser)} */}
                        <Popup
                            position={store.select.popupType as 'left' | 'right'}
                            open={store.select.popupType !== 'none'}
                            onClose={store.closeSelect}
                        >
                            <PopupContent />
                        </Popup>
                        <ChoosePostcard />
                    </>
                )
            }
        </div>
    );
}

export default observer(App);
