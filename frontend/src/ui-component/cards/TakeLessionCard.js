import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import {  Avatar } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { CheckBoxRounded } from "@mui/icons-material";

export default function TakeLessionCard({
  index,
  title,
  description,
  disabled,
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
        }}Add Course
      >
        <div className="p-[10px] flex">
          <div className="w-[50px] h-[50px] m-2.5 rounded-[7px] absolute top-1 left-0 flex justify-center">
            {/* <CircularWithValueLabel value={100} /> */}
          </div>
          <Avatar variant="rounded" className={`w-[50px] mt-1 h-[50px] `}>
            <AssignmentIcon />
          </Avatar>

          <div>
            <h1 className="font-bold text-[18px] pl-5 pt-1">{index === 0 ? "Introduction" : `Chapter ${index}`}</h1>
            <h1 className="text-gray-500 text-[15px] pl-5 pt-1">
              {description} • {duration}
            </h1>
          </div>
          {disabled && (
            <div className="absolute top-1 right-1">
              <CheckBoxRounded className="text-gray-500" />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

TakeLessionCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  index: PropTypes.number,
};

TakeLessionCard.defaultProps = {
  imageUrl:
    "https://media.licdn.com/dms/image/D5622AQEOTHAahyxpfg/feedshare-shrink_800/0/1690448852417?e=2147483647&v=beta&t=yK08dawAbMj79XC8thPDspfk6m0-sv_2ryh1SAjzcKs",
  description: "Lession 1",
  title: "Introduction to React",
  duration: "00:00:00",
};
