import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { LinearProgressWithLabel } from "layout/CusLayout/Sidebar/MenuCard";

const CourseCard = ({
  image,
  title,
  description,
  rating,
  price,
  progress,
  id,
}) => {

  const navigate = useNavigate();

  return (
    <div className="max-w-[334px] rounded-[14px]  shadow-md pb-[14px]">
      <img src={image} className=" rounded-t-[14px] w-[100%]" />
      <div className="p-[20px] flex flex-col gap-[8px]">
        <p className="text-[20px] leading-[28px] font-bold">{title}</p>
        <p className="text-[16px] leading-[25px]">{description}</p>
      </div>
  <div className="mx-3 mb-3">
        <LinearProgressWithLabel value={progress} />
  </div>
      <div className="px-3">
        <Button variant="contained" onClick={() => {
          navigate(`/take-course/${id}`)
        }} className="w-full rounded-[6px] ">
          Continue
        </Button>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default CourseCard;
