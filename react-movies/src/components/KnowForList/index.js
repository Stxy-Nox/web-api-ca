import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import img from "../../images/film-poster-placeholder.png";

const KnownForList = ({ knownFor }) => {
  if (!knownFor || knownFor.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: "20px" }} >
      <Typography variant="h6" component={"h4"} gutterBottom>
        Known for :
      </Typography>
      <ImageList sx={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'scroll', }} cols={1}>
        {knownFor.map((movie) => (
          <Link to={`/movies/${movie.id}`}  style={{ textDecoration: 'none' }}>
          <ImageListItem key={movie.id} sx={{ minWidth: 200, marginRight: '10px' }} >
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img }
              alt={movie.title}
              style={{ borderRadius: '8px' }}
            />
          </ImageListItem>
          <Typography variant="subtitle1" component={"p"} align="center">
            {movie.title}
          </Typography>
          </Link>
        ))}

      </ImageList>
    </div>
  )
}

export default KnownForList;