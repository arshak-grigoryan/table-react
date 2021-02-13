import React from 'react';

import useTextSlice from '../../hooks/useTextSlice';

function ParagraphSliceable({ string, leng }) {
  const stringSlice = useTextSlice(string, leng);

  // console.log('render ParagraphSliceable');

  return (
    <p>
      {stringSlice.text}
      {string.length > leng && (
        <span onClick={stringSlice.onClick} className="moreless">
          {stringSlice.isFull ? 'Read less' : 'Read more'}
        </span>
      )}
    </p>
  );
}

export default ParagraphSliceable;
