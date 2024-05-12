import PropTypes from "prop-types";
import { Button, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LinearProgressWithLabel } from "layout/CusLayout/Sidebar/MenuCard";
import { removeEnrollment } from "api/enrollment";
import toast from "react-hot-toast";

const CourseCard = ({
  image,
  title,
  description,
  rating,
  price,
  handleFeedback,
  progress,
  refresh,
  id,
  showUnenroll = false,
  showContinue = false,
}) => {
  const navigate = useNavigate();

  const handleUnenroll = (enrollId) => {
    toast((t) => (
      <div className=" bg-white rounded  flex">
        <p className="mb-2">Are you sure you want to Unenroll this course?</p>
        <button
          className="flex ml-2 px-4 pt-3 bg-red-500 text-white rounded hover:bg-red-600 "
          onClick={() => {
            toast.dismiss(t.id);
            confirmDelete(enrollId);
          }}
        >
          Confirm
        </button>
      </div>
    ));
  };

  const confirmDelete = async (enrollId) => {
    toast.success("Course deleted successfully");
    await removeEnrollment(enrollId);
    refresh();
  };

  const handleRate = (courseId) => {
    handleFeedback(courseId);
  };

  return (
    <div className="max-w-[334px] rounded-[14px] shadow-md flex flex-col justify-between">
      <div>
        <CardMedia
          component="img"
          image={image}
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
          <div className="text-[16px] leading-[25px] overflow-y-scroll max-h-[100px]">
            {description}
          </div>
        </div>
      </div>
      <div>
        {progress ? (
          <div className="mx-3 mb-3">
            <LinearProgressWithLabel value={progress} />
          </div>
        ) : (
          <></>
        )}
        <div className="px-3 mb-3">
          <div className="flex mb-3">
            {handleFeedback ? (
              <Button
                variant="outlined"
                onClick={() => {
                  handleRate(id);
                }}
                className="w-full mr-1 rounded-[6px]"
              >
                Rate
              </Button>
            ) : (
              <> </>
            )}
            {showUnenroll ? (
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  handleUnenroll(id);
                }}
                className="w-full ml-1 rounded-[6px]"
              >
                Unenroll
              </Button>
            ) : (
              <> </>
            )}
          </div>
          {showContinue ? (
            <Button
              variant="contained"
              onClick={() => {
                navigate(`/take-course/${id}`);
              }}
              className="w-full rounded-[6px]"
            >
              Continue
            </Button>
          ) : (
            <> </>
          )}
        </div>
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
  refresh: PropTypes.func.isRequired,
  handleFeedback: PropTypes.func.isRequired,
  showUnenroll: PropTypes.bool,
  showContinue: PropTypes.bool,
};

export default CourseCard;
