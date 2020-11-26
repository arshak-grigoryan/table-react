import React from "react";

import {PAGE_ROW_COUNT} from  '../../constants/constants';

function Pagination({
    dataLength,
    currentPage,
    onPageChange
}) {

    const pageButtonsCount = 5
    const pageCount = Math.ceil(dataLength / PAGE_ROW_COUNT)
    const notFull = pageCount < pageButtonsCount
    const isFromStart = currentPage <= Math.ceil(pageButtonsCount / 2)
    const isFromEnd = currentPage >= Math.ceil(pageCount - pageButtonsCount / 2)

    const getStartPage = (index, pagePlace) => {
        if(pagePlace === 'notFull' || pagePlace === 'isFromStart') {
            return index + 1
        }
        if(pagePlace === 'isFromEnd') {
            return index + 1 + pageCount - pageButtonsCount
        }
        return index + currentPage - Math.floor(pageButtonsCount / 2)
    }

    const pages = (() => {
        if(notFull) {
            return Array(pageCount).fill(null).map((_, index) => getStartPage(index, 'notFull'))
        }
        if(isFromStart) {
            return Array(pageButtonsCount).fill(null).map((_, index) => getStartPage(index, 'isFromStart'));
        }
        if(isFromEnd) {
            return Array(pageButtonsCount).fill(null).map((_, index) => getStartPage(index, 'isFromEnd'))
        }
        return Array(pageButtonsCount).fill(null).map((_, index) => getStartPage(index))
    })()

  console.log('render Pagination')

  return (
    <div className='pagination'>
        {
            pages.map((page, i) => {
                return (
                    <button key={i} 
                        onClick={() => onPageChange(page)} 
                        style={
                            page === currentPage ? 
                            {borderColor: "tomato", color: "tomato"} : 
                            {borderColor: "silver", color: "initial"}
                        }
                    >
                    {page}
                    </button>
                )
            })
        }
    </div>
  );
}

export default Pagination;
