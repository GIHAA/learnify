import { useEffect , useState } from "react";
import AllCourses from "./All";
import { getEnrollment, getUserEnrollments } from "api/enrollment";
import { useSelector } from "react-redux";
import { getMyCourses } from "api/courseService";


const MyCourse = () => {

  const user = useSelector((state) => state.user);
  const [enrollments, setEnrollments] = useState([]);

  
  const fetchEnrollments = async () => {
    try {
      const response = await getUserEnrollments(user.user._id, 1, 10);
      const enrollments = response.docs;
  
      // Get the IDs of courses that the user is enrolled in
      let ids = enrollments.map((enrollment) => enrollment.courseId);
  
      // Fetch all courses that the user is enrolled in
      const coursesResponse = await getMyCourses(ids);
  
      // Convert courses array to an object for easy access
      const coursesById = coursesResponse.reduce((acc, course) => {
        acc[course._id] = course;
        return acc;
      }, {});
  
      // Combine course and enrollment data
      const finalPayload = enrollments.map((enrollment) => {
        const course = coursesById[enrollment.courseId];
        const completedSessions = parseInt(enrollment.completedSections, 10);
        const total = parseInt(course?.content.length, 10);
        return {
          ...enrollment,
          course: course,
          progress: total ? Math.round((completedSessions / total) * 100) : 0, 
        }
      });
  
      setEnrollments(finalPayload);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  }
  
  const handlePageChange = async (page) => {
    try {
      const response = await getUserEnrollments(user.user._id, page, 10);
      const enrollments = response.docs;
  
      // Get the IDs of courses that the user is enrolled in
      let ids = enrollments.map((enrollment) => enrollment.courseId);
  
      // Fetch all courses that the user is enrolled in
      const coursesResponse = await getMyCourses(ids);
  
      // Convert courses array to an object for easy access
      const coursesById = coursesResponse.reduce((acc, course) => {
        acc[course._id] = course;
        return acc;
      }, {});
  
      // Combine course and enrollment data
      const finalPayload = enrollments.map((enrollment) => {
        const course = coursesById[enrollment.courseId];
        const completedSessions = parseInt(enrollment.completedSections, 10);
        const total = parseInt(course?.content.length, 10);
        return {
          ...enrollment,
          course: course,
          progress: total ? Math.round((completedSessions / total) * 100) : 0, 
        }
      });
  
      setEnrollments(finalPayload);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  }

  useEffect( ()=> {
    fetchEnrollments();
  }, [])

  return (
    <div className="flex flex-col">
     <h1 className=" text-[32px] leading-[40px] md:text-[40px] md:leading-[46px] font-bold mb-[30px]">My Courses</h1>
     <AllCourses handlePageChange={handlePageChange} enrollments={enrollments}/>
    </div>
  );
};

export default MyCourse;