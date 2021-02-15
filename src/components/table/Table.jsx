import { useState } from 'react';
import useMount from '../../hooks/useMount';
import { URL, COLUMS } from '../../constants';
import makeFetch from '../../fetch/makeFetch';
import Skeleton from '../Skeleton';
import getColumnsNames from './helpers/getColumnsNames';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import './table.scss';

function Table() {
  const [rowPerPage, setRowPerPage] = useState(15);
  const [data, setData] = useState([]);
  const [columnsNames, setColumnsNames] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [startRowIndex, setStartRowIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dataLength = data.length;
  const visibleData = data.filter(
    (_, i) => i >= startRowIndex && i < startRowIndex + rowPerPage
  );

  useMount(() => {
    // timeout is for Skeleton view
    setTimeout(() => {
      (async () => {
        const res = await makeFetch(URL);
        if (!Array.isArray(res)) {
          setIsFetched(true);
          return;
        }
        const colNames = await getColumnsNames(
          res,
          [COLUMS.delete],
          [COLUMS.userId]
        );
        setData(res);
        setColumnsNames(colNames);
        setIsFetched(true);
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
        setStartRowIndex((page - 1) * rowPerPage - rowPerPage);
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
    setStartRowIndex(page * rowPerPage - rowPerPage);
    setCurrentPage(page);
  };

  // console.log('Table');

  if (isFetched && !dataLength) {
    throw new Error('asddasdv');
  }

  return isFetched ? (
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
        rowPerPage={rowPerPage}
        setRowPerPage={setRowPerPage}
      />
    </div>
  ) : (
    <Skeleton />
  );
}

export default Table;
