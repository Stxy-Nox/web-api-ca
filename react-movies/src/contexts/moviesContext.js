import React, { useState, useEffect, useCallback } from "react";
import {
  getFavorites,
  addFavorite,
  deleteFavorite,
  addReview,
  getPlaylist,
  addPlaylist,
  deletePlaylist,
} from "../api/user-api";
export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [playlist, setPlaylist] = useState( [] )


  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoriteMovies = await getFavorites();
        setFavorites(favoriteMovies.map((movie) => movie.id));

        const playlistMovies = await getPlaylist();
        setPlaylist(playlistMovies.map((movie) => movie.id));
      } catch (error) {
        console.error("load data error:", error);
      }
    };
    fetchData();
  }, []);

  const addToFavorites = useCallback(
    async (movie) => {
      if (!favorites.includes(movie.id)) {
        try {
          await addFavorite(movie.id);
          setFavorites([...favorites, movie.id]);
        } catch (error) {
          console.error("Add favorites error:", error);
        }
      }
    },
    [favorites]
  );

  const removeFromFavorites = useCallback(
    async (movie) => {
      try {
        await deleteFavorite(movie.id);
        setFavorites(favorites.filter((id) => id !== movie.id));
      } catch (error) {
        console.error("remove favorites error: ", error);
      }
    },
    [favorites]
  );

  const addToPlaylist = async (movie) => {
    if (!playlist.includes(movie.id)) {
      try {
        await addPlaylist(movie.id);
        setPlaylist([...playlist, movie.id]);
      } catch (error) {
        console.error("add to playlist error:", error);
      }
    }
  };

  const removeFromPlaylist = async (movie) => {
    try {
      await deletePlaylist(movie.id);
      setPlaylist(playlist.filter((id) => id !== movie.id));
    } catch (error) {
      console.error("remove from playlist error: ", error);
    }
  };

  const addReview = async (movie, reviewText) => {
    try {
      await addReview(movie.id, reviewText);
      setMyReviews((prevReviews) => [...prevReviews, { movieId: movie.id, review: reviewText }]);
    } catch (error) {
      console.error("add review error: ", error);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        playlist,
        addToPlaylist,
        removeFromPlaylist
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;