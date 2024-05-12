import { CardMedia } from "@mui/material";
import propTypes from "prop-types";

const CourseSession = (params) => {
  console.log(params);
  return (
    <>
      {params.title && (
        <h1 className="font-bold text-[24px] pl-1 mb-2 pt-1">{params.title}</h1>
      )}
      {params.type === "video" && (
        <CardMedia
          component="video"
          controls
          className="mt-7 mb-5 rounded-[10px] drop-shadow-md "
          src={params.video}
        />
      )}
      {params.type === "image" && (
        <CardMedia
          component="img"
          className="mt-7 mb-5 rounded-[10px] drop-shadow-md "
          image={params.image}
        />
      )}
      {params.description && (
        <h1 className="text-gray-500 text-[17px] pl-1 pt-1 ">
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
