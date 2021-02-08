import { KEY_CODE } from '../../constants/constants';

import useOutsideClick from '../../hooks/useOutSideClick';

const InputEdit = ({ id, title, onKeyPressEditTitle, setIsEdit }) => {
  const editTitle = (e, isOutSideClick) => {
    // console.log(e, param)
    if (isOutSideClick) {
      setIsEdit(false);
      return;
    }
    if (e.which === KEY_CODE.enter || e.keycode === KEY_CODE.enter) {
      onKeyPressEditTitle(e, id);
      setIsEdit(false);
    }
  };

  const ref = useOutsideClick(editTitle);

  // console.log('render InputEdit');

  return (
    <input autoFocus defaultValue={title} onKeyPress={editTitle} ref={ref} />
  );
};

export default InputEdit;
