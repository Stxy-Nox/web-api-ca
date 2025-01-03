export const getMovies = (args) => {
  const [, page] = args.queryKey;
  return fetch(`http://localhost:8080/api/movies/tmdb/movies?page=${page}`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      }
      return response.json();
    });
};

export const getPopular = (args) => {
  const [, page] = args.queryKey;
  return fetch(`http://localhost:8080/api/movies/tmdb/popularPeople?page=${page}`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      }
      return response.json();
    });
};

export const getUpcomingMovies = (args) => {
  const [, page] = args.queryKey;
  return fetch(`http://localhost:8080/api/movies/tmdb/upcoming?page=${page}`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      }
      return response.json();
    });
};

export const getTrendings = (args) => {
  const [, timeWindow] = args.queryKey;
  return fetch(`http://localhost:8080/api/movies/tmdb/trending?timeWindow=${timeWindow}`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      }
      return response.json();
    });
};
  
export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`http://localhost:8080/api/movies/tmdb/movie/${id}`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      }
      return response.json();
    });
}


export const getPerson = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`http://localhost:8080/api/movies/tmdb/person/${id}`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      }
      return response.json();
    });
};

export const getPersonCredits = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`http://localhost:8080/api/movies/tmdb/person/${id}/credits`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      }
      return response.json();
    });
};
  
export const getGenres = () => {
  return fetch(`http://localhost:8080/api/movies/tmdb/genres`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      }
      return response.json();
    });
};

export const getLanguages = () => {
  return fetch(`http://localhost:8080/api/movies/tmdb/languages`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      }
      return response.json();
    });
};

export const getMovieImages = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`http://localhost:8080/api/movies/tmdb/movie/${id}/images`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      }
      return response.json();
    });
};

export const getPersonImages = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`http://localhost:8080/api/movies/tmdb/person/${id}/images`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      }
      return response.json();
    });
};


export const getMovieReviews = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`http://localhost:8080/api/movies/tmdb/movie/${id}/reviews`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      }
      return response.json();
    });
};
