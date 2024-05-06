import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import SearchSection from "layout/MainLayout/Header/SearchSection";

import MainCard from "ui-component/cards/MainCard";
import ShopCourseCard from "ui-component/cards/ShopCourseCard";
import { useEffect, useState } from "react";
import { getAllCourses } from "api/courseService";

const MainCardStyle = styled(MainCard)(() => ({
  "& .MuiCardHeader-root": {
    paddingLeft: "38px",
  },
}));

const CourseManagementPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchCourses = async (searchText = "") => {
    try {
      const response = await getAllCourses(searchText);
      setCourses(response.docs);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchCourses(searchText);
  }, [searchText]);


  return (
    <MainCardStyle title="Shop">
      <SearchSection setSearchText={setSearchText} />

      <Grid container spacing={2} className="mt-[10px]">
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
            <ShopCourseCard
              id={course.id}
              title={course.title}
              description={course.description}
              imageUrl={course.thumbnail}
              rating={course.rating}
              price={course.price}
            />
          </Grid>
        ))}
      </Grid>
    </MainCardStyle>
  );
};

export default CourseManagementPage;
