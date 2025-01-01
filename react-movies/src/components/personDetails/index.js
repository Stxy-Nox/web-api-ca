import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CakeIcon from '@mui/icons-material/Cake';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};

const chip = { 
    margin: 0.5,
    marginTop: "20px",
};

const PersonDetails = ({ person }) => {  
    const navigate = useNavigate();
    return (
        <>  
        <Paper 
            component="div" 
            sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                padding: 1.5,
                margin: 0,
            }}
        >
        <IconButton aria-label="go back" onClick={() => navigate(-1)} >
            <ArrowBackIcon color="primary" fontSize="large" />
        </IconButton>

        <Typography variant="h4" component="h3">
            {person.name}
        </Typography>

        <IconButton aria-label="go forward" onClick={() => navigate(+1) } >
            <ArrowForwardIcon color="primary" fontSize="large" />
        </IconButton>
        </Paper>

        <Paper sx={{marginTop: "20px"}}>
        <Typography variant="h5" component="h3" sx={{...chip}}>
            Biography
        </Typography>
        
        <Typography variant="h6" component={"p"} sx={{...chip}}>
            {person.biography}
        </Typography>
        </Paper>
        
            
        <Paper component="ul" sx={{...root,marginTop: "20px"}}>
            <li>
                <Chip label="Also konwn as: " sx={{...chip}} color="primary" />
            </li>
            {person.also_known_as.map((a) => (
                <li key={a}>
                    <Chip label={a} sx={{...chip}} />
                </li>
            ))}
        </Paper>

        <Paper component={"ul"} sx={{...root}} >
            <Chip icon={<AccountCircleIcon/>} label={`Known for: ${person.known_for_department}`} color="secondary"/>
            <Chip icon={<CakeIcon/>} label={`Brithday: ${person.birthday}`} color="secondary"/>
            <Chip icon={<LocalFireDepartmentIcon/>} label={`Popularity: ${person.popularity}`} color="secondary"/>

        </Paper>
        
        
        
        
        
        
        
        </>
    )
  
};
export default PersonDetails ;