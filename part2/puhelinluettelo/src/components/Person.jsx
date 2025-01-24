const Person = ({ id, name, number, handleRemove }) => {
  return (
    <p>
      {name} {number}
      <button onClick={handleRemove} value={id}>
        delete
      </button>
    </p>
  );
};

export default Person;
