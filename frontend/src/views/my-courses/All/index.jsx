import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { getCourses } from "api/courseService";
import CourseCard from "ui-component/cards/CourseCard";
import PropTypes from 'prop-types';

const AllCourses = ({enrollments}) => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    // fetchCourses();
    console.log("en" , enrollments);
    setCourses(enrollments);
  }, [enrollments]);

  const handlePageChange = (event, page) => {
    // fetchCourses(page);
  };

  return (
    <section className="bg-white rounded-[12px]">
      <section className="lg:max-w-[1440px] max-w-[375px] md:max-w-[688px] mx-auto  px-[20px] py-[40px] hero-content mb-4">
        <h2 className="text-[16px] leading-[24px] md:text-[24px] md:leading-[36px] font-medium pb-[30px]">
          All Enrollements
        </h2>
        <div className="flex gap-[20px] flex-wrap max-w-[1280px] mx-auto justify-center">
        {courses.map((course) => (

          <CourseCard
            id={course?._id}
            key={course.course?.sl}
            title={course.course?.title}
            description={course.course?.description}
            price={course.course?.price}
            image={course.course?.thumbnail}
            showProgress={false}
            progress={course.progress}
          />
        ))}
        </div>
       

        <div className="mt-[40px] flex justify-center">
          <Pagination
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </section>
    </section>
  );
};

AllCourses.propTypes = {
  enrollments: PropTypes.array.isRequired
}


export default AllCourses;
