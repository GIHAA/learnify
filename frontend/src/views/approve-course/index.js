import styled from "@emotion/styled";
import SearchSection from "layout/MainLayout/Header/SearchSection";
import MainCard from "ui-component/cards/MainCard";
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getCourses, removeCourse, updateCourse } from "api/courseService";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const MainCardStyle = styled(MainCard)(() => ({
  "& .MuiCardHeader-root": {
    paddingLeft: "38px",
  },
}));

const ApproveCoursePage = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");

  const fetchCourses = async (page = 1, searchText = "") => {
    try {
      const response = await getCourses(page, 4, searchText);
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

  const handleView = (courseId) => {
    navigate(`/admin/approve-course/view-course/${courseId}`);
  }

  const handleApprove = async (courseId) => {
    await updateCourse(courseId, { is_approved: true });
    fetchCourses(currentPage);
    // Handle approve action
  };

  const handleRemove = async (courseId) => {
    toast((t) => (
      <div className=" bg-white rounded  flex">
        <p className="mb-2">Are you sure you want to delete this course?</p>
        <button 
          className="flex ml-2 px-4 pt-3 bg-red-500 text-white rounded hover:bg-red-600 "
          onClick={() => {
            toast.dismiss(t.id);
            confirmDelete(courseId);
          }}
        >
          Confirm
        </button>
      </div>
    ));
  };
  
  const confirmDelete = async (courseId) => {
    console.log("View course with ID:", courseId);
    toast.success("Course deleted successfully");
    await removeCourse(courseId);
    fetchCourses(currentPage);
  };
  
  return (
    <MainCardStyle
      title="Approve Courses"
    >
      <SearchSection setSearchText={setSearchText}/>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell sx={{ maxWidth: "200px" }}>Description</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell sx={{ maxWidth: "200px" }}>{course.description}</TableCell>
                <TableCell>{course.rating}</TableCell>
                <TableCell>{course.price}</TableCell>
                <TableCell>
                  <span style={{ color: course.is_approved ? 'green' : 'orange' }}>
                    {course.is_approved ? "Approved" : "Pending"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleView(course._id)}>View</Button>
                  <span style={{ margin: '0 5px' }} />
                  <Button variant="outlined" onClick={() => handleApprove(course._id)}>Approve</Button>
                  <span style={{ margin: '0 5px' }} />
                  <Button variant="outlined" onClick={() => handleRemove(course._id)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default ApproveCoursePage;
