import React from 'react';

const Select = ({
  name,
  className,
  label,
  value,
  fn,
  options,
  errorDiv,
  errorMsg,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={`form-control ${className}`}
        id={name}
        name={name}
        value={value}
        onChange={fn}
      >
        <option value="" className="form-select">
          Choose ...
        </option>
        {options.map((option) => {
          return (
            <option
              value={option.value}
              key={option.id}
              className="form-select"
            >
              {option.label}
            </option>
          );
        })}
      </select>
      <div className={errorDiv}>{errorMsg}</div>
    </div>
  );
};

export default Select;
