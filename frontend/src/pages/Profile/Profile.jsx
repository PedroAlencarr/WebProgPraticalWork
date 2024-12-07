import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import ProfilePic from '../../assets/images/profile-placeholder.png';
import Arrow from '../../assets/images/arrow-icon.png';
import Edit from '../../assets/images/edit-icon.png';
import UserIcon from '../../assets/images/user-icon.png';
import EmailIcon from '../../assets/images/email-icon.png';
import PassIcon from '../../assets/images/pass-icon.png';
import TasksIcon from '../../assets/images/task-icon.png';
import PrivacyIcon from '../../assets/images/security-icon.png';
import SettingsIcon from '../../assets/images/settings-icon.png';
import LogoutIcon from '../../assets/images/logout-icon.png';

const VITE_BACK_URL = import.meta.env.VITE_BACK_URL;

const Section = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: '180px',
  height: '180px',
  border: '3px solid #FED36A',
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  transition: 'opacity 0.3s',
  '&:hover': {
    opacity: 0.9,
  },
}));

const FieldButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#455A64',
  color: 'white',
  width: '25%',
  height: '50px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  fontWeight: 300,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  textTransform: 'none',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: '#455a6480',
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FED36A',
  color: '#212832',
  width: '25%',
  height: '50px',
  fontWeight: 400,
  marginTop: theme.spacing(4),
  '&:hover': {
    backgroundColor: '#fac746',
  },
}));

export default function Profile() {












  const handleSubmit = async (email) => {

    const sent_body = {
      "email": "rafael_lima@mail.com"
    }

    try {
        const response = await fetch(`${VITE_BACK_URL}/api/users/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sent_body),
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
        <Section sx={{marginTop: '50px', marginBottom: '50px'}}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '40px',
              fontWeight: 900,
              color: 'white',
            }}
          >
            Profile
          </Typography>
          <ProfileAvatar alt="Profile Pic" src={ProfilePic} />
    
          <FieldButton sx={{width: {xs: '15rem', sm: '17rem', md: '20rem' }}}>
            <img src={UserIcon} alt="Profile Info" style={{ width: '22px', height: '24px' }} />
            <Typography sx={{ flexGrow: 1, textAlign: 'start', paddingLeft: '16px', fontSize: '18px', fontWeight: '300' }}></Typography>
            <IconButton>
              <img src={Edit} alt="Edit" style={{ width: '22px', height: '24px' }} />
            </IconButton>
          </FieldButton>
    
          <FieldButton sx={{width: {xs: '15rem', sm: '17rem', md: '20rem' }}}>
            <img src={EmailIcon} alt="Email" style={{ width: '22px', height: '24px'}} />
            <Typography sx={{ flexGrow: 1, textAlign: 'start', paddingLeft: '16px', fontSize: '18px', fontWeight: '300' }}></Typography>
            <IconButton>
              <img src={Edit} alt="Edit" style={{ width: '22px', height: '24px' }} />
            </IconButton>
          </FieldButton>
    
          <FieldButton sx={{width: {xs: '15rem', sm: '17rem', md: '20rem' }}}>
            <img src={PassIcon} alt="Password" style={{ width: '22px', height: '24px' }} />
            <Typography sx={{ flexGrow: 1, textAlign: 'start', paddingLeft: '16px', fontSize: '18px', fontWeight: '300' }}>Password</Typography>
            <IconButton>
              <img src={Edit} alt="Edit" style={{ width: '22px', height: '24px' }} />
            </IconButton>
          </FieldButton>
    
          <FieldButton sx={{width: {xs: '15rem', sm: '17rem', md: '20rem' }}}>
            <img src={TasksIcon} alt="My Tasks" style={{ width: '22px', height: '24px'  }} />
            <Typography sx={{ flexGrow: 1, textAlign: 'start', paddingLeft: '16px', fontSize: '18px', fontWeight: '300' }}>My Tasks</Typography>
            <IconButton>
              <img src={Arrow} alt="Arrow" style={{ width: '22px', height: '24px' }} />
            </IconButton>
          </FieldButton>
    
          <FieldButton sx={{width: {xs: '15rem', sm: '17rem', md: '20rem' }}}>
            <img src={PrivacyIcon} alt="Privacy" style={{ width: '22px', height: '24px' }} />
            <Typography sx={{ flexGrow: 1, textAlign: 'start', paddingLeft: '16px', fontSize: '18px', fontWeight: '300' }}>Privacy</Typography>
            <IconButton>
              <img src={Arrow} alt="Arrow" style={{ width: '22px', height: '24px' }} />
            </IconButton>
          </FieldButton>
    
          <FieldButton sx={{width: {xs: '15rem', sm: '17rem', md: '20rem' }}}>
            <img src={SettingsIcon} alt="Settings" style={{ width: '22px', height: '24px' }} />
            <Typography sx={{ flexGrow: 1, textAlign: 'start', paddingLeft: '16px', fontSize: '18px', fontWeight: '300' }}>Settings</Typography>
            <IconButton>
              <img src={Arrow} alt="Arrow" style={{ width: '22px', height: '24px' }} />
            </IconButton>
          </FieldButton>
    
          <LogoutButton 
          onClick={handleSubmit}
          sx={{width: {xs: '15rem', sm: '17rem', md: '20rem' }}} startIcon={<img src={LogoutIcon} alt="Logout" style={{ width: '22px', height: '22px' }} />}>
            Logout
          </LogoutButton>
        </Section>
      );
    }