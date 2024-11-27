import './TaskCreation.scss';
import React, { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Button,
    Typography,
    InputAdornment,
    Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

const StyledTextField = styled(TextField)(() => ({
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
        color: '#FFFFFF',
        fontSize: '1.125rem',
        transform: 'translate(0, -.25rem)',
        position: 'relative',
        fontWeight: 'bold',
    },
    '& .MuiInputLabel-shrink': {
        transform: 'translate(0, -.25rem) scale(1)',
        fontWeight: 'bold',
    },
    '& .MuiInputBase-input::placeholder': {
        color: '#FFFFFF',
        opacity: 0.9,
    },
}));

export default function TaskCreation() {
    const [members, setMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/members');
                if (!response.ok) throw new Error('Failed to fetch members');
                const data = await response.json();
                setMembers(data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };
        fetchMembers();
    }, []);

    const handleMembersChange = (event, value) => {
        setSelectedMembers(value);
    };

    const validationSchema = Yup.object({
        task_title: Yup.string().required('Task Title is required'),
        task_details: Yup.string().required('Task Detailment is required'),
        time: Yup.string()
            .nullable()
            .notRequired()
            .matches(
                /^([01]\d|2[0-3]):([0-5]\d)$/,
                'The time must be in HH:mm format'
            ),
        date: Yup.string()
            .matches(
                /^\d{2}-\d{2}-\d{4}$/,
                'The date must be in DD-MM-YYYY format'
            )
            .test(
                'is-valid-date',
                'Invalid date',
                (value) => {
                    if (!value) return true;
                    const [day, month, year] = value.split('-');
                    const isoDate = `${year}-${month}-${day}`;
                    const date = new Date(isoDate);
                    return (
                        date instanceof Date &&
                        !isNaN(date.getTime()) &&
                        date.toISOString().startsWith(isoDate)
                    );
                }
            )
            .nullable()
            .notRequired(),
    });

    const initialValues = {
        task_title: '',
        task_details: '',
        time: '',
        date: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const payload = { ...values, members: selectedMembers };
            const response = await fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Failed to create task');
            const data = await response.json();
            console.log('Task created:', data);

            resetForm();
            setSelectedMembers([]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                width: '100%',
            }}
        >
            <Typography
                component="h2"
                gutterBottom
                sx={{
                    fontSize: '2rem',
                    fontWeight: '500',
                    color: '#fff',
                }}
            >
                Create New Task
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                mt: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                alignItems: 'center',
                            }}
                        >
                            <Field
                                name="task_title"
                                as={StyledTextField}
                                label="Task Title"
                                type="text"
                                sx={{ width: { xs: '20rem', sm: '30rem', md: '30rem' } }}
                                error={touched.task_title && Boolean(errors.task_title)}
                                helperText={touched.task_title && errors.task_title}
                            />
                            <Field
                                name="task_details"
                                as={StyledTextField}
                                label="Task Detailment"
                                type="text"
                                multiline
                                rows={4}
                                sx={{ width: { xs: '20rem', sm: '30rem', md: '30rem' } }}
                                error={touched.task_details && Boolean(errors.task_details)}
                                helperText={touched.task_details && errors.task_details}
                            />
                            <Autocomplete
                                multiple
                                options={members}
                                getOptionLabel={(option) => option.name}
                                value={selectedMembers}
                                onChange={handleMembersChange}
                                renderTags={(tagValue, getTagProps) =>
                                    tagValue.map((option, index) => (
                                        <Chip
                                            key={option.id}
                                            label={option.name}
                                            {...getTagProps({ index })}
                                            sx={{
                                                backgroundColor: '#FED36A',
                                                color: '#000',
                                            }}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <StyledTextField
                                        {...params}
                                        label="Add Team Members"
                                        placeholder="Search members..."
                                    />
                                )}
                                sx={{ width: { xs: '20rem', sm: '30rem', md: '30rem' } }}
                            />
                            <Box
                                className="time__div"
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    width: '100%',
                                    justifyContent: 'center',
                                }}
                            >
                                <Field
                                    name="time"
                                    as={StyledTextField}
                                    label="Time"
                                    type="text"
                                    placeholder="HH:mm"
                                    sx={{ width: { xs: '10rem', sm: '14.5rem' } }}
                                    error={touched.time && Boolean(errors.time)}
                                    helperText={touched.time && errors.time}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccessTimeOutlinedIcon
                                                    sx={{ marginRight: '.5rem', color: '#FED36A' }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Field
                                    name="date"
                                    as={StyledTextField}
                                    label="Date"
                                    type="text"
                                    placeholder="DD-MM-YYYY"
                                    sx={{ width: { xs: '10rem', sm: '14.5rem' } }}
                                    error={touched.date && Boolean(errors.date)}
                                    helperText={touched.date && errors.date}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EventOutlinedIcon
                                                    sx={{ marginRight: '.5rem', color: '#FED36A' }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    width: { xs: '70%', sm: '50%', md: '25%' },
                                    padding: '1rem',
                                    mt: 3,
                                    backgroundColor: '#FED36A',
                                    color: '#000',
                                    '&:hover': { backgroundColor: '#E5BC5E' },
                                }}
                            >
                                Create Task
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}