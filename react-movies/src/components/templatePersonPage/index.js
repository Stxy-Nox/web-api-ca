import React from "react";
import Grid from "@mui/material/Grid2";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getPersonImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import KnownForList from "../KnowForList";

const TemplatePersonPage = ({ person, knownFor, children}) => {

  const {data , error, isLoading, isError } = useQuery(
    ["presonImages", {id: person.id}],
    getPersonImages
  );

  if (isLoading) {
    return <Spinner/>
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const images = data.profiles

  return (
    <>
    
    <Grid container spacing={5} style={{ Padding:"15px"}}>
      <Grid size={{xs:3}}>
      <div sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}>
        <ImageList
          sx={{
            height:"100vh",
          }} 
          cols={1}
        >
          {images.map((image) => (
            <ImageListItem key={images.file_path} cols={1}>
              <img 
                src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                alt={image.file_path}
            />
            </ImageListItem>
          ))}
        </ImageList> 
      </div>
      </Grid>

      <Grid size={{xs:9}}>
        {children}
        <KnownForList knownFor={knownFor}/>
      </Grid>
    </Grid>
    </>
  )
}

export default TemplatePersonPage;