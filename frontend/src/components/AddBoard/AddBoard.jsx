import React from 'react';
import { Modal, Box, TextField, Typography } from '@mui/material';
import CustomField from '../CustomField/CustomField';
import CustomButton from '../CustomButton/CustomButton';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const AddBoardModal = ({ open, onClose, onSubmit }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('O título é obrigatório'),
    description: Yup.string().required('A descrição é obrigatória'),
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-board-modal"
      aria-describedby="form-modal-for-adding-new-board"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {
            xs: '90%',
            sm: '500px',
            md: '600px',
          },
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
                Add new board!
        </Typography>

        <Formik
          initialValues={{
            title: '',
            description: '',
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '2.5rem'}}>
                    <CustomField
                        name="title"
                        label="Título"
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                        fullWidth
                    />
                    <CustomField
                        name="description"
                        label="Descrição"
                        multiline
                        rows={5}
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                        fullWidth
                    />
                    <CustomButton variantStyle="filled" text='Add board' type="submit" disabled={!(isValid && dirty)}/>
                </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddBoardModal;
