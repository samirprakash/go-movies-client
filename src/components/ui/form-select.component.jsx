import React from 'react';

const Select = ({ name, label, value, options, fn }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className="form-select"
        name={name}
        id={name}
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
    </div>
  );
};

export default Select;
