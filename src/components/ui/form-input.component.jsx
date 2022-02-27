const Input = ({ name, className, label, value, fn, errorDiv, errorMsg }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="text"
        className={`form-control ${className}`}
        id={name}
        name={name}
        value={value}
        onChange={fn}
      />
      <div className={errorDiv}>{errorMsg}</div>
    </div>
  );
};

export default Input;
