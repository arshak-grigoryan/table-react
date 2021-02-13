import React, { useState } from 'react';

import useMount from '../../hooks/useMount';
// import useUpdate from '../../hooks/useUpdate';

import { URL, COLUMS, PAGE_ROW_COUNT } from '../../constants';

import makeFetch from '../../fetch/makeFetch';
import Loader from '../Loader';
import getColumnsNames from './helpers/getColumnsNames';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import './table.scss';

// const Body = lazy(() => import('./Body'));

function Table({ errorMessage }) {
  const [data, setData] = useState([]);
  const [columnsNames, setColumnsNames] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [error, setError] = useState(false);

  const [startRowIndex, setStartRowIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dataLength = data.length;
  const visibleData = data.filter(
    (_, i) => i >= startRowIndex && i < startRowIndex + PAGE_ROW_COUNT
  );

  useMount(() => {
    setTimeout(() => {
      // for Loader view
      (async () => {
        const res = await makeFetch(URL);
        if (!Array.isArray(res)) {
          setError(true);
          return;
        }
        const colNames = await getColumnsNames(
          res,
          [COLUMS.delete],
          [COLUMS.userId]
        );
        setData(res);
        setColumnsNames(colNames);
        setVisibility(true);
      })();
    }, 0);
  });

  // useUpdate(() => {
  //   console.log('data', data)
  //   console.log('columns set', columnsNames)
  // }, [data,columnsNames,])

  const deleteItem = (itemId) => {
    setData((prevData) => prevData.filter(({ id }) => id !== itemId));
    setCurrentPage((page) => {
      if (visibleData.length - 1 === 0) {
        setStartRowIndex((page - 1) * PAGE_ROW_COUNT - PAGE_ROW_COUNT);
        return page - 1;
      }
      return page;
    });
  };

  const onKeyPressEditTitle = (e, itemId) => {
    setData((prevData) =>
      prevData.map((val) =>
        val.id === itemId ? { ...val, title: e.target.value } : { ...val }
      )
    );
  };

  const onPageChange = (page) => {
    setStartRowIndex(page * PAGE_ROW_COUNT - PAGE_ROW_COUNT);
    setCurrentPage(page);
  };

  if (error) throw new Error(errorMessage);

  // console.log('render table');

  return visibility ? (
    <div className="table">
      <Header columnsNames={columnsNames} />
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
  ) : (
    <Loader />
  );
}

export default Table;
