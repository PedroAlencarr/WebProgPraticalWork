import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';

export default function BoardCard({ name, progress }) {
  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
          <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
