import { useState, useRef } from "react";
import { TextField, Button, Grid, Avatar } from "@mui/material";
import { useFormik } from "formik";
import InputFileUpload from "./form-components/InputFileUpload";
import propTypes from "prop-types";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";

const AddSectionForm = ({ getSectionData }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const resetVideoInput = useRef(null);
  const resetImageInput = useRef(null);

  const handleAvatarClick = (avatarId) => {
    setSelectedAvatar(avatarId);
    formik.setFieldValue("selectedAvatar", avatarId);
  };

  const getsVideoDownloadURL = (url) => {
    formik.setFieldValue("video", url);
  };

  const getsImageDownloadURL = (url) => {
    formik.setFieldValue("image", url);
  };

  const formik = useFormik({
    initialValues: {
      video: "",
      image: "",
      title: "",
      description: "",
      duration: "",
      type: "",
    },
    onSubmit: (values) => {
      getSectionData(values);
      resetVideoInput.current();
      resetImageInput.current();
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputFileUpload
        setDownloadURL={getsVideoDownloadURL}
        setResetFunction={(reset) => {
          resetVideoInput.current = reset;
        }}
        text="Upload Video"
        type="video"
        className="flex justify-center"
      />

      <InputFileUpload
        setDownloadURL={getsImageDownloadURL}
        setResetFunction={(reset) => {
          resetImageInput.current = reset;
        }}
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
        {...formik.getFieldProps("title")}
      />

      <TextField
        id="description"
        label="Description"
        multiline
        maxRows={6}
        className="w-full mt-5"
        {...formik.getFieldProps("description")}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="duration"
            label="Duration"
            variant="outlined"
            fullWidth
            className="mt-5"
            {...formik.getFieldProps("duration")}
          />
        </Grid>
        <Grid item xs={6}>
          <div className="mt-[34px] ml-[20px]">
            <Grid container spacing={2} justifyContent="space-between">
              {[1, 2, 3].map((avatarId) => (
                <Avatar
                  color="primary"
                  key={avatarId}
                  variant="rounded"
                  className={`w-[50px] mt-1 h-[50px] ${
                    selectedAvatar === avatarId ? "bg-blue-400" : ""
                  }`}
                  onClick={() => {
                    let type;
                    if (avatarId === 1) type = "video";
                    if (avatarId === 2) type = "image";
                    if (avatarId === 3) type = "text";
                    handleAvatarClick(avatarId);
                    formik.setFieldValue("type", type);
                  }}
                >
                  {avatarId === 1 ? (
                    <OndemandVideoIcon className="text-white" color="primary" />
                  ) : avatarId === 2 ? (
                    <InsertPhotoIcon  className="text-white" color="primary" />
                  ) : (
                    <FormatColorTextIcon   className=" text-white" color="primary" />
                  )}
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
