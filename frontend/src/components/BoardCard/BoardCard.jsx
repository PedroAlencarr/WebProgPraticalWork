import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BoardCard({ id, name, progress }) {
  return (
    <Link to={`/projectdetails/${id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{ 
          width: '100%',
          minHeight: '150px',
          height: '100%',
          backgroundColor: '#455A64',
          borderRadius: '0',
          padding: '1rem',
          cursor: 'pointer',
          '& .MuiCardContent-root': {
            minHeight: '150px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },}}>
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
            {name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress sx={{ backgroundColor: '#fff' }} variant="determinate" value={progress} />
            </Box>
            <Typography variant="p" color="#fff">{`${progress}%`}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};
