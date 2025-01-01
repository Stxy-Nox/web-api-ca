import React, { useState } from "react";
import Header from "../headerMovieList";
import PeopleList from "../peopleList";
import Grid from "@mui/material/Grid2";

function PeopleListPageTemplate({ people, title }) {

    return (
      <Grid container>
        <Grid size={12}>
          <Header title={title} />
        </Grid>
        <Grid container sx={{flex: "1 1 500px"}}>
          <PeopleList  people={people}></PeopleList>
        </Grid>
      </Grid>
    );
  }
  export default PeopleListPageTemplate;