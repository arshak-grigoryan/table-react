import React,{ useState} from "react";

import {SLICE_LENG, CLASS_NAMES, KEY_CODE} from '../../constants/constants';

import ParagraphSliceable from './ParagraphSliceable';
import Icon from '../icon/Icon';

function Row({ // question I know my data structure
    userId,
    id,
    title,
    body,
    columnsNames,
    deleteItem,
    onKeyPressEditTitle,
}) {
  
  const style = {width: `calc(100% / ${columnsNames.length})`}

  const [isEdit, setIsEdit] = useState(false)
  
  const delItem = () => deleteItem(id)

  const toggleTitle = () => setIsEdit(true)

  const editTitle = (e) => {
    if(e.which === KEY_CODE.enter || e.keycode === KEY_CODE.enter) {
        onKeyPressEditTitle(e, id)
        setIsEdit(false)    
    }
  }

  console.log('render Row')

  return (
    <div className='tr'>
      {
        columnsNames.includes('userId') && 
        <div className='td' style={{...style}}>{userId}</div>
      }
      {
        columnsNames.includes('id') && 
        <div className='td' style={{...style}}>{id}</div>
      }
      {
        columnsNames.includes('title') && 
        <div className='td' style={{...style}}>
          {
              !isEdit ?
              <>
                  <ParagraphSliceable string={title} leng={SLICE_LENG}/>
                  <Icon type={CLASS_NAMES.edit} onClick={toggleTitle}/>
              </>
              :
              <input autoFocus
                  defaultValue={title} 
                  onKeyPress={editTitle} 
              />
          }
        </div>
      }
      {
        columnsNames.includes('body') &&
        <div className='td' style={{...style}}>
          <ParagraphSliceable string={body} leng={SLICE_LENG}/>
        </div>  
      }
      {
        columnsNames.includes('delete') && 
        <div className='td' style={{...style}}>
          <Icon type={CLASS_NAMES.delete} onClick={delItem}/>
        </div>
      }
    </div>
  )
}

export default Row