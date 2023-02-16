import React from "react";

import './SoundСontrol.scss';
import { IconMic, IconMicOff, IconVolumeUp, IconVolumeOff } from '@salutejs/plasma-icons';

import {observer} from "mobx-react-lite";
import store from "src/store";
import {sendAE} from "src/utils";

const SoundControl = () => {
    return(
        // <div className='soundСontrol'>
        //     <div className= {store.isMobile ? 'soundСontrol__iconIsMobile button' :'soundСontrol__icon button'} onClick={() => sendAE('SWITCH_VOLUME', {})}>
        //         {store.soundControl.volume ? <IconVolumeUp /> : <IconVolumeOff />}
        //     </div>
        //     <div className= {store.isMobile ? 'soundСontrol__iconIsMobile button' :'soundСontrol__icon button'} onClick={() => sendAE('SWITCH_MICROFON', {})}>
        //         {store.soundControl.microfon ? <IconMic /> : <IconMicOff />}
        //     </div>
        // </div>
        <div className='soundСontrol'>
            <div className= {store.isMobile ? 'soundСontrol__iconIsMobile button' :'soundСontrol__icon button'}>
                {store.soundControl.volume ? <IconVolumeUp /> : <IconVolumeOff />}
            </div>
            <div className= {store.isMobile ? 'soundСontrol__iconIsMobile button' :'soundСontrol__icon button'}>
                {store.soundControl.microfon ? <IconMic /> : <IconMicOff />}
            </div>
        </div>
    )
}

export default observer(SoundControl);