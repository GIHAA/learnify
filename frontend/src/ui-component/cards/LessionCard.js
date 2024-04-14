import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import { CardMedia } from "@mui/material";
import CircularWithValueLabel from "ui-component/CircularProgressWithLabel";

export default function LessionCard({
  title,
  description,
  imageUrl,
  duration,
}) {
  return (
    <div>
      <Card
        sx={{
          maxWidth: 345,
          border: "1px solid #e0e0e0",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          margin: "12px",
          position: "relative",
        }}
      >
        <div className="p-[10px] flex">
          <div
            className="w-[50px] h-[50px] m-2.5 rounded-[7px] absolute top-1 left-0 flex justify-center"
          >
            <CircularWithValueLabel value={100} />
          </div>
          <CardMedia
            className="w-[50px] h-[50px] rounded-[7px]"
            component="img"
            height="20"
            image={imageUrl}
            alt="green iguana"
          />

          <div>
            <h1 className="font-bold text-[20px] pl-5 pt-1">{title}</h1>
            <h1 className="text-gray-500 text-[15px] pl-5 pt-1">
              {description} • {duration}
            </h1>
          </div>
        </div>
      </Card>
    </div>
  );
}

LessionCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
};

LessionCard.defaultProps = {
  imageUrl:
    "https://media.licdn.com/dms/image/D5622AQEOTHAahyxpfg/feedshare-shrink_800/0/1690448852417?e=2147483647&v=beta&t=yK08dawAbMj79XC8thPDspfk6m0-sv_2ryh1SAjzcKs",
  description: "Lession 1",
  title: "Introduction to React",
  duration: "00:00:00",
};
