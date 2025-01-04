import React, { useState } from "react";
import {
  getFavorites,
  addFavorite,
  deleteFavorite,
  addReview,
  getPlaylists,
  addPlaylist,
  deletePlaylist,
} from "../api/user-api";
export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [playlists, setPlaylists] = useState( [] )


  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoriteMovies = await getFavorites();
        setFavorites(favoriteMovies.map((movie) => movie.id));

        const playlistMovies = await getPlaylists();
        setPlaylists(playlistMovies.map((movie) => movie.id));
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
          console.error("Add favourites error:", error);
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
        console.error("remove favourites error: ", error);
      }
    },
    [favorites]
  );

  const addToPlaylist = async (movie) => {
    if (!playlists.includes(movie.id)) {
      try {
        await addPlaylist(movie.id);
        setPlaylists([...playlists, movie.id]);
      } catch (error) {
        console.error("add to playlist error:", error);
      }
    }
  };

  const removeFromPlaylist = async (movie) => {
    try {
      await deletePlaylist(movie.id);
      setPlaylists(playlists.filter((id) => id !== movie.id));
    } catch (error) {
      console.error("从播放列表移除失败：", error);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        playlists,
        addToPlaylist,
        removeFromPlaylist
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;