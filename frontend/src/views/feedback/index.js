import styled from "@emotion/styled";
import SearchSection from "layout/MainLayout/Header/SearchSection";
import MainCard from "ui-component/cards/MainCard";
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getFeedbacks } from "api/feedbackService";
import { useNavigate } from 'react-router-dom';

const MainCardStyle = styled(MainCard)(() => ({
  "& .MuiCardHeader-root": {
    paddingLeft: "38px",
  },
}));

const FeedbacksPage = () => {
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");

  const fetchFeedback = async (page = 1, searchText = "") => {
    try {
      const response = await getFeedbacks(page, 4, searchText);
      console.log(response);
      setFeedback(response.data);
      setTotalPages(response.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  useEffect(() => {
    fetchFeedback(1, searchText);
  }, [searchText]);

  const handlePageChange = (event, page) => {
    fetchFeedback(page);
  };


  return (
    <MainCardStyle
      title="Feedback Management"
      btxText="Add New Course"
    >
      <SearchSection setSearchText={setSearchText}/>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell sx={{ maxWidth: "200px" }}>Feedback</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Sentiment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedback.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.course}</TableCell>
                <TableCell sx={{ maxWidth: "200px" }}>{course.feedback}</TableCell>
                <TableCell>{course.rating}</TableCell>
                <TableCell>
                  <span style={{ color: course.is_approved ? 'green' : 'orange' }}>
                    {course.is_approved ? "Approved" : "Pending"}
                  </span>
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

export default FeedbacksPage;
