const TextArea = ({
  name,
  className,
  label,
  cols,
  rows,
  value,
  fn,
  errorDiv,
  errorMsg,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        name={name}
        className={`form-control ${className}`}
        id={name}
        cols={cols}
        rows={rows}
        value={value}
        onChange={fn}
      />
      <div className={errorDiv}>{errorMsg}</div>
    </div>
  );
};

export default TextArea;
