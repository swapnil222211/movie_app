import React from "react";

function NameSearch({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Filter by Movie Name"
      value={value}
      onChange={onChange}
      className="filter-input"
    />
  );
}

export default NameSearch;
