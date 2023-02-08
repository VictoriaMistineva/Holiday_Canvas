import React from "react";

const useDebounce = (timeout: number) => {
    const timer: any = React.useRef(null)
    return (func: any) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            func();
        }, timeout);
    };
};

export default useDebounce;
