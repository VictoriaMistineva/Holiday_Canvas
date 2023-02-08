
export const DAYS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

export const LONGNAMEMONTHS = ['Января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export function add_zero(str: any) {
    str = String(str);
    if (str.length === 1) return "0" + str;
    return str;
}

export const getTime = () => {
    const d = new Date();
    return(`${add_zero(d.getHours())}:${add_zero(d.getMinutes())}`)
}

export const getDate = () => {
    const d = new Date();
    return(`${DAYS[d.getDay()]}, ${d.getDate()} ${LONGNAMEMONTHS[(d.getMonth())]}`)
}

export const getDate2 = () => {
    const d = new Date();
    return(`${d.getDate()} ${LONGNAMEMONTHS[(d.getMonth())]}`)
}