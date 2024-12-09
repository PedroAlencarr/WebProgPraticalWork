import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
} from '@mui/material';
import { styled } from '@mui/system';
import CustomButton from '../../components/CustomButton/CustomButton';
import Arrow from '../../assets/images/arrow-icon.png';
import Edit from '../../assets/images/edit-icon.png';
import UserIcon from '../../assets/images/user-icon.png';
import EmailIcon from '../../assets/images/email-icon.png';
import PassIcon from '../../assets/images/pass-icon.png';
import TasksIcon from '../../assets/images/task-icon.png';
import LogoutIcon from '../../assets/images/logout-icon.png';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Section = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const FieldBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#455A64',
  color: 'white',
  width: '35%',
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
  }, "@media (max-width: 600px)": {
    width: "300px",
    marginRight: '0px'
}}));

const EditableField = ({ label, value, onSave, icon, isPassword = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave(inputValue);
    setIsEditing(false);
  };

  return (
    <FieldBox>
      <img src={icon} alt={label} style={{ width: '22px', height: '24px' }} />
      {isEditing ? (
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          size="small"
          type={isPassword ? 'password' : 'text'}
          sx={{ flexGrow: 1, paddingLeft: '16px', fontSize: '14px' }}
        />
      ) : (
        <Typography
          sx={{
            flexGrow: 1,
            textAlign: 'start',
            paddingLeft: '16px',
            fontSize: '14px',
            fontWeight: '300',
          }}
        >
          {isPassword ? '********' : value}
        </Typography>
      )}
      <IconButton onClick={isEditing ? handleSave : () => setIsEditing(true)}>
        <img src={isEditing ? Arrow : Edit} alt={isEditing ? 'Save' : 'Edit'} style={{ width: '22px', height: '24px' }} />
      </IconButton>
    </FieldBox>
  );
};

export default function Profile() {
  const { user, setUser, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleUpdateField = async (field, value) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/users/current`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: value }),
        credentials: 'include',
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
      } else {
        console.error('Failed to update field.');
      }
    } catch (error) {
      console.error('Error updating field:', error);
    }
  };

  const handleLogout = () => {
    logoutUser(navigate)
  }

  return (
    <Section sx={{ marginTop: '50px', marginBottom: '50px' }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: '40px',
          fontWeight: 900,
          color: 'white',
          marginBottom: '32px',
        }}
      >
        Profile
      </Typography>

      <EditableField
        label="First Name"
        value={user.first_name}
        onSave={(value) => {
          handleUpdateField('first_name', first_name);
        }}
        icon={UserIcon}
      />

      <EditableField
        label="Last Name"
        value={user.last_name}
        onSave={(value) => {
          const [...last_nameParts] = value.split(' ');
          handleUpdateField('last_name', last_nameParts.join(' '));
        }}
        icon={UserIcon}
      />

      <FieldBox>
        <img src={EmailIcon} alt="Email" style={{ width: '22px', height: '24px' }} />
        <Typography
          sx={{
            flexGrow: 1,
            textAlign: 'start',
            paddingLeft: '16px',
            fontSize: '14px',
            fontWeight: '300',
          }}
        >
          {user.email}
        </Typography>
      </FieldBox>


      <EditableField
        label="Password"
        value="Password"
        onSave={(value) => handleUpdateField('password', value)}
        icon={PassIcon}
        isPassword
      />

      <CustomButton startIcon={<img src={LogoutIcon} alt="Logout" style={{ width: '22px', height: '22px' }} />} variantStyle='filled' text='Logout' onClick={handleLogout}/>
    </Section>
  );
}