import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
  const [anchorEl, setAnchorEl] = useState({});//will occur error if it set null
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const menuOptions = [//sort labels into different groups
    { label: "Home", path: "/" },
    { label: "Movies", 
      subOptions: [
        { label: "Trending Today",path:"/movies/trending/day"},
        { label: "Trending Week",path:"/movies/trending/week"},
        { label: "Upcoming", path: "/movies/upcoming" },
      ]
    },
    { label: "People",
      subOptions: [
        { label: "Popular", path:"/people"},
      ]
    },
    { label :"My pages",
      subOptions: [
        { label: "Favorites", path: "/movies/favorites" },
        { label: "Playlist", path: "/movies/playlist" },
      ]
    }
  ];

  const handleMenuSelect = (pageURL) => {
    
    navigate(pageURL, { replace: true });
    handleMenuClose("mobileMenu")   //fix bug: occur error in andriod device
  };

  const handleMenuOpen = (event,label) => {//manage different label's open state spreately
    setAnchorEl(prev => ({...prev, [label]: event.currentTarget}));
    
  };

  const handleMenuClose = (label) => {
    setAnchorEl(prev => ({ ...prev, [label]: null }));
  }

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          {/* <Typography variant="h6" sx={{ flexGrow: 1 }}>// too much text will made siteheader overspread page content, so show it only on desktop side
            All you ever wanted to know about Movies!
          </Typography> */}
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(event => handleMenuOpen(event, "mobileMenu"))}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl["mobileMenu"])}
                  onClose={() => handleMenuClose("mobileMenu")}//fix bug: occur error in andriod device
                >
                  {menuOptions.map((opt) => (
                    opt.subOptions ? (
                      opt.subOptions.map((subOpt) => (
                        <MenuItem
                          key={subOpt.label}
                          onClick={() => handleMenuSelect(subOpt.path)}
                        >
                          {subOpt.label}
                        </MenuItem>
                      ))
                  ) : (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  )
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {<Typography variant="h6" sx={{ flexGrow: 1 }}> 
                  My react website-This text only shows in desktop device
                </Typography> }  
                {menuOptions.map((opt) => (
                  opt.subOptions ? (               
                    <div>
                      <Button
                        color="inherit"
                        aria-controls={`${opt.label}-menu`}
                        aria-haspopup="true"
                        onClick={(event) => handleMenuOpen(event, opt.label)}//prevent mix labels open state
                      >
                        {opt.label}
                      </Button>
                      <Menu
                        id={`${opt.label}-menu`}
                        anchorEl={anchorEl[opt.label]}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorEl[opt.label])}
                        onClose={() => handleMenuClose(opt.label)}
                      >
                        {opt.subOptions.map((subOpt) => (
                          <MenuItem 
                          key={subOpt.label}
                          onClick={() => handleMenuSelect(subOpt.path)}
                          >
                            {subOpt.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      key={opt.label}
                      color="inherit"
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </Button>
                  )
                ))}
              </>
            )}
        </Toolbar>
      </AppBar>
      <Offset/>
    </>
  );
};

export default SiteHeader;