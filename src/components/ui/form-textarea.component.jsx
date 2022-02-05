const TextArea = ({ name, label, cols, rows, value, fn }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        cols={cols}
        rows={rows}
        className="form-control"
        value={value}
        onChange={fn}
      />
    </div>
  );
};

export default TextArea;
