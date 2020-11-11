import React from "react";

function Footer({
    columnsNames, 
    toPrevious, 
    toNext, 
    toFirst, 
    toLast, 
    toCurrentPage, 
    firstPage, 
    lastPage, 
    currentPages
}) {
  
  console.log('render Footer')

  return (
    <div className='tfooter'>
        <div className='tr'>
        {
          columnsNames.map((v, i) => (
            <div className='th' key={i} style={{width: `calc(100% / ${columnsNames.length})`}}>{v}</div>
          ))
        }
        </div>
        <div className='navigation'>
            <button onClick={toPrevious}>← Previous</button>
            { currentPages[0] !== firstPage ? <button onClick={toFirst}>{firstPage}</button> : null}
            { currentPages[0] - firstPage > 1 ? <div>...</div> : null }
            {
                currentPages.map((page, i) =>{
                    return <button key={i} onClick={() => toCurrentPage(page)}>{page}</button>
                })
            }
            { lastPage - currentPages[2] > 1 ? <div>...</div> : null }
            { currentPages[2] !== lastPage ? <button onClick={toLast}>{lastPage}</button> : null}
            <button onClick={toNext}>Next →</button>            
        </div>
    </div>
  );
}

export default Footer;
