import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, useNavigate } from "react-router-dom";
import Logo from '../Images/Logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../app/Slices/authSlice';





function Navbar() {
    const { user } = useSelector(state => state.auth);
    let name = user.split(" ").map(u => u[0]);
    let avatar = `${name[0]}${name[1]}`;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    return (
        <AppBar position="static" sx={{ bgcolor: "#000009" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <Typography
                        variant="h6"
                        noWrap
                        component="p"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <NavLink to='/'>
                            <img className="w-[40px] " src={Logo} alt="logo" />
                        </NavLink>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuRoundedIcon fontSize='large'/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            <NavLink to={"/"} >
                                <MenuItem onClick={handleCloseNavMenu}  >
                                    <Typography textAlign="center" >
                                        Main
                                    </Typography>
                                </MenuItem>
                            </NavLink>
                            <NavLink to={"/posts"} >
                                <MenuItem onClick={handleCloseNavMenu}  >
                                    <Typography textAlign="center" >
                                        My Posts
                                    </Typography>
                                </MenuItem>
                            </NavLink>
                            <NavLink to={"new"} >
                                <MenuItem onClick={handleCloseNavMenu}  >
                                    <Typography textAlign="center" >
                                        Add Post
                                    </Typography>
                                </MenuItem>
                            </NavLink>

                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="p"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <NavLink to='/' >
                            <img className="w-[40px] " src={Logo} alt="logo" />
                        </NavLink>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <NavLink to='/'>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                    textTransform: "inherit",
                                    borderRadius: "0",
                                    borderBottom: "1px solid black",
                                    "&:hover": { borderBottom: "1px solid deepskyblue" },
                                    "&:focus":{  color: "deepskyblue" }
                                }}
                            >
                                Main
                            </Button>
                        </NavLink>
                        <NavLink to='/posts'>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                    textTransform: "inherit",
                                    borderRadius: "0",
                                    borderBottom: "1px solid black",
                                    "&:hover": { borderBottom: "1px solid deepskyblue" },
                                    "&:focus":{  color: "deepskyblue" }
                                }}
                            >
                                My Posts
                            </Button>
                        </NavLink>
                        <NavLink to='/new'>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                    textTransform: "inherit",
                                    borderRadius: "0",
                                    borderBottom: "1px solid black",
                                    "&:hover": { borderBottom: "1px solid deepskyblue" },
                                    "&:focus":{  color: "deepskyblue" }
                                }}
                            >
                                Add Post
                            </Button>
                        </NavLink>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, fontSize: "15px" }}>
                                <div
                                    className="flex justify-center items-center w-[40px] h-[40px] rounded-[100%] bg-white">
                                    <span>{avatar}</span>
                                </div>
                            </IconButton>
                        </Tooltip>
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
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center" onClick={() => {
                                    dispatch(setLogout());
                                    navigate("/signin")
                                }}>Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;