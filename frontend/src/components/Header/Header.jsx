import './Header.scss';
import { useState, useRef, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png'
import CustomButton from '../CustomButton/CustomButton';
import { AuthContext } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom';

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
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const menuItems = user
    ? [
        { text: 'Profile', to: '/profile' },
        { text: 'Logout', action: handleLogout },
        ]
    : [
        { text: 'Login', to: '/login' },
        { text: 'Register', to: '/register' },
        ];
  

    const handleMobileMenuOpen = () => {
        setIsMobileMenuOpen(true);
    };

    const handleMobileMenuClose = () => {
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        //logout();
        navigate('/login');
      };

    return (
        <AppBar ref={appBarRef} position='sticky' className='menu' sx={{backgroundColor: '#1a2028', boxShadow: 'none'}}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1400px', margin: 'auto'}}>
                <Typography variant="h1">
                    <Link to="/">
                        <img className='menu__logo' src={Logo} alt='DayTask logo'/>
                    </Link>
                </Typography>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '1rem' }}>
                {user ? (
                    <> 
                        <CustomButton component={Link} to="/profile" text="Profile" variantStyle="filled" />
                        <CustomButton onClick={handleLogout} text="Logout" variantStyle="outlined" />
                    </>
                ) : (
                    <>
                        <CustomButton component={Link} to="/login" text="Sign In" variantStyle="filled" />
                        <CustomButton component={Link} to="/register" text="Sign Up" variantStyle="outlined" />
                    </>
                )}
                </Box>

                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMobileMenuOpen}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    {isMobileMenuOpen ? <CloseIcon sx={{fontSize: '3rem'}}/> : <MenuIcon sx={{fontSize: '3rem'}}/>}
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
                   {menuItems.map((item, index) => (
                        item.action ? (
                        <StyledMenuItemMobile key={index} onClick={item.action}>
                            {item.text}
                        </StyledMenuItemMobile>
                        ) : (
                        <StyledMenuItemMobile key={index} component={Link} to={item.to} onClick={handleMobileMenuClose}>
                            {item.text}
                        </StyledMenuItemMobile>
                        )
                    ))}
                </Menu>
            </Toolbar>
        </AppBar>
    )
}
