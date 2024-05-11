import { CardMedia } from "@mui/material";
import propTypes from "prop-types";

const CourseSession = (params) => {
  return (
    <>
      {params.title && (
        <h1 className="font-bold text-[18px] pl-5 pt-1">{params.title}</h1>
      )}
      {params.type === "video" && (
        <CardMedia
          component="video"
          controls
          className="my-4 rounded-[10px] drop-shadow-md "
          src={params.video}
        />
      )}
      {params.type === "image" && (
        <CardMedia
          component="img"
          className="my-4 rounded-[10px] drop-shadow-md "
          image={params.photo}
        />
      )}
      {params.description && (
        <h1 className="text-gray-500 text-[15px] pl-5 pt-1 ">
          {params.description}
        </h1>
      )}
    </>
  );
};

CourseSession.propTypes = {
  getCourseMetaData: propTypes.func.isRequired,
};

export default CourseSession;
