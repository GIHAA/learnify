import { TextField, Button, Select, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import InputFileUpload from "./form-components/InputFileUpload";
import propTypes from "prop-types";
import { useRef } from "react";
import * as Yup from "yup";

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
    validationSchema: Yup.object({
      title: Yup.string().required("Course title is required"),
      description: Yup.string().required("Course description is required"),
      price: Yup.number().required("Course price is required"),
      thumbnail: Yup.string().required("Course thumbnail is required"),
      category: Yup.string().required("Course category is required"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-3">
        <TextField
          id="title"
          label="Course Title"
          className="w-full mt-2"
          {...formik.getFieldProps("title")}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
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
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
      </div>
      <Select
        fullWidth
        className="mt-5"
        {...formik.getFieldProps("category")}
        error={formik.touched.category && Boolean(formik.errors.category)}
      >
        <MenuItem value="">Select a category</MenuItem>
        <MenuItem value="web-development">Web Development</MenuItem>
        <MenuItem value="blockchain">Blockchain</MenuItem>
        <MenuItem value="bootcamp">Bootcamp</MenuItem>
        <MenuItem value="certificate-program">Certificate Program</MenuItem>
        <MenuItem value="degree-program">Degree Program</MenuItem>
      </Select>
      {formik.touched.category && formik.errors.category && (
        <div className="text-red-500">{formik.errors.category}</div>
      )}
      <div className="mt-3">
        <TextField
          id="price"
          label="Course Price"
          type="number"
          className="w-full mt-2"
          {...formik.getFieldProps("price")}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
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
        {formik.touched.thumbnail && formik.errors.thumbnail && (
          <div className="text-red-500">{formik.errors.thumbnail}</div>
        )}
      </div>
      <Button type="submit" variant="contained" className="mt-4 w-full">
        Submit
      </Button>
      {Object.keys(formik.errors).length > 0 && (
        <div className="text-red-500">Please fix the errors in the form.</div>
      )}
    </form>
  );
};

AddCourseForm.propTypes = {
  getCourseMetaData: propTypes.func.isRequired,
};

export default AddCourseForm;