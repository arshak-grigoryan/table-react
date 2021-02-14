import Pagination from '../Pagination/Pagination1';

function Footer({
  columnsNames,
  currentPage,
  dataLength,
  onPageChange,
  rowPerPage,
  setRowPerPage,
}) {
  // console.log('render Footer');

  const handleChange = (e) => {
    e.preventDefault();
    onPageChange(1);
    setRowPerPage(e.target.value);
  };

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
      <div className="pageWrapper">
        <Pagination
          currentPage={currentPage}
          dataLength={dataLength}
          onPageChange={onPageChange}
          rowPerPage={rowPerPage}
        />
        <form>
          <label htmlFor="rowPerPage">Rows per page</label>
          <select id="rowPerPage" value={rowPerPage} onChange={handleChange}>
            <option value="5">5</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </form>
      </div>
    </div>
  );
}

export default Footer;
