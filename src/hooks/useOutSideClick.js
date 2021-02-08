import { useEffect, useRef } from 'react';

const useOutSideClick = (effect) => {
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current.contains(e.target)) {
        effect(e, true);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [effect]);
  return ref;
};

export default useOutSideClick;
