import React from 'react';

import useTextSlice from '../../hooks/useTextSlice';

function ParagraphSliceable({ string, leng }) {
  const stringSlice = useTextSlice(string, leng);

  // console.log('render ParagraphSliceable');

  return (
    <p>
      {stringSlice.text}
      {string.length > leng && (
        <button onClick={stringSlice.onClick}>
          {stringSlice.isFull ? 'Read less' : 'Read more'}
        </button>
      )}
    </p>
  );
}

export default ParagraphSliceable;
