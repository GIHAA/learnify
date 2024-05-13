import MainCard from "ui-component/cards/MainCard";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { getCourse, updateCourse } from "api/courseService"; // Import the function that fetches completed sessions
import { useParams } from "react-router";
import CourseLanding from "ui-component/CourseLanding";
import CourseSession from "ui-component/CourseSession";
import TakeLessionCard from "ui-component/cards/TakeLessionCard";
import { Link } from "react-router-dom";
import { getEnrollment, updateEnrollment } from "api/enrollment";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

const ViewCourse = () => {
  const [metaData, setMetaData] = useState(false);
  const [course, setCourse] = useState({});
  const [currentSession, setCurrentSession] = useState({});
  const [sections, setSections] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      // Get the course data

      const courseData = await getCourse(id);
      setCourse(courseData.data);
      setSections(courseData.data.content);
    };

    fetchData();
  }, [id]);


  const handleApprove = async () => {
    try {
      await updateCourse(id, { is_approved: true });
      toast.success("Course approved successfully");
    } catch (error) {
      console.error("Error approving course:", error);
      toast.error("Error approving course");
    }
  };

  return (
    <MainCard
      courseName={`${course.sl} - ${course.title}`}
      headerSX={{ fontSize: "50px" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {!metaData ? (
            <CourseLanding
              thumbnail={course?.thumbnail}
              description={course?.description}
              handleStart={() => setMetaData(true)}
            />
          ) : (
            <CourseSession
              title={currentSession.title}
              type={currentSession.type}
              video={currentSession.video}
              photo={currentSession.photo}
              image={currentSession.image}
              description={currentSession.description}
            />
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {sections.map((lesson, index) => (
            <Link
              key={index}
              onClick={() => {
                setCurrentSession(lesson);
                setMetaData(true);
              }}
              to="#"
              style={{ textDecoration: "none" }}
            >
              <TakeLessionCard
                index={index}
                disabled={lesson.disabled}
                title={lesson.title}
                description={lesson.title}
                duration={lesson.duration}
                imageUrl={lesson.image}
              />
            </Link>
          ))}
          <div className="px-3">
            <Button
              onClick={() => {
                handleApprove();
              }}
              className="w-full"
              variant="contained"
              color="primary"
            >
              Approve
            </Button>
          </div>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ViewCourse;
