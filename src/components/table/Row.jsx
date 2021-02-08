import React, { useState } from 'react';

import { SLICE_LENG, CLASS_NAMES } from '../../constants/constants';

import Icon from '../icon/Icon';
import ParagraphSliceable from './ParagraphSliceable';
import InputEdit from './InputEdit';

function Row({
  // question I know my data structure
  userId,
  id,
  title,
  body,
  columnsNames,
  deleteItem,
  onKeyPressEditTitle,
}) {
  const style = { width: `calc(100% / ${columnsNames.length})` };

  const [isEdit, setIsEdit] = useState(false);

  const delItem = () => deleteItem(id);

  const toggleTitle = () => setIsEdit(true);

  // console.log('render Row');

  return (
    <div className="tr">
      {columnsNames.includes('userId') && (
        <div className="td" style={{ ...style }}>
          {userId}
        </div>
      )}
      {columnsNames.includes('id') && (
        <div className="td" style={{ ...style }}>
          {id}
        </div>
      )}
      {columnsNames.includes('title') && (
        <div className="td" style={{ ...style }}>
          {!isEdit ? (
            <>
              <ParagraphSliceable string={title} leng={SLICE_LENG} />
              <Icon type={CLASS_NAMES.edit} onClick={toggleTitle} />
            </>
          ) : (
            // <input autoFocus defaultValue={title} onKeyPress={editTitle} />
            <InputEdit
              id={id}
              title={title}
              onKeyPressEditTitle={onKeyPressEditTitle}
              setIsEdit={setIsEdit}
            />
          )}
        </div>
      )}
      {columnsNames.includes('body') && (
        <div className="td" style={{ ...style }}>
          <ParagraphSliceable string={body} leng={SLICE_LENG} />
        </div>
      )}
      {columnsNames.includes('delete') && (
        <div className="td" style={{ ...style }}>
          <Icon type={CLASS_NAMES.delete} onClick={delItem} />
        </div>
      )}
    </div>
  );
}

export default Row;
