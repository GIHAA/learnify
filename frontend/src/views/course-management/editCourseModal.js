import React from 'react';
import { Modal, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
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



const EditCourseModal = ({ open, handleClose , editCourse , data }) => {

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
            title : data.title,
            description : data.description,
            price : data.price,
            id : data.id
          }}
          onSubmit={(values, { setSubmitting }) => {
            editCourse(values);
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
                name="title"
                label="title"
                fullWidth
                margin="normal"
                required
              />
              <Field
                component={TextField}
                name="description"
                type="description"
                label="description"
                fullWidth
                margin="normal"
                required
              />
              <Field
                component={TextField}
                name="price"
                type="number"
                label="price"
                fullWidth
                margin="normal"
                required
              />
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
                  Update Course
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

EditCourseModal.propTypes = {
  open: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  editCourse: propTypes.func.isRequired,
  data: propTypes.object.isRequired,
};

export default EditCourseModal;
