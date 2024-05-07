import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ShopCourseCard = ({ id, title, description, imageUrl, rating, price }) => {
  return (
    <div className="max-w-[334px] rounded-[14px]  shadow-md pb-[14px]">
      <img src={imageUrl} className=" rounded-t-[14px] w-[100%]" />
      <div className="p-[20px] flex flex-col gap-[8px]">
        <p className="text-[20px] leading-[28px] font-bold">{id}</p>
        <p className="text-[20px] leading-[28px] font-bold">{title}</p>
        <p className="text-[16px] leading-[25px]">{description}</p>
        <p className="text-[16px] leading-[25px] font-bold">{rating}</p>
        <p className="text-[16px] leading-[25px] font-bold"> $ {price}</p>
      </div>
        <Button
          variant="contained"
          className="w-[50%] rounded-[6px] ml-[20px]"
          component={Link}
          to={`/shop/course/${id}`}
        >
          View More
        </Button>
    </div>
  );
};

ShopCourseCard.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default ShopCourseCard;
