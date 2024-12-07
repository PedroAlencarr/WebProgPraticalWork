import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import {
    Container,
    Box,
    Typography,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomField from '../../components/CustomField/CustomField';

const BACK_URL = import.meta.env.VITE_BACK_URL;

const StyledLink = styled(Link)(() => ({
    color: '#FED36A',
    textDecoration: 'none',
    '&:hover': {
        color: '#E5BC5E',
    },
}));

export default function Register() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validationSchema = Yup.object({
        first_name: Yup.string()
        .required('First Name is required'),
        last_name: Yup.string()
        .required('Last Name is required'),
        email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
        password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    });

    const initialValues = {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
    };

    const handleSubmit = async (values, {resetForm}) => {
        try {
            const response = await fetch(`${BACK_URL}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
    
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
    
            const data = await response.json();
            console.log('User created:', data);
    
            resetForm();
        } catch (error) {
            console.log('Error:', error);
        }
    };

  return (
    <Container
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
        }}
    >
        <Box sx={{width: '8.7rem', marginBottom: '3rem'}}>
            <img src={Logo} alt='DayTask logo' />
        </Box>
        <Typography
            component="h2"
            gutterBottom
            sx={{
                fontSize: '1.625rem',
                fontWeight: '500',
                color: '#fff',
                alignSelf: 'flex-start',
            }}
        >
            Create your account
        </Typography>

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isValid, dirty }) => (
            <Form 
            style={{
                width: '100%',
            }}>
                <Box
                sx={{
                    width: '100%',
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
                >
                <CustomField
                    name="email"
                    fullWidth
                    label="E-mail"
                    type="email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={<ErrorMessage name="email" />}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <PersonPinOutlinedIcon sx={{ color: '#fff', marginRight: '.5rem' }} />
                        </InputAdornment>
                    ),
                    }}
                />

                <CustomField
                    name="first_name"
                    fullWidth
                    label="First Name"
                    error={touched.fullName && Boolean(errors.fullName)}
                    helperText={<ErrorMessage name="first_name" />}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon sx={{ color: '#fff', marginRight: '.5rem' }} />
                        </InputAdornment>
                    ),
                    }}
                />

                <CustomField
                    name="last_name"
                    fullWidth
                    label="Last Name"
                    error={touched.fullName && Boolean(errors.fullName)}
                    helperText={<ErrorMessage name="last_name" />}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon sx={{ color: '#fff', marginRight: '.5rem' }} />
                        </InputAdornment>
                    ),
                    }}
                />

                <CustomField
                    name="password"
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    error={touched.password && Boolean(errors.password)}
                    helperText={<ErrorMessage name="password" />}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: '#fff', marginRight: '.5rem' }} />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? (
                            <VisibilityOutlinedIcon sx={{ color: '#fff' }} />
                            ) : (
                            <VisibilityOffOutlinedIcon sx={{ color: '#fff' }} />
                            )}
                        </IconButton>
                        </InputAdornment>
                    ),
                    }}
                />

                <CustomButton 
                    type="submit"
                    disabled={!(isValid && dirty)}
                    fullWidth
                    text='Sign Up'
                    variantStyle='filled'/>

                <Typography
                    component="p"
                    sx={{
                    width: 'fit-content',
                    fontSize: '1rem',
                    color: '#8CAAB9',
                    }}
                >
                    Already have an account?{' '}
                    <StyledLink to='/login'>
                    Log In
                    </StyledLink>
                </Typography>
                </Box>
            </Form>
            )}
        </Formik>
        </Container>
    );
}