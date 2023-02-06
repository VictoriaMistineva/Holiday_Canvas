import React from "react";

import './Search.scss'
import useDebounce from "src/assets/hooks/useDebounce";
import {sendAE} from "src/utils";

export type SearchProps = {
    value: string;
    onChange: (newValue: string) => void;
};

const Search: React.FC<SearchProps> = ({ value, onChange}) => {
    const debounceSearch = useDebounce(333)

    const onHandlerSearchChange = React.useCallback( (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        debounceSearch(() => sendAE('SEARCH_VALUE', {text: value}));
    }, [value])

    return (
        <input type="text" placeholder='Введите ФИО коллеги' className='search' onChange={(e) => onHandlerSearchChange(e)} />
    )
}

export default React.memo(Search);