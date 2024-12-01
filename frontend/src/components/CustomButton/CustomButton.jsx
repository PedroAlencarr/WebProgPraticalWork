import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ ownerState: { variantStyle } }) => ({
    padding: '1.5rem',
    backgroundColor: variantStyle == 'filled' ? '#FED36A' : 'transparent',
    border: variantStyle == 'filled' ? 'none' : '1px solid #FED36A',
    fontSize: '1.25rem',
    color: variantStyle == 'filled' ? '#000' : '#FED36A',
    textDecoration: 'none',
    '&:hover': {
        backgroundColor: variantStyle == 'filled' ? '#E5BC5E' : '#2980b9',
    }
}));

export default function CustomButton({ text, variantStyle, ...props }) {
    return (
        <StyledButton
            ownerState={{ variantStyle }}
            {...props}
        >
            {text}
        </StyledButton>
    );
};

CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
    variantStyle: PropTypes.oneOf(['filled', 'outlined']).isRequired
};
