import React from "react";

import './PopupContent.scss'

import cn from 'classnames'

import {IconChevronRight, IconMic,IconChevronLeft} from "@sberdevices/plasma-icons";
import Textarea from "src/components/ui/Textarea";
import Search from "src/components/ui/Search";
import {observer} from "mobx-react-lite";
import store, {SelectListType} from "src/store";
import Picture from "../ui/Picture";
import {sendAE} from "src/utils";

const PopupContent: React.FC = () => {
    const [content, setContent] = React.useState<any>(null);
    const [search, setSearch] = React.useState<string>('')

    React.useEffect(() => {
        switch (typeof store.select.selectList) {
            case 'string':
                setContent(
                    <>
                        <Textarea isMobile={store.isMobile} className='popupContent__textarea' value={store.wish} onChange={store.setWish} />
                        <div className='popupContent__textareaWarning'>*Максимальное количество символов 100</div>
                    </>
                );
                break;
            default:
                setContent(
                    <div className={cn('popupContent__cards', store.select.search && 'popupContent__cards_search')}>
                        {(store.select.selectList as SelectListType[]).map(({title, description, src, id, birthday}, index) => {
                            let newTitle: any = '';
                            if (title.toLowerCase().search(search.toLowerCase()) > -1) {
                                newTitle = (
                                    <>
                                        <span>
                                            {title.substring(0, title.toLowerCase().search(search.toLowerCase()) )}
                                        </span>
                                        <span className='popupContent__cardTitle_entered'>
                                            {title.substring(title.toLowerCase().search(search.toLowerCase()) , title.toLowerCase().search(search.toLowerCase())  + search.length)}
                                        </span>
                                        <span>
                                            {title.substring(title.toLowerCase().search(search.toLowerCase())  + search.length)}
                                        </span>
                                    </>
                                )
                            } else {
                                newTitle = title;
                            }
                            return (
                                <div
                                    key={index}
                                    onClick={function(){ 
                                        store.setSelected({title, description, src, id, birthday});
                                        sendAE("HOLIDAY_PAGE_CELLS", {
                                            birthday:store.selected[0].birthday,
                                            id: store.selected[0].id,
                                            title: store.selected[0].title, 
                                            description: store.selected[0].description,
                                            src: store.selected[0].src});
                                    }}
                                    className={cn(
                                        'popupContent__card',
                                        store.selected.findIndex(item => item.id === id) > -1 && 'popupContent__card_active'
                                    )}
                                >
                                    {typeof(src) === 'string' ? (
                                        <Picture className='popupContent__cardImage popupContent__cardImage_user' src={src || './icons/users.svg'} alt='userIcon' />
                                    ) : (
                                        <div className='popupContent__cardImage popupContent__cardImage_circle' />
                                    )}
                                    <div>
                                        <div className='popupContent__cardTitle'>
                                            {newTitle}
                                        </div>
                                        <div className='popupContent__cardDescription'>{description}</div>
                                    </div>
                                    {false && <IconChevronRight className='popupContent__cardArrow' />}
                                </div>
                            )
                        })}
                    </div>
                )
        }
    }, [store.select.title, store.wish, store.selected.length, store.select.selectList, search])


    return(
        <div className='popupContent'>
            <div className='popupContent__title'>
                {(store.select.multipleChoices || store.isMobile) &&
                    <div
                    className="popupContent__buttonBack" 
                    onClick={() => {
                        store.closeSelect()
                        store.cleanSelected()
                        sendAE("CANCEL__POPUP", {})
                    }}>
                        <IconChevronLeft />
                    </div>
                }
                <div>{store.select.title}</div>
                {false &&
                    <button className='popupContent__microfonWrapper'>
                        <IconMic className='popupContent__microfon' />
                    </button>
                }
            </div>
            {store.select.search && <Search value={search} onChange={setSearch} />}
            {content}
            {(store.select.multipleChoices || store.isMobile) && <div className='popupContent__buttonWrapper'>
                <div className='popupContent__button popupContent__button_green' onClick={() => store.closeSelect()}>Выбрать</div>
                <div
                    className='popupContent__button'
                    onClick={() => {
                        store.closeSelect()
                        store.cleanSelected()
                        sendAE("CANCEL__POPUP", {})
                    }}
                >
                    Отменить
                </div>
            </div>}
        </div>
    )
}

export default observer(PopupContent)