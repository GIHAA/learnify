import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { removeCourse } from "api/courseService";

export default function BasicCard({ id, imageUrl, title, price, rating , currentPage , fetchCourses , description,  handleOpen , setData }) {
  const handleRemove = async (courseId) => {
    toast((t) => (
      <div className=" bg-white rounded  flex">
        <p className="mb-2">Are you sure you want to delete this course?</p>
        <button
          className="flex ml-2 px-4 pt-3 bg-red-500 text-white rounded hover:bg-red-600 "
          onClick={() => {
            toast.dismiss(t.id);
            confirmDelete(courseId);
          }}
        >
          Confirm
        </button>
      </div>
    ));
  };

  const confirmDelete = async (courseId) => {
    toast.success("Course deleted successfully");
    await removeCourse(courseId);
    fetchCourses(currentPage);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        border: "1px solid #e0e0e0",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
        margin: "12px",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt="Card Image"
        sx={{
          objectFit: "cover",
          backgroundSize: "contain",
        }}
        style={{ objectFit: "cover", backgroundSize: "contain" }}
        className="w-full h-[225px] object-cover bg-cover bg-center rounded-t-[14px]"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {price}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            handleOpen();
            setData({ id, image : imageUrl, title, description , price, rating });
          }}
          className="w-full mt-3 rounded-[6px]"
        >
          Edit
        </Button>
        <Button
          color="error"
          variant="outlined"
          onClick={() => {
            handleRemove(id);
          }}
          className="w-full my-1 rounded-[6px]"
        >
          Remove
        </Button>
      </CardContent>
    </Card>
  );
}

BasicCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  fetchCourses: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};
