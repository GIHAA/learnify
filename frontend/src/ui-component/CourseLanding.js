import { CardMedia } from "@mui/material";
import propTypes from "prop-types";

const CourseLanding = (params) => {
  return (
    <>
      <div>
        <CardMedia
          component="img"
          className="my-4 rounded-[10px] drop-shadow-md"
          image={params.thumbnail}
        />
      </div>
      <div className="text-[20px]">{params.description}</div>
    </>
  );
};

CourseLanding.propTypes = {
  getCourseMetaData: propTypes.func.isRequired,
  description: propTypes.string,
};

export default CourseLanding;
