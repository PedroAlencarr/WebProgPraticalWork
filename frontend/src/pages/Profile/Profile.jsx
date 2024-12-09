import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
} from '@mui/material';
import { styled } from '@mui/system';
import Arrow from '../../assets/images/arrow-icon.png';
import Edit from '../../assets/images/edit-icon.png';
import UserIcon from '../../assets/images/user-icon.png';
import EmailIcon from '../../assets/images/email-icon.png';
import PassIcon from '../../assets/images/pass-icon.png';
import TasksIcon from '../../assets/images/task-icon.png';
import LogoutIcon from '../../assets/images/logout-icon.png';
import { AuthContext } from '../../context/AuthContext';
//import { handleLogout} from '../../components/Header/Header'

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

const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FED36A',
  color: '#212832',
  width: '35%',
  height: '50px',
  fontWeight: 400,
  marginTop: theme.spacing(4),
  '&:hover': {
    backgroundColor: '#fac746',
  },"@media (max-width: 600px)": {
    width: "300px",
}
}));

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
  const { user, setUser } = useContext(AuthContext);

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
        label="Name"
        value={`${user.first_name} ${user.last_name}`}
        onSave={(value) => {
          const [first_name, ...last_nameParts] = value.split(' ');
          handleUpdateField('first_name', first_name);
          handleUpdateField('last_name', last_nameParts.join(' '));
        }}
        icon={UserIcon}
      />

      <EditableField
        label="Email"
        value={user.email}
        onSave={() => alert('Não é permitido alterar o e-mail.')}
        icon={EmailIcon}
      />

      <EditableField
        label="Password"
        value="Password"
        onSave={(value) => handleUpdateField('password', value)}
        icon={PassIcon}
        isPassword
      />

      <FieldBox>
        <img src={TasksIcon} alt="My Tasks" style={{ width: '22px', height: '24px' }} />
        <Typography
          sx={{
            flexGrow: 1,
            textAlign: 'start',
            paddingLeft: '16px',
            fontSize: '14px',
            fontWeight: '300',
          }}
        >
          My Tasks
        </Typography>
        <IconButton>
          <img src={Arrow} alt="Arrow" style={{ width: '22px', height: '24px' }} />
        </IconButton>
      </FieldBox>

      <LogoutButton startIcon={<img src={LogoutIcon} alt="Logout" style={{ width: '22px', height: '22px' }} />}>
        Logout
      </LogoutButton>
    </Section>
  );
}