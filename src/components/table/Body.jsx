import React from 'react';

import Row from './Row';

function Body({ visibleData, ...props }) {
  // console.log('render Body');

  return (
    <div className="tbody">
      {visibleData.map(({ id, ...rest }) => {
        // console.log('loop iteration');
        return <Row key={id} id={id} {...rest} {...props} />;
      })}
    </div>
  );
}

export default Body;
