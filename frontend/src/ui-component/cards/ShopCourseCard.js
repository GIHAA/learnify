import PropTypes from "prop-types";
import { Button, CardMedia, Rating } from "@mui/material";
import { Link } from "react-router-dom";

const ShopCourseCard = ({ id, title, description, imageUrl, rating, price }) => {
  return (
    <div className="max-w-[334px] rounded-[14px]  shadow-md pb-[14px] h-full">
      <CardMedia
        component="img"
        height="225"
        width={"100%"}
        image={imageUrl}
        alt="Card Image"
        sx={{
          objectFit: "cover",
          backgroundSize: "contain",
        }}
   style={{objectFit: "cover", backgroundSize: "contain"}}
   className="w-full h-[225px] object-cover bg-cover bg-center rounded-t-[14px]"
      />
      <div className="p-[20px] flex flex-col gap-[8px]">
        <p className="text-[20px] leading-[28px] font-bold">{title}</p>
        <p className="text-[16px] leading-[25px]">{description}</p>
        <Rating name="read-only" value={rating} readOnly/>
        <p className="text-[16px] leading-[25px] font-bold"> {price &&  `$ ${price}` }</p>
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
