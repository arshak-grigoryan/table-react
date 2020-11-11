import React from "react";

import {PAGE_ROW_COUNT} from  '../../constants/constants';

function Pagination({
    dataLength,
    currentPage,
    onPageChange
}) {

    const lastPage = Math.ceil(dataLength / PAGE_ROW_COUNT)
    const previousPage = currentPage-1
    const nextPage = currentPage+1    
    
    const pages = (() => {
        if(dataLength > 4*PAGE_ROW_COUNT) {
            if(currentPage === 1) {
                return [currentPage,nextPage,currentPage+2,currentPage+3,currentPage+4]
            } else if(currentPage === 2) {
                return [previousPage,currentPage,nextPage,currentPage+2,currentPage+3]
            } else if(currentPage === lastPage-1) {
                return [currentPage-3 ,currentPage-2,previousPage,currentPage,nextPage]
            } else if (currentPage === lastPage) {
                return [currentPage-4,currentPage-3 ,currentPage-2,previousPage,currentPage,]
            } else {
                return [currentPage-2,previousPage,currentPage,nextPage,currentPage+2]
            }
        } else if(dataLength > 2*PAGE_ROW_COUNT) {
            if(currentPage === 1) {
                return [currentPage,nextPage,currentPage+2]
            } else if (currentPage === lastPage) {
                return [currentPage-2,previousPage,currentPage,]
            } else {
                return [previousPage,currentPage,nextPage]
            }
        } else if (dataLength > PAGE_ROW_COUNT) {
            if(currentPage === 1) {
                return [currentPage,nextPage]
            } else{
                return [previousPage,currentPage]
            }
        } else if (dataLength > 0) {
            return [currentPage]
        } else {
            return []
        }
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
