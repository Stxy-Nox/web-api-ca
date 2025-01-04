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

  
  const addToPlaylist = (movie) => {
    let newPlaylists = [];
    if (!playlists.includes(movie.id)){
      newPlaylists = [...playlists, movie.id];
    }

    else{
      newPlaylists = [...playlists];
    }
    setPlaylists(newPlaylists)
    console.log("Playlist:"+playlists);
  }

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

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