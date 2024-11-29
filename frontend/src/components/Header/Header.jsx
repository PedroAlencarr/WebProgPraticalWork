import './Header.scss';
import { useState, useRef } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png'
import CustomButton from '../CustomButton/CustomButton';

const StyledMenuItemMobile = styled(MenuItem)(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#212832',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#2b3645',
    },
}));

const StyledMenuItemDesktop = styled(MenuItem)(() => ({
    width: 'fit-content',
    fontSize: '1.2rem',
    color: '#fff',
    padding: '1rem 1.5rem',
    '&:hover': {
        backgroundColor: '#2b3645',
    },
}));

export default function Header() {
    const appBarRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMobileMenuOpen = () => {
        setIsMobileMenuOpen(true);
    };

    const handleMobileMenuClose = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <AppBar ref={appBarRef} position='sticky' className='menu' sx={{backgroundColor: '#1a2028', boxShadow: 'none'}}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1400px', margin: 'auto'}}>
                <Typography variant="h1">
                    <Link to="/">
                        <img className='menu__logo' src={Logo} alt='DayTask logo'/>
                    </Link>
                </Typography>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                    <StyledMenuItemDesktop component={Link} to="/home">
                        Home
                    </StyledMenuItemDesktop>
                    <StyledMenuItemDesktop component={Link} to="/pagina2">
                        Página 2
                    </StyledMenuItemDesktop>
                    <StyledMenuItemDesktop component={Link} to="/pagina3">
                        Página 3
                    </StyledMenuItemDesktop>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '1rem' }}>
                    <CustomButton component={Link} to="/login" text='Sign In' variantStyle='filled'/>
                    <CustomButton component={Link} to="/register" text='Sign Up' variantStyle='outlined'/>
                </Box>

                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMobileMenuOpen}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    <MenuIcon sx={{fontSize: '3rem'}}/>
                </IconButton>

                <Menu
                    anchorEl={appBarRef.current}
                    open={isMobileMenuOpen}
                    onClose={handleMobileMenuClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: 'none',
                            left: '0 !important',
                            borderRadius: '0',
                        },
                        '& .MuiList-root': {
                            padding: '0',
                        }
                    }}
                >
                    <StyledMenuItemMobile onClick={handleMobileMenuClose} component={Link} to="/">
                    Home
                    </StyledMenuItemMobile>
                    <StyledMenuItemMobile onClick={handleMobileMenuClose} component={Link} to="/pagina2">
                    Página 2
                    </StyledMenuItemMobile>
                    <StyledMenuItemMobile onClick={handleMobileMenuClose} component={Link} to="/services">
                    Página 3
                    </StyledMenuItemMobile>
                    <StyledMenuItemMobile onClick={handleMobileMenuClose} component={Link} to="/login">
                    Login
                    </StyledMenuItemMobile>
                    <StyledMenuItemMobile onClick={handleMobileMenuClose} component={Link} to="/register">
                    Register
                    </StyledMenuItemMobile>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}
