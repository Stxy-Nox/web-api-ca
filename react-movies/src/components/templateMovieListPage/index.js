import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import { ImageNotSupportedRounded } from "@mui/icons-material";
import { set } from "react-hook-form";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState([0,10])
  const genreId = Number(genreFilter);

  const [sortBy, setSortBy] = useState(" ");
  const [sortDirection, setSortDirection] = useState("asc");

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return languageFilter === "all" ? true : m.original_language === languageFilter;
    })
    .filter((m) => {
      return(
        m.vote_average >= ratingFilter[0] && m.vote_average <= ratingFilter[1]
      )
    })

    if(sortBy) {//very clever method, not mine 
      displayedMovies = displayedMovies.sort((a,b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
  
        if (sortBy === "release_date"){//make sure sort correctly if sort relesase date
          aValue = new Date(aValue);
          bValue = new Date(bValue); 
        }
  
        if(aValue < bValue) {
          return sortDirection === "asc" ? -1 :1;
        }
        else if (aValue > bValue) {
          return sortDirection === "asc" ? 1 : -1;
        }
        else return 0;
      })
    }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "language") setLanguageFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "sortBy") setSortBy(value);
    else setSortDirection(value);

  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            languageFilter={languageFilter}
            ratingFilter={ratingFilter}
            sortBy={sortBy}
            sortDirection={sortDirection}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;