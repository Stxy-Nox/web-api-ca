import React from "react";
import PeopleCard from "../peoplecard"
import Grid from "@mui/material/Grid2";

const PeopleList = (props) => {
    let peopleCards = props.people.map((m) => (
        <Grid key={m.id} size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} sx={{padding: "20px"}}>
          <PeopleCard key={m.id} people={m} />
        </Grid>
      ));  
      return peopleCards;
}

export default PeopleList;