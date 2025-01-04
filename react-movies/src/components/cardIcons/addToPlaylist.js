import React, { useContext} from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { IconButton } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToPlaylistIcon = ({ movie }) => {
    const {  addToPlaylist } = useContext(MoviesContext);

    const handleAddToPlaylist = (e) => {
        e.preventDefault();
        addToPlaylist(movie);
    }

    return(
        <IconButton aria-label="add to playlist" onClick={handleAddToPlaylist}>
            <PlaylistAddIcon color="primary" fontSize="large" />
        </IconButton>
    )
}

export default AddToPlaylistIcon;