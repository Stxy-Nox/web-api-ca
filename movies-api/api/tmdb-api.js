import fetch from 'node-fetch';

export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getGenres = async () => {
  try {
      const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
      );

      if (!response.ok) {
          throw new Error(response.json().message);
      }

      return await response.json();
  } catch (error) {
      throw error;
  }
};

export const getMovies = async (page = 1) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getPopular = async (page = 1) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getTrendings = async (timeWindow = "day") => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovie = async (id = 939243) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getPeople = async (id = 2786960) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getPresonCredits = async (id = 2786960) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getLanguages = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.TMDB_KEY}`
        );
  
        if (!response.ok) {
            throw new Error(response.json().message);
        }
  
        return await response.json();
    } catch (error) {
        throw error;
    }
  };

  export const getMovieImages = async (id = 939243) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
        );
  
        if (!response.ok) {
            throw new Error(response.json().message);
        }
  
        return await response.json();
    } catch (error) {
        throw error;
    }
  };

  export const getPersonImages = async (id = 2786960) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.TMDB_KEY}`
        );
  
        if (!response.ok) {
            throw new Error(response.json().message);
        }
  
        return await response.json();
    } catch (error) {
        throw error;
    }
  };

  export const getMovieReviews = async (id = 939243) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
        );
  
        if (!response.ok) {
            throw new Error(response.json().message);
        }
  
        return await response.json();
    } catch (error) {
        throw error;
    }
  };
