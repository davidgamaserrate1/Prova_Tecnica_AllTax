import React from "react";
import './dropdown-styles.css'
const Dropdown = ({label,options,  value,onChange,selectedValue,}) => (
  <div className="dropdown">
    <span className="dropdown__name">{label}:</span>
    <select name={value} id={value} onChange={onChange} value={selectedValue}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown;
