import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

export default function CardTask({ id, title, description, onDelete, onChangeStatus }) {
  console.log(id)
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangeStatus = (status) => {
    onChangeStatus(id, status);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(id);
    handleMenuClose();
  };

  return (
    <Card sx={{
      width: '100%',
      minHeight: '150px',
      height: '100%',
      backgroundColor: '#455A64',
      borderRadius: '0',
      padding: '1rem',
      cursor: 'pointer',
      position: 'relative',
      '& .MuiCardContent-root': {
        minHeight: '150px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
    }}>
      <CardContent>
        <Typography 
          variant="h3"
          sx={{
            fontSize: '21px',
            color: '#fff',
            marginBottom: '1rem',
            lineHeight: '1.2',
            maxHeight: '2.4em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
          {title}
        </Typography>
        <Typography sx={{ color: '#BCCFD8', marginBottom: '1rem' }}>
          {description}
        </Typography>
      </CardContent>

      <IconButton
        sx={{ position: 'absolute', top: '10px', right: '10px' }}
        onClick={handleMenuOpen}
      >
        <MoreVertIcon sx={{ color: 'white' }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleChangeStatus('Rejected')}>Rejected</MenuItem>
        <MenuItem onClick={() => handleChangeStatus('To Do')}>To Do</MenuItem>
        <MenuItem onClick={() => handleChangeStatus('Doing')}>Doing</MenuItem>
        <MenuItem onClick={() => handleChangeStatus('Done')}>Done</MenuItem>
        <MenuItem onClick={handleDelete}>Delete Task</MenuItem>
      </Menu>
    </Card>
  );
}
