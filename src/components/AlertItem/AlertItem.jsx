import React from 'react';

import { typography } from "@sberdevices/plasma-tokens";



const AlertItem = (props) => {
  return (
    <div className="alertItem">
      <div className="img">
        <img src="./err.svg" alt="none" />
      </div>
      <div style={typography.headline3} className="altxt upper">
        Отправить поздравление можно <br/> только другому человеку 
      </div>
      {/* <div style={typography.footnote1} className="altxt lower">
        {props.lowerText}{props.upperText}
      </div> */}
    </div>
  );
}

export default React.memo(AlertItem);
