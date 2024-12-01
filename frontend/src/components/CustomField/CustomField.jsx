import React from 'react';
import { Field } from 'formik';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#455A64',
        color: '#fff',
        borderRadius: '0px',
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
        backgroundColor: '#455A64',
        borderColor: '#1976d2',
    },
    '& .MuiInputLabel-root': {
        color: '#8CAAB9',
        fontSize: '1.125rem',
        transform: 'translate(0, -.25rem)',
        position: 'relative',
    },
    '& .MuiInputLabel-shrink': {
        transform: 'translate(0, -.25rem) scale(1)',
        fontWeight: 'bold',
    }
}));

export default function CustomField({ ...props }) {
    return (
        <Field
            as={StyledField}
            {...props}/>
    );
};