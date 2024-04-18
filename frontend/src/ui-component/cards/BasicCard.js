import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from "@mui/material";

export default function BasicCard({ imageUrl, title, price, rating, isBtnExist }) {
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
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {price}
        </Typography>
        <Rating name="read-only" value={rating} readOnly />
        {isBtnExist && (
          <Button variant="contained" color="primary">
            More Info
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

BasicCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  isBtnExist: PropTypes.bool,
};
