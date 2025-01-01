import React, { useState } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import BasicPagination from "../components/pagination";

const UpcomingPage = (props) => {
    const [currentPage, setCurrentPage] = useState(1);//dont need to cached
    const {data,error, isLoading, isError} = useQuery(['upcoming',currentPage],getUpcomingMovies)

    if (isLoading) {
        return  <Spinner/>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;
    const totalPages = data.total_pages;

    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favourites',JSON.stringify(favorites))
    const addToFavorites = (movieId) => true    

    return (
      <>
        <PageTemplate
          title="Upcoming Movies"
          movies={movies}
          action={(movie) => {
            return <AddToPlaylistIcon movie={movie} />
          }}
        />
        <BasicPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />

      </>
    );
}
export default UpcomingPage;