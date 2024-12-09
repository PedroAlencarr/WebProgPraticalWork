import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import ArrowIcon from '@mui/icons-material/ArrowDropDown';

export default function TaskCard({ cardId, currentStatus }) {
  const [dropdownVisible, setDropdownVisible] = useState(null);  
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [title, setTitle] = useState('Carregando título...');
  const [description, setDescription] = useState('Carregando descrição...');
  const anchorRef = useRef(null); 

  const toggleDropdown = (event) => {
    setDropdownVisible(event.currentTarget); 
  };

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(`/api/cards/${cardId}`);
        if (!response.ok) {
          throw new Error('Falha ao carregar os dados do card');
        }
        const data = await response.json();
        setTitle(data.title || 'Título não disponível');
        setDescription(data.description || 'Descrição não disponível');
        setSelectedStatus(data.status || 'To Do');
      } catch (error) {
        console.error('Erro ao buscar dados do card:', error);
        setTitle('Título não disponível');
        setDescription('Descrição não disponível');
      }
    };

    if (cardId) {
      fetchCardData();
    }
  }, [cardId]);

  const handleStatusChange = async (newStatus) => {
    setSelectedStatus(newStatus);

    try {
      const response = await fetch(`/api/cards/${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar o status');
      }

      console.log('Status atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
      setSelectedStatus(currentStatus);
    }
  };

  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: '#212832',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        minHeight: 80,
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ margin: 0 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            {description}
          </Typography>
        </Box>
        <IconButton
          onClick={toggleDropdown}
          ref={anchorRef} 
          sx={{ color: 'white' }}
        >
          <ArrowIcon />
        </IconButton>
      </Box>

      <Menu
        anchorEl={dropdownVisible} 
        open={Boolean(dropdownVisible)}  
        onClose={() => setDropdownVisible(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            backgroundColor: '#455A64',  
            borderRadius: '4px',  
            padding: '5px 0', 
          },
        }}
      >
        <MenuItem
          onClick={() => handleStatusChange('To Do')}
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: '#FED36A',
              color: '#455A64',
            },
          }}
        >
          To Do
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange('Doing')}
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: '#FED36A',
              color: '#455A64',
            },
          }}
        >
          Doing
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange('Done')}
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: '#FED36A',
              color: '#455A64',
            },
          }}
        >
          Done
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange('Rejected')}
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: '#FED36A',
              color: '#455A64',
            },
          }}
        >
          Rejected
        </MenuItem>
      </Menu>
    </Box>
  );
}