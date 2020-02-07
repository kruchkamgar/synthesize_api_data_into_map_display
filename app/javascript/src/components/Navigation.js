import React from 'react';
import flyToCoordinates from './lib/flyToCoordinates';

const Navigation = ({arrow, onEvent}) => {

  return(
    <div className="navigation">
      <div className={arrow} onClick={(event) => {
        onEvent(flyToCoordinates, event) }}></div>
    </div>
  )

}

export default Navigation
