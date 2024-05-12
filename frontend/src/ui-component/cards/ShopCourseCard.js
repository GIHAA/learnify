import PropTypes from "prop-types";
import { Button, CardMedia, Rating } from "@mui/material";
import { Link } from "react-router-dom";

const ShopCourseCard = ({
  id,
  title,
  description,
  imageUrl,
  rating,
  price,
}) => {
  return (
    <div className="max-w-[334px] rounded-[14px] shadow-md flex flex-col justify-between">
      <div>
        <CardMedia
          component="img"
          image={imageUrl}
          alt="Card Image"
          sx={{
            objectFit: "cover",
            backgroundSize: "contain",
            height: "200px",
            borderRadius: "14px 14px 0 0",
          }}
        />
        <div className="p-[20px] flex flex-col gap-[8px]">
          <p className="text-[20px] leading-[28px] font-bold">{title}</p>
          <div className="text-[16px] h-[20px] leading-[25px] overflow-y-scroll max-h-[100px]">
            {description}
          </div>
        </div>
      </div>
      <div>
        <div className="px-3 mb-3">
          <Button
            variant="contained"
            className="w-full rounded-[6px]"
            component={Link}
            to={`/shop/course/${id}`}
          >
            Continue
          </Button>
        </div>
      </div>
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
