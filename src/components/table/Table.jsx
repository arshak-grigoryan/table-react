import React, { useState } from "react";

import useMount from "../../hooks/useMount";
// import useUpdate from '../../hooks/useUpdate';

import { URL, START_ROW, PAGE_ROW_COUNT } from "../../constants/constants";

import getData from "../../fetch/getData";
import getColumnsNames from "./helpers/getColumnsNames";

import Loading from "../loading/Loading";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

import "./table.scss";

function Table() {
  const [data, setData] = useState([]);
  const [columnsNames, setColumnsNames] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [startRow, setStartRow] = useState(START_ROW);
  const [endRow, setEndRow] = useState(PAGE_ROW_COUNT);
  const [currentPages, setCurrentPages] = useState([2, 3, 4]); // need to change fro any data size !!!

  const visibleData =
    startRow !== endRow - 1
      ? data.filter((_, i) => i >= startRow && i <= endRow - 1)
      : data.filter((_, i) => i >= startRow && i <= endRow - 1);
  const firstPage = 1;
  const lastPage = Math.ceil(data.length / PAGE_ROW_COUNT);

  useMount(() => {
    setTimeout(() => {
      // for Loading view
      (async () => {
        const data = await getData(URL);
        const columnsNames = await getColumnsNames(
          data,
          ["userId"],
          ["delete"]
        );
        setData(data);
        setColumnsNames(columnsNames);
        setVisibility(true);
      })();
    }, 0);
  });

  // useUpdate(() => {
  //   console.log('data', data)
  //   console.log('columns set', columnsNames)
  // }, [data,columnsNames])

  const deleteItem = (itemId) => {
    setData((prevData) => prevData.filter(({ id }) => id !== itemId));
    setEndRow((end) => {
      return (lastPage === Math.ceil(end / PAGE_ROW_COUNT) &&
        data.length % PAGE_ROW_COUNT !== 0) ||
        lastPage === end / PAGE_ROW_COUNT
        ? end - 1
        : end;
    });
    if (startRow === endRow - 1) {
      toPrevious();
    }
  };

  const onKeyPressEditTitle = (e, itemId) => {
    setData((prevData) =>
      prevData.map((val) => {
        return val.id === itemId
          ? { ...val, title: e.target.value }
          : { ...val };
      })
    );
  };

  const toPrevious = () => {
    if (startRow >= PAGE_ROW_COUNT) {
      setStartRow((start) => {
        setEndRow(start);
        return start - PAGE_ROW_COUNT;
      });
    }
  };

  const toNext = () => {
    const leng = data.length;
    if (endRow <= leng - 1) {
      setStartRow((start) => start + PAGE_ROW_COUNT);
      setEndRow((end) => {
        return lastPage === Math.ceil(end / PAGE_ROW_COUNT) + 1 &&
          leng % PAGE_ROW_COUNT !== 0
          ? end + (leng % PAGE_ROW_COUNT)
          : end + PAGE_ROW_COUNT;
      });
    }
  };

  const toFirst = () => {
    setStartRow(START_ROW);
    setEndRow(PAGE_ROW_COUNT);
    setCurrentPages([2, 3, 4]);
  };

  const toLast = () => {
    const leng = data.length;
    const lastPageItemsCount =
      leng % PAGE_ROW_COUNT === 0 ? PAGE_ROW_COUNT : leng % PAGE_ROW_COUNT;
    setStartRow(leng - lastPageItemsCount);
    setEndRow(leng);
    setCurrentPages([lastPage - 3, lastPage - 2, lastPage - 1]);
  };

  const toCurrentPage = (page) => {
    setStartRow((page - 1) * PAGE_ROW_COUNT);
    setEndRow(page * PAGE_ROW_COUNT);
    if (page === firstPage) {
      toFirst();
      return;
    }
    if (page === lastPage) {
      toLast();
      return;
    }
    const pagePosition = currentPages.findIndex((v) => v === page) + 1;
    setCurrentPages((prevState) =>
      prevState.map((v) => {
        switch (pagePosition) {
          case 1:
            return v - 1;
          case 2:
            return v;
          case 3:
            return v + 1;
          default:
            return page;
        }
      })
    );
  };

  console.log("render table");

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
        currentPages={currentPages}
        toPrevious={toPrevious}
        toNext={toNext}
        toFirst={toFirst}
        toLast={toLast}
        toCurrentPage={toCurrentPage}
        firstPage={firstPage}
        lastPage={lastPage}
      />
    </div>
  ) : (
    <Loading />
  );
}

export default Table;
