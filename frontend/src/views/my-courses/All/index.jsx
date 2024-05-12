import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import CourseCard from "ui-component/cards/CourseCard";
import PropTypes from "prop-types";
import AddFeedback from "./addFeedback";
import { useSelector } from "react-redux";
import { sendFeedback } from "api/feedbackService";
import toast from "react-hot-toast";

const AllCourses = ({ enrollments, handlePageChange }) => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setCourses(enrollments);
  }, [enrollments]);

  const getPageChange = (event, page = 1) => {
    handlePageChange(page);
  };

  const addFeedback = async (values) => {
    const paylaod = {
      added_by: {
        name: user.name,
        email: user.email,
      },
      feedback : values.feedback,
      rating: values.rating,
    }

   try{
    await sendFeedback( paylaod);
    toast.success("Feedback added successfully");
   }catch(error){
    toast.error("Error sending feedback");
     console.error("Error sending feedback:", error);
   }
  }

  return (
    <section className="bg-white rounded-[12px]">
      <section className="lg:max-w-[1440px] max-w-[375px] md:max-w-[688px] mx-auto  px-[20px] py-[40px] hero-content mb-4">
        <h2 className="text-[16px] leading-[24px] md:text-[24px] md:leading-[36px] font-medium pb-[30px]">
          All Enrollements
        </h2>
        <div className="flex gap-[20px] flex-wrap max-w-[1280px] mx-auto justify-center">
          {courses.map((course) => (
            <>
              <AddFeedback
                open={open}
                addFeedback={addFeedback}
                data={course}
                handleClose={handleClose}
              />
              <CourseCard
                refresh={getPageChange}
                handleFeedback={handleOpen}
                id={course?._id}
                key={course.course?.sl}
                title={course.course?.title}
                description={course.course?.description}
                image={course.course?.thumbnail}
                showProgress={false}
                progress={course.progress}
              />
            </>
          ))}
        </div>

        <div className="mt-[40px] flex justify-center">
          <Pagination
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={getPageChange}
          />
        </div>
      </section>
    </section>
  );
};

AllCourses.propTypes = {
  enrollments: PropTypes.array.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default AllCourses;
