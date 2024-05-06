import styled from "@emotion/styled";
import Grid from "@mui/material/Grid"; 
import SearchSection from "layout/MainLayout/Header/SearchSection";
import MainCard from "ui-component/cards/MainCard";
import BasicCard from "ui-component/cards/BasicCard";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getCourses } from "api/courseService";

const MainCardStyle = styled(MainCard)(() => ({
  "& .MuiCardHeader-root": {
    paddingLeft: "38px",
  },
}));

const CourseManagementPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");

  const onClick = () => {
    navigate("/admin/course-management/add");
  };

  const fetchCourses = async (page = 1 , searchText = "") => {
    try {
      const response = await getCourses(page, 4, searchText );
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

  useEffect(() => {
    fetchCourses(1, searchText);
  }, [searchText]);

  const handlePageChange = (event, page) => {
    fetchCourses(page);
  };


  return (
    <MainCardStyle
      title="Course Management"
      onClick={onClick}
      buttonText={"Add Course"}
    >
      <SearchSection setSearchText={setSearchText}/>

      <Grid container spacing={2} className="mt-[10px]">
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
            <BasicCard
              title={course.title}
              description={course.description}
              imageUrl={course.thumbnail}
              rating={course.rating}
              price={course.price}
            />
          </Grid>
        ))}
      </Grid>
      <div className="mt-[40px]">
        <Pagination
          count={totalPages}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </MainCardStyle>
  );
};

export default CourseManagementPage;
