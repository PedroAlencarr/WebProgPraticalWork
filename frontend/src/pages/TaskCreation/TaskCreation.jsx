import React, { useContext } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { AuthContext } from '../../context/AuthContext';
import CustomField from '../../components/CustomField/CustomField.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';

const StyledBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
}));

const validationSchema = Yup.object({
    task_title: Yup.string().required('Task Title is required'),
    task_details: Yup.string().required('Task Detailment is required'),
});

const TaskCreation = ({open, onClose, onTaskCreated, id, fetchTasks }) => {
    const { user, showMessage } = useContext(AuthContext);

    const initialValues = {
        task_title: '',
        task_details: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const payload = {
                title: values.task_title,
                description: values.task_details,
                board: {id},
                status: "To Do",
                createdBy: user._id,
            };

            const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/cards/${id}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to create the task. Check the data sent.");
            }

            const data = await response.json();
            showMessage('Task successful created!', 'success');

            if (onTaskCreated) onTaskCreated(data);
            resetForm();
            onClose();
            fetchTasks(id)
        } catch (error) {
            showMessage(errorMessage, 'error');
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="task-creation-modal"
            aria-describedby="form-modal-for-creating-tasks"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '500px', md: '500px' },
                    bgcolor: '#212832',
                    borderRadius: 1,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography
                    component="h2"
                    gutterBottom
                    sx={{
                        fontSize: '1.625rem',
                        fontWeight: '500',
                        color: '#fff',
                        alignSelf: 'flex-start',
                    }}
                >
                    Create New Task
                </Typography>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isValid, dirty }) => (
                        <Form>
                            <StyledBox>
                                <CustomField
                                    name="task_title"
                                    label="Task Title"
                                    error={touched.task_title && Boolean(errors.task_title)}
                                    helperText={touched.task_title && errors.task_title}
                                    fullWidth
                                />
                                <CustomField
                                    name="task_details"
                                    label="Task Detailment"
                                    multiline
                                    rows={4}
                                    error={touched.task_details && Boolean(errors.task_details)}
                                    helperText={touched.task_details && errors.task_details}
                                    fullWidth
                                />
                                <CustomButton
                                    variantStyle="filled"
                                    text="Create Task"
                                    type="submit"
                                    disabled={!(isValid && dirty)}
                                />
                            </StyledBox>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default TaskCreation;