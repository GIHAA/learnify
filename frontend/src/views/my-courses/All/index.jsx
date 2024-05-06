import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { getCourses } from "api/courseService";
import CourseCard from "ui-component/cards/CourseCard";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCourses = async (page = 1, searchText = "") => {
    try {
      const response = await getCourses(page, 3, searchText);
      setCourses(response.docs);
      setTotalPages(response.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handlePageChange = (event, page) => {
    fetchCourses(page);
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
            key={course.id}
            title={course.title}
            description={course.description}
            price={course.price}
            image={course.thumbnail}
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

export default AllCourses;
