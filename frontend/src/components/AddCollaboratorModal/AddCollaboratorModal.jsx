import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Formik, Form } from 'formik';
import CustomField from "../CustomField/CustomField";
import CustomButton from "../CustomButton/CustomButton";

const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  backgroundColor: "white",
  boxShadow: 24,
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export default function AddCollaboratorModal({ open, onClose, onSubmit }) {
  const initialValues = { email: '' };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox
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
          }}>
        <Typography variant="h6" 
            sx={{
                fontSize: '1.625rem',
                fontWeight: '500',
                color: '#fff',
                alignSelf: 'flex-start',
            }}>
                Add Collaborator
            </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, handleBlur}) => (
            <Form>
              <CustomField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />
              <CustomButton sx={{marginTop: '2rem'}} variantStyle="filled" text="Add Collaborator" type="submit" />
            </Form>
          )}
        </Formik>
      </ModalBox>
    </Modal>
  );
}
