import React, { useState, useEffect } from "react";
import axios from "axios";
import NameSearch from "./component/NameSearch";
import CheckboxFilter from "./component/CheckBoxFilter";
import MovieCard from "./component/MovieCard";
import ResultsFound from "./component/ResultsFound";
import Pagination from "./component/Pagination";
import SelectedFilter from './component/SelectedFilter';
import './MovieList.css';

function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [viewFormat, setViewFormat] = useState("grid"); 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    const pageLimitParam = urlParams.get("limit");
    const pageParam = urlParams.get("page");
    const search = urlParams.get("search");
    const sortParam = urlParams.get("sort");
    const viewParam = urlParams.get("view");

    if (categoryParam) {
      setCategoryFilters(categoryParam.split(","));
    }
    if (pageLimitParam) {
      setItemsPerPage(parseInt(pageLimitParam, 10));
    }
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    }
    if (search) {
      setNameFilter(search);
    }
    if (sortParam) {
      setSortOrder(sortParam);
    }
    if (viewParam) {
      setViewFormat(viewParam);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams();
    if (categoryFilters.length > 0) {
      urlParams.set("category", categoryFilters.join(","));
    }
    if (itemsPerPage) {
      urlParams.set("limit", itemsPerPage.toString());
    }
    if (currentPage) {
      urlParams.set("page", currentPage.toString());
    }
    if (nameFilter) {
      urlParams.set("search", nameFilter);
    }
    if (sortOrder) {
      urlParams.set("sort", sortOrder);
    }
    if (viewFormat) {
      urlParams.set("view", viewFormat);
    }

    window.history.pushState(null, "", `?${urlParams.toString()}`);
    fetchMovies();
  }, [categoryFilters, itemsPerPage, currentPage, nameFilter, sortOrder, viewFormat]);

  const fetchCategories = async () => {
    if (categories.length === 0) {
      setLoadingCategories(true);
      try {
        const response = await axios.get("http://localhost:8080/api/movie-category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    }
  };

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const categoryFilterString = categoryFilters.join(",");
      const sortParam = sortOrder;

      const response = await axios.get(
        `http://localhost:8080/api/movies?page=${currentPage}&limit=${itemsPerPage}&category=${categoryFilterString}&search=${nameFilter}&sort=${sortParam}`
      );

      setMovies(response.data.movies);
      setTotalItems(response.data.total_movies);
      setTotalPages(Math.ceil(response.data.total_movies / itemsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  const handleRemoveFilter = (filter) => {
    const updatedFilters = categoryFilters.filter((item) => item !== filter);
    setCategoryFilters(updatedFilters);
    setCurrentPage(1);
  };

  const handleCategoryFilterChangeByCheckbox = (selectedCategories) => {
    setCategoryFilters(selectedCategories);
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div className="search-container">
        <NameSearch value={nameFilter} onChange={handleNameFilterChange} />
      </div>
      <div className="filter-movies-container">
        <div className="filter-container">
          <CheckboxFilter categoryFilters={categoryFilters} onChange={handleCategoryFilterChangeByCheckbox} categories={categories} />
        </div>
        <div className="movie-list-container">
          {loadingCategories || loading ? (
            <div className="loader">Loading...</div>
          ) : (
            <div>
              <button onClick={toggleSortOrder}>
                Sort: {sortOrder === "asc" ? "Low to High" : "High to Low"}
              </button>
              <button
                onClick={() => {
                  const newViewFormat = viewFormat === "grid" ? "list" : "grid";
                  setViewFormat(newViewFormat);
                }}
              >
                {viewFormat === "grid" ? "List View" : "Grid View"}
              </button>
              <ul className={`movie-${viewFormat}`}>
                {movies
                  .filter((movie) =>
                    movie.name.toLowerCase().includes(nameFilter.toLowerCase())
                  )
                  .map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                    />
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="pagination-container">
        <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
      </div>
      <ResultsFound totalItems={totalItems} categoryFilters={categoryFilters} searchQuery={nameFilter} />
      <SelectedFilter selectedFilters={categoryFilters} onRemoveFilter={handleRemoveFilter} />
    </div>
  );
}

export default Dashboard;
