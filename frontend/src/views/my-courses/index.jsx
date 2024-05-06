import AllCourses from "./All";
import CompletedCourses from "./Completed";
import OngoingCourses from "./Incompleted";

const MyCourse = () => {
  return (
    <div className="flex flex-col">
     <h1 className=" text-[32px] leading-[40px] md:text-[40px] md:leading-[46px] font-bold mb-[30px]">My Courses</h1>
     <AllCourses/>
     <OngoingCourses/>
     <CompletedCourses/>
    </div>
  );
};

export default MyCourse;