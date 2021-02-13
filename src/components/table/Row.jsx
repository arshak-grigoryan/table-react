import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { SLICE_LENG } from '../../constants';
import ParagraphSliceable from './ParagraphSliceable';
import InputEdit from './InputEdit';

function Row({
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
        <div className="td title" style={{ ...style }}>
          {!isEdit ? (
            <>
              <ParagraphSliceable string={title} leng={SLICE_LENG} />
              <FontAwesomeIcon icon={faEdit} onClick={toggleTitle} />
            </>
          ) : (
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
        <div className="td body" style={{ ...style }}>
          <ParagraphSliceable string={body} leng={SLICE_LENG} />
        </div>
      )}
      {columnsNames.includes('delete') && (
        <div className="td" style={{ ...style }}>
          <FontAwesomeIcon icon={faTrashAlt} onClick={delItem} />
        </div>
      )}
    </div>
  );
}

export default Row;
