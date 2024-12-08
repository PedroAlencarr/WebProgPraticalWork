import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export default function Loading() {
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </Box>
  );
};
