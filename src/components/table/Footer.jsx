import Pagination from '../Pagination/Pagination1';

function Footer({ columnsNames, currentPage, dataLength, onPageChange }) {
  // console.log('render Footer');

  return (
    <div className="tfooter">
      <div className="tr">
        {columnsNames.map((v, i) => (
          <div
            className="th"
            key={i}
            style={{ width: `calc(100% / ${columnsNames.length})` }}
          >
            {v}
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        dataLength={dataLength}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default Footer;
