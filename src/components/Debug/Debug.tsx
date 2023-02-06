import React from "react";

import "./Debug.scss";

interface DebugProps {
    data: string[];
}

const Debug: React.FC<DebugProps> = ({ data }) => {
    return(
        <div className='debug'>
            {
                data.map((el) => (
                    <div key={el} className='debug__card'>{el}</div>
                ))
            }
        </div>
    )
}

export default React.memo(Debug);