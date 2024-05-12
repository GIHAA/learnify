import React from 'react';
import { Modal, Typography, Button, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import propTypes from 'prop-types';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};



const EditUserModal = ({ open, handleClose , editUser , data }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Formik
          initialValues={{
            name: data.name,
            email: data.email,
            role: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            editUser(values);
            setSubmitting(false);
            handleClose();
          }}
        >
          {({ submitForm }) => (
            <Form>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New User
              </Typography>
              <Field
                component={TextField}
                name="name"
                label="Name"
                fullWidth
                margin="normal"
                required
              />
              <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
                fullWidth
                margin="normal"
                required
              />
              <Field
                component={TextField}
                type="text"
                name="role"
                label="Role"
                select
                fullWidth
                margin="normal"
                required
              >
                <MenuItem value="ADMIN">ADMIN</MenuItem>
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="INSTRUCTOR">INSTRUCTOR</MenuItem>
              </Field>
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  variant="contained"
                  color="primary"
                  onClick={submitForm}
                >
                  Update User
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

EditUserModal.propTypes = {
  open: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  editUser: propTypes.func.isRequired,
  data: propTypes.object.isRequired,
};

export default EditUserModal;
