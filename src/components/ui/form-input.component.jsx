import React from 'react';

const Input = ({ name, label, value, fn }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="text"
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={fn}
      />
    </div>
  );
};

export default Input;
