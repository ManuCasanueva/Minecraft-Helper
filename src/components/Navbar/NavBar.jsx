import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import grass from "../../assets/juego.png"
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Menu from '@mui/material/Menu';
import "../Navbar/NavBar.css"


const pages = [
  { title: 'Nether coordinate divider', path: '/' },
  { title: 'Circle generator', path: '/circle' },
  // { title: 'Oval generator', path: '/Oval' }
];


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [activeButton, setActiveButton] = React.useState(null);

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ width: '100%', backgroundColor: "#1d1d1d", boxShadow: "-2px 7px 29px 0px rgba(144, 0, 255, 0.418);"}}>
      <Container maxWidth="xl" sx={{ width: '100%', marginLeft: '10px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <img src={grass} className='imagen' alt="logo" />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                marginLeft: '10px',
                fontFamily: "Minecraftia",
                fontWeight: 700,
                color: 'white',
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'rgba(162, 0, 255, 0.664)',
                },
              }}
            >
              Minecraft Helper
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
  {pages.map((page) => (
    <Button
      key={page.title}
      component={Link}
      to={page.path}
      sx={{
        my: 2,
        display: 'block',
        marginLeft: '10px',
        fontFamily: 'Minecraftia',
        border: location.pathname === page.path ? '2px solid black' : 'none',
        boxShadow: location.pathname === page.path ? '0 0 5px rgba(153, 0, 255, 0.5)' : 'none',
        color: activeButton === page.path ? 'violet' : 'white',
        borderRadius: location.pathname === page.path ? '11px' : '0',
        '&:hover': {
          backgroundColor: 'transparent',
          color: 'rgba(162, 0, 255, 0.664)',
        },
      }}
      onClick={() => setActiveButton(page.path)}
    >
      {page.title}
    </Button>
  ))}
</Box>


          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings">
              <Button
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                sx={{ ml: 2 }}
              >
                <AdbIcon />
              </Button>
            </Tooltip> */}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
