import { TextField, Button, Select, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import InputFileUpload from "./form-components/InputFileUpload";
import propTypes from "prop-types";
import { useRef } from "react";

const AddCourseForm = ({ getCourseMetaData }) => {
  const resetImageInput = useRef(null);

  const getsDownloadURL = (url) => {
    formik.setFieldValue("thumbnail", url);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      thumbnail: "",
      category: "Web Development",
    },
    onSubmit: (values) => {
      getCourseMetaData(values);
      resetImageInput.current();
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-3">
        <TextField
          id="title"
          label="Course Title"
          className="w-full mt-2"
          {...formik.getFieldProps("title")}
        />
      </div>

      <div className="mt-3">
        <TextField
          id="description"
          label="Course Description"
          multiline
          maxRows={6}
          className="w-full mt-2"
          {...formik.getFieldProps("description")}
        />
      </div>

      <Select fullWidth className="mt-5" {...formik.getFieldProps("category")}>
        <MenuItem value="">Select a category</MenuItem>
        <MenuItem value="web-development">Web Development</MenuItem>
        <MenuItem value="blockchain">Blockchain</MenuItem>
        <MenuItem value="bootcamp">Bootcamp</MenuItem>
        <MenuItem value="certificate-program">Certificate Program</MenuItem>
        <MenuItem value="degree-program">Degree Program</MenuItem>
      </Select>


      <div className="mt-3">
        <TextField
          id="price"
          label="Course Price"
          type="number"
          className="w-full mt-2"
          {...formik.getFieldProps("price")}
        />
      </div>

      <div className="mt-3">
        <InputFileUpload
          text="Upload Photo"
          type="image"
          setDownloadURL={getsDownloadURL}
          setResetFunction={(reset) => {
            resetImageInput.current = reset;
          }}
        />
      </div>

      <Button type="submit" variant="contained" className="mt-4 w-full">
        Submit
      </Button>
    </form>
  );
};

AddCourseForm.propTypes = {
  getCourseMetaData: propTypes.func.isRequired,
};

export default AddCourseForm;
