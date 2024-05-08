import MainCard from "ui-component/cards/MainCard";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { getCourse } from "api/courseService";
import { useParams } from "react-router";
import CourseLanding from "ui-component/CourseLanding";
import CourseSession from "ui-component/CourseSession";
import TakeLessionCard from "ui-component/cards/TakeLessionCard";
import { Link } from "react-router-dom";

const TakeCourse = () => {
  const [metaData, setMetaData] = useState();
  const [course, setCourse] = useState({});
  const [currentSession, setCurrentSession] = useState({});
  const [sections, setSections] = useState([{}]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCourse(id);
      setCourse(data.data);
      setSections(data.data.content);
      setCurrentSession(data.data.content[2]);
    };

    fetchData();
  }, [id]);

  return (
    <MainCard courseName={`${course.sl} - ${course.title}`} headerSX={{ fontSize : '50px'}} >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {!metaData && (
            <CourseLanding
              thumbnail={course?.thumbnail}
              description={course?.description}
              handleStart={() => setMetaData(true)}
            />
          )}
          {metaData && (
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
            <Link key={index} onClick={() => {
              setCurrentSession(lesson)
              setMetaData(true)
            }}>
              <TakeLessionCard
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

export default TakeCourse;
