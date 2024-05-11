import PropTypes from "prop-types";
import { Button } from "@mui/material";
import LinearProgressWithLabel from "ui-component/LinearProgressWithLabel";
import { useNavigate } from 'react-router-dom';

const CourseCard = ({
  image,
  title,
  description,
  rating,
  price,
  progress = 10,
  id,
}) => {

  const navigate = useNavigate();

  return (
    <div className="max-w-[334px] rounded-[14px]  shadow-md pb-[14px]">
      <img src={image} className=" rounded-t-[14px] w-[100%]" />
      <div className="p-[20px] flex flex-col gap-[8px]">
        <p className="text-[20px] leading-[28px] font-bold">{title}</p>
        <p className="text-[16px] leading-[25px]">{description}</p>
        <p className="text-[16px] leading-[25px] font-bold">{rating}</p>
        <p className="text-[16px] leading-[25px] font-bold"> $ {price}</p>
      </div>
      <div className="mx-4">
        {progress && <LinearProgressWithLabel progress={progress} />}
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
