function Header({ columnsNames }) {
  // console.log('render Header');

  return (
    <div className="thead">
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
    </div>
  );
}

export default Header;
