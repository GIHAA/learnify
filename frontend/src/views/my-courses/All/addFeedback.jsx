import React from 'react';
import { Modal, Typography, Button, Box, Rating } from "@mui/material";
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

const AddFeedback = ({ open, handleClose , addFeedback , data }) => {
  console.log(data);
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
            feedback: '',
            rating: 0,
            course : data.course.title
          }}
          onSubmit={(values, { setSubmitting }) => {
            addFeedback(values);
            setSubmitting(false);
            handleClose();
          }}
        >
          {({ submitForm, setFieldValue, values }) => (
            <Form>
              <Typography id="modal-modal-title" className='mb-3' variant="h2" component="h2">
                Add Feedback
              </Typography>
              <Typography variant="subtitle1">
                {data.course.name}
              </Typography>
              <Typography variant="subtitle1">
                {data.course.description}
              </Typography>

              <Field
                component={TextField}
                name="feedback"
                label="Feedback"
                fullWidth
                margin="normal"
                required
              />
              <Box mt={2}>
                <Typography variant="subtitle1">Rating</Typography>
                <Rating
                  name="rating"
                  value={values.rating}
                  size="large"
                  onChange={(event, newValue) => {
                    setFieldValue('rating', newValue);
                  }}
                />
              </Box>
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
                  Add Feedback
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

AddFeedback.propTypes = {
  open: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  addFeedback: propTypes.func.isRequired,
  data: propTypes.object.isRequired,
};

export default AddFeedback;
