import PropTypes from 'prop-types';

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

export default function BasicCard({ imageUrl, title, price , rating }) {
  return (
    <Card sx={{
        maxWidth: 345,
        border: "1px solid #e0e0e0",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
        margin: "12px"
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
      </CardContent>
    </Card>
  );
}

BasicCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};
