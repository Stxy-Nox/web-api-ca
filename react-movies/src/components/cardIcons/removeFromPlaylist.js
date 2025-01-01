import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import { MoviesContext } from "../../contexts/moviesContext";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

const RemoveFormPlaylistIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleRemoveFromPlaylist = (e) => {
        e.preventDefault();
        context.removeFromPlaylist(movie);
    };
    return(
        <IconButton
            aria-label="remove from playlist"
            onClick={handleRemoveFromPlaylist}
        >
            <PlaylistRemoveIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFormPlaylistIcon;