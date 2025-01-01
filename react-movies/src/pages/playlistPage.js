import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import Spinner from '../components/spinner'
import { getMovie } from "../api/tmdb-api";
import RemoveFormPlaylist from "../components/cardIcons/removeFromPlaylist";

const PlaylistPage = () => {
    const {playlists: movieIds } = useContext(MoviesContext);

    const playlistMovieQueries = useQueries(
        movieIds.map((movieId) => {
            return {
                queryKey: ["movie", { id: movieId}],
                queryFn: getMovie,
            };
        })
    );

    const isLoading = playlistMovieQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner />;
    }

    const movies = playlistMovieQueries.map((q) => {
        q.data.genre_ids = q.data.genres.map(g => g.id)
        return q.data
  });



  return (
    <PageTemplate
        title="Playlist"
        movies={movies}
        action={(movie) => {
            return (
                <>
                    <RemoveFormPlaylist movie={movie} />
                    
                </>
            );
        }}
    />
  );
};

export default PlaylistPage;