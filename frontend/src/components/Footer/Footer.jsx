import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

export default function Footer() {
    return (
        <Box
            component="footer" 
            sx={{
                backgroundColor: '#1a2028', 
                color: '#fff',
                padding: {
                    xs: '3rem 1rem',
                    md: '5rem',
                },
        }}>
            <Typography
                variant="body2"
                sx={{
                    marginTop: '2rem',
                    textAlign: 'center',
                }}
            >
                © 2024, UFSC. All rights reserved.
            </Typography>
        </Box>
    )
}
