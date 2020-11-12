import React, { useEffect, useState, } from "react";

import useMount from '../../hooks/useMount';
// import useUpdate from '../../hooks/useUpdate';

import {URL, URL_WRONG, COLUMS, PAGE_ROW_COUNT} from '../../constants/constants';

import getData from '../../fetch/getData';
import getColumnsNames from './helpers/getColumnsNames';

import Loading from '../loading/Loading';

import Header from "./Header";
import Body from './Body';
import Footer from "./Footer";

import './table.scss';

function Table({errorMessage}) {
  const [data, setData] = useState([]);
  const [columnsNames, setColumnsNames] = useState([])
  const [visibility, setVisibility] = useState(false)
  const [error, setError] = useState(false)

  const [startRowIndex, setStartRowIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const dataLength = data.length
  const visibleData = data.filter((_, i) => i >= startRowIndex && i < startRowIndex + PAGE_ROW_COUNT)

  useMount(() => {
    setTimeout(() => { // for Loading view
      (async () => {
        const data = await getData(URL_WRONG)
        if (!Array.isArray(data)) {
          setError(true)
          return
        }      
        const columnsNames = await getColumnsNames(data, [COLUMS.delete], [COLUMS.userId])
        setData(data)
        setColumnsNames(columnsNames)
        setVisibility(true)
      })()
    }, 0)
  })

  // useUpdate(() => {
  //   console.log('data', data)
  //   console.log('columns set', columnsNames)
  // }, [data,columnsNames,])

  const deleteItem = itemId => {
    setData(prevData => prevData.filter(({id}) => id !== itemId))
    setCurrentPage(page => {
      if(visibleData.length-1 === 0) {
        setStartRowIndex((page-1) * PAGE_ROW_COUNT-PAGE_ROW_COUNT) 
        return page-1
      } else {
        return page
      }
    })
  }

  const onKeyPressEditTitle = (e, itemId) => {
    setData(prevData => prevData.map((val) => {
      return val.id === itemId ? {...val, title: e.target.value} : {...val}
    }))
  }

  const onPageChange = (page) => {
    setStartRowIndex(page * PAGE_ROW_COUNT - PAGE_ROW_COUNT)
    setCurrentPage(page)
  }

  if (error) throw new Error(errorMessage)

  console.log('render table')

  return (
    visibility ?
    <div className='table' >
      <Header 
        columnsNames={columnsNames}
      />
      <Body 
        visibleData={visibleData}
        columnsNames={columnsNames}
        columnCount={columnsNames.size}
        deleteItem={deleteItem} 
        onKeyPressEditTitle={onKeyPressEditTitle}
      />
      <Footer 
        columnsNames={columnsNames}
        dataLength={dataLength}
        onPageChange={onPageChange}
        currentPage={currentPage}
      />
    </div>
    :
    <Loading/>        
  );
}

export default Table;