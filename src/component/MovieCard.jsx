import React, { useState } from "react";

function MovieCard({ movie }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % (movie.thumbanail.length || 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + (movie.thumbanail.length || 1)) % (movie.thumbanail.length || 1)
    );
  };

  return (
    <li className="movie-item">
      <div className="image-carousel">
        {movie.thumbanail && movie.thumbanail.length > 0 ? (
          <>
            <img
              src={movie.thumbanail[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
            />
            <button onClick={handlePrevImage} className="prev-button">
              &lt;
            </button>
            <button onClick={handleNextImage} className="next-button">
              &gt;
            </button>
          </>
        ) : (
          <>
            <img
              src="https://i.ndtvimg.com/mt/movies/2012-05/dictator-big3.jpg"
              alt=""
            />
          </>
        )}
      </div>
      <p className="movie-name">Name: {movie.name}</p>
      <p className="movie-category">Category: {movie.category}</p>
      <p className="movie-cost">Cost: {movie.cost}</p>
      <p className="booked-seats">Seats Booked: {movie.booked}</p>
      <p className="total-seats">Total Seats: {movie.total}</p>
    </li>
  );
}

export default MovieCard;
