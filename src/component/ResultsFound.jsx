import React from "react";

function ResultsFound({ totalItems, categoryFilters, searchQuery }) {
  return (
    <p>
      Results: {totalItems} | Filters:{" "}
      {categoryFilters.length > 0
        ? `Category: ${categoryFilters.join(", ")}`
        : "None"}{" "}
      {searchQuery && <span>| Search: {searchQuery}</span>}
    </p>
  );
}

export default ResultsFound;
