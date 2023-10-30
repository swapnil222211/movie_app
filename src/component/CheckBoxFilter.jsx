import React from "react";

function CheckboxFilter({ categoryFilters, onChange, categories }) {
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (categoryFilters.includes(value)) {
      onChange(categoryFilters.filter((category) => category !== value));
    } else {
      onChange([...categoryFilters, value]);
    }
  };
  //console.log("jkjwf")

  return (
    <div className="checkbox-filter">
      <h4>Filter by Category</h4>
      {categories.map((category) => (
        <label key={category}>
          <>
          <input
            type="checkbox"
            value={category}
            checked={categoryFilters.includes(category)}
            onChange={handleCheckboxChange}
          />
          {category}
          <br />
          </>
        </label>
  
      ))}
    </div>
  );
}

export default CheckboxFilter;
