import { Typography, TextField, Button } from "@mui/material";
import { useFormik } from 'formik';
import InputFileUpload from "./form-components/InputFileUpload";
import propTypes from 'prop-types';

const AddCourseForm = ({getCourseMetaData}) => {
  const getsDownloadURL = (url) => {
    formik.setFieldValue('imageUrl', url);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      imageUrl: "",
    },
    onSubmit: (values) => {
      getCourseMetaData(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-3">
        <Typography variant="h4" className="font-medium">
          Enter Title
        </Typography>
        <TextField
          id="title"
          label="title"
          className="w-full mt-2"
          {...formik.getFieldProps('title')}
        />
      </div>

      <div className="mt-3">
        <Typography variant="h4" className="font-medium">
          Enter Description
        </Typography>
        <TextField
          id="description"
          label="description"
          multiline
          maxRows={6}
          className="w-full mt-2"
          {...formik.getFieldProps('description')}
        />
      </div>

      <div className="mt-3">
        <Typography variant="h4" className="font-medium">
          Enter Price
        </Typography>
        <TextField
          id="price"
          label="price"
          className="w-full mt-2"
          {...formik.getFieldProps('price')}
        />
      </div>

      <div className="mt-3">

        <InputFileUpload
          text="Upload Photo"
          type="image"
          setDownloadURL={getsDownloadURL}
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