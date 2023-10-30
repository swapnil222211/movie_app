import React from "react";

function SelectedFilters({ selectedFilters, onRemoveFilter }) {
  return (
    <div className="selected-filters">
      {selectedFilters.map((filter) => (
        <div key={filter} className="filter">
          {filter}
          <button onClick={() => onRemoveFilter(filter)}>x</button>
        </div>
      ))}
    </div>
  );
}

export default SelectedFilters;
