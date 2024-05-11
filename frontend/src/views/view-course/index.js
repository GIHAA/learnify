import MainCard from "ui-component/cards/MainCard";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { getCourse } from "api/courseService"; // Import the function that fetches completed sessions
import { useParams } from "react-router";
import CourseLanding from "ui-component/CourseLanding";
import CourseSession from "ui-component/CourseSession";
import TakeLessionCard from "ui-component/cards/TakeLessionCard";
import { Link } from "react-router-dom";
import { getEnrollment, updateEnrollment } from "api/enrollment";
import toast from "react-hot-toast";

const ViewCourse = () => {
  const [metaData, setMetaData] = useState(false);
  const [course, setCourse] = useState({});
  const [currentSession, setCurrentSession] = useState({});
  const [sections, setSections] = useState([]);

  //todo this should be enrollment the from that we can get course , enrolled user and enrolled id
  const { id } = useParams();
 

  // Fetch course data and completed session data when the component mounts or when 'id' changes
  useEffect(() => {
    const fetchData = async () => {
      // Get the course data

      const courseData = await getCourse(id);
      setCourse(courseData.data);
      setSections(courseData.data.content);

    };

    fetchData();
  }, [id]);



  return (
    <MainCard courseName={`${course.sl} - ${course.title}`} headerSX={{ fontSize: '50px' }}>
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
              style={{ textDecoration: 'none' }}
            >
              <TakeLessionCard
                disabled={lesson.disabled}
                title={lesson.title}
                description={lesson.description}
                duration={lesson.duration}
                imageUrl={lesson.image}
              />
            </Link>
          ))}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ViewCourse;
