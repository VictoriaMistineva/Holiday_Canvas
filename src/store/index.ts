import { makeAutoObservable } from "mobx";
import {sendAE} from "../utils";
import React from "react";

export type SoundControlType = {
    microfon: boolean,
    volume: boolean,
}

export type PostcardsType = {
    title: string,
    src: string,
}

export type SelectListType = {
    id?: string,
    title: string,
    description?: string,
    birthday?: string,
    src?: string | false,
}

export type SelectType = {
    selectList: SelectListType[] | string,
    title: string,
    popupType: 'none' | 'left' | 'right',
    multipleChoices?: boolean,
    search?: boolean,
}

export type MainType = {
    title: string,
    holiday: string,
    birthdays: SelectListType[],
    bg: string,
}

export type SendReportType = {
    name: string,
    status: boolean
}

export type CongratulationDataType = {
    title: string,
    description: string[],
    picture: string,
    sender: string,
    color: 'white' | 'black',
}

export type AppDataType = {
    title: string,
    type: string,
    pictures: string[],
    postcards: PostcardsType[],
    // BD - birthday, GD - good day AP - поблагодарить
    holidayType: 'holiday' | 'BD' | 'GD',
    color: 'white' | 'black'
}

class Store {
    page: string = '';
    selected: SelectListType[] = [];
    wish: string[] = [];
    wishType: string = ''
    senderFio : string = ''
    select: SelectType = {
        selectList: [],
        title: '',
        popupType: 'none',
        multipleChoices: false
    };
    data: AppDataType | CongratulationDataType | SendReportType | MainType = {
        title: '',
        type: '',
        pictures: [],
        postcards: [],
        holidayType: "holiday",
        color: 'white',
    };
    activeCaruselItem = 1;
    isMobile: boolean = false;
    isOpenAlertUser: boolean = false;
    isOpenSendAlert: boolean = false;
    openAlertUserMsg: string = "";
    openAlertUserSubMsg: string = "";
    isViewing: boolean = false;
    isCurtain: boolean = false;
    isSaggestWebThanks: boolean = false;
    backButtonToExit: boolean|undefined = false;
    isCurtainThanks: boolean = false;
    soundControl: SoundControlType = {
        microfon: false,
        volume: false,
    }
    activeRadioButton: number = 0;
    checkboxAccess : boolean|undefined = undefined;
    constructor() {
        makeAutoObservable(this);
    }

    setPage = (newPage: string) => {
        this.page = newPage;
    }
    setCheckboxAccess = (checkboxAccess: boolean|undefined ) =>
    {
        this.checkboxAccess = checkboxAccess;
    }
    setData = (newData: AppDataType | CongratulationDataType | SendReportType | MainType) => {
        this.data = newData;
    }

    switchColor = () =>  {
        (this.data as AppDataType).color === 'white' ? (this.data as AppDataType).color = 'black' : (this.data as AppDataType).color = 'white';
    }
    setBackButtonToExit = (isbackButtonToExit: boolean|undefined) => {
        this.backButtonToExit = isbackButtonToExit;
    }
    setWish = (newWisth: string[]) => {
        this.wish = newWisth;
    }
    setWishType = (newWisthType : string) => {
        this.wishType = newWisthType ;
    }
    setSenderFio= (sender: string) => {
        this.senderFio = sender;
    }

    setIsMobile = (value: boolean) => {
        this.isMobile = value;
    }

    setAlertUser = (open: boolean) => {
        this.isOpenAlertUser = open;
    }
    setSendAlert = (open: boolean) => {
        this.isOpenSendAlert = open;
    }

    setOpenAlertUserMsg = (msg : string) => {
        this.openAlertUserMsg = msg;
    }

    setOpenAlertUserSubMsg = (msg : string) => {
        this.openAlertUserSubMsg = msg;
    }

    setSelected = (newSelected: SelectListType) => {
        if (this.select.multipleChoices) {
            if (this.selected.findIndex(item => item.id === newSelected.id) > -1) {
                this.selected.splice(this.selected.findIndex(item => item.id === newSelected.id), 1);
                return
            }
            this.selected = [...this.selected, newSelected];                       
        } else {
            this.selected = [newSelected];
            this.closeSelect();
        }
    }

    setActiveCaruselItem = (newActiveCaruselItem: number) => {
        this.activeCaruselItem = newActiveCaruselItem;
    }

    setSelect = (newSelect: SelectType) => {
        this.select = newSelect;
    }

    cleanSelected = (): void => {
        this.selected = [];
    }

    closeSelect = () => {
        this.select = {
            selectList: [],
            title: '',
            popupType: 'none',
            multipleChoices: false,
            search: false,
        };
    }

    setSoundControl = (newSoundControl: SoundControlType) => {
        this.soundControl = newSoundControl;
    }

    setIsViewing = (newIsViewing: boolean) => {
        this.isViewing = newIsViewing;
    }

    setIsCurtain = (newIsCurtain: boolean) => {
        this.isCurtain = newIsCurtain;
    }
    setIsCurtainThanks = (newIsCurtainThanks: boolean) => {
        this.isCurtainThanks = newIsCurtainThanks;
    }
    
    setActiveRadioButton = (newActiveRadioButton: number) => {
        this.activeRadioButton = newActiveRadioButton;
    }
    setSaggestWebThanks= (saggestWebThanks: boolean) => {
        this.isSaggestWebThanks = saggestWebThanks;
    }
    send = () => {
        this.setPage('');
        if(this.selected && (this.data as AppDataType).holidayType) {
            sendAE("SEND_SELECTION", {
                selected: this.selected,
                wish: this.wish,
                title: (this.data as AppDataType).holidayType,
                picture: (this.data as AppDataType).pictures[this.activeCaruselItem - 1],
                color: (this.data as AppDataType).color,
            })
        }
    }
}

export default new Store();