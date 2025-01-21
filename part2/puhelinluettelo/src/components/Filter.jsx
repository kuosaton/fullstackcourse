const Filter = ({ filterKey, handleFilterKeyUpdate }) => {
  return (
    <div>
      Filter shown numbers with:
      <input value={filterKey} onChange={handleFilterKeyUpdate} />
    </div>
  );
};

export default Filter;
