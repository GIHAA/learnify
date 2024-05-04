import  { useState } from 'react';
import { TextField, Button, Grid, Avatar } from "@mui/material";
import { useFormik } from 'formik';
import InputFileUpload from "./form-components/InputFileUpload";
import propTypes from 'prop-types';
import AssignmentIcon from '@mui/icons-material/Assignment';

const AddSectionForm = ({ getSectionData }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarClick = (avatarId) => {
    setSelectedAvatar(avatarId);
    formik.setFieldValue('selectedAvatar', avatarId);
  };

  const getsVideoDownloadURL = (url) => {
    formik.setFieldValue('video', url);
  };

  const getsImageDownloadURL = (url) => {
    formik.setFieldValue('image', url);
  };

  const formik = useFormik({
    initialValues: {
      video: "",
      image: "",
      title: "",
      description: "",
      duration: "",
      selectedAvatar: null,
    },
    onSubmit: (values) => {
      console.log(values);
      getSectionData(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputFileUpload
        setDownloadURL={getsVideoDownloadURL}
        text="Upload Video"
        type="video"
        className="flex justify-center"
      />

      <InputFileUpload
        setDownloadURL={getsImageDownloadURL}
        text="Upload Image"
        type="image"
        className="flex justify-center mt-5"
      />

      <TextField
        id="title"
        label="Title"
        multiline
        maxRows={6}
        className="w-full mt-5"
        {...formik.getFieldProps('title')}
      />

      <TextField
        id="description"
        label="Description"
        multiline
        maxRows={6}
        className="w-full mt-5"
        {...formik.getFieldProps('description')}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="duration"
            label="Duration"
            variant="outlined"
            fullWidth
            className="mt-5"
            {...formik.getFieldProps('duration')}
          />
        </Grid>
        <Grid item xs={6}>
          <div className="mt-[34px] ml-[20px]">
            <Grid container spacing={2} justifyContent="space-between">
              {[1, 2, 3, 4].map((avatarId) => (
                <Avatar
                  key={avatarId}
                  variant="rounded"
                  className={`w-[50px] mt-1 h-[50px] ${
                    selectedAvatar === avatarId ? 'bg-blue-500' : ''
                  }`}
                  onClick={() => handleAvatarClick(avatarId)}
                >
                  <AssignmentIcon />
                </Avatar>
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" className="mt-4 w-full">
        Submit
      </Button>
    </form>
  );
};

AddSectionForm.propTypes = {
  getSectionData: propTypes.func.isRequired,
};

export default AddSectionForm;

