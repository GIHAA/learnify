import { useEffect , useState } from "react";
import AllCourses from "./All";
import { getEnrollment, getUserEnrollments } from "api/enrollment";
import { useSelector } from "react-redux";
import { getMyCourses } from "api/courseService";
// import CompletedCourses from "./Completed";
// import OngoingCourses from "./Incompleted";

const MyCourse = () => {

  const user = useSelector((state) => state.user);
  const [enrollments, setEnrollments] = useState([]);

  
  const fetchEnrollments = async () => {
    try {
      const response = await getUserEnrollments(user.user._id, 1, 10);
      const enrollments = response.docs;

      console.log(enrollments);
    
      let ids = response.docs.map((doc) => doc.courseId);

      const course = await getMyCourses(ids);

      const finalpayload =  enrollments.map((enrollment, index) => {
        const completedsessions = parseInt(enrollment.completedSections);
        const total = parseInt(course[index]?.content.length);
        console.log(completedsessions);
        console.log(total);
        return {
          ...enrollment,
          course: course[index],
          progress: Math.round((completedsessions / total) * 100),
        }
      })
      setEnrollments(finalpayload);
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
     <AllCourses enrollments={enrollments}/>
     {/* <OngoingCourses/>
     <CompletedCourses/> */}
    </div>
  );
};

export default MyCourse;