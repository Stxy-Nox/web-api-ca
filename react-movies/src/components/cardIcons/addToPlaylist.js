import React, { useContext} from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { IconButton } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToPlaylistIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleAddToPlaylists = (e) => {
        e.preventDefault();
        context.addToPlaylist(movie);
    }

    return(
        <IconButton aria-label="add to playlists" onClick={handleAddToPlaylists}>
            <PlaylistAddIcon color="primary" fontSize="large" />
        </IconButton>
    )
}

export default AddToPlaylistIcon;