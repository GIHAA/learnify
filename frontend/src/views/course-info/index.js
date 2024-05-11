import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse } from "api/courseService";
import PayementGateway from "views/payment-gateway-page";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51MCtGXBSWDySeSWsiNHJCw9I1wfXLbNvkP1lSH0Wrox0E3UPHSLazZQfjQUIYrKdSOFZz34tOMBLbvx4uXov6Giy00hzE0Iz1a"
);

const CourseInfo = () => {
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [payment, setPayment] = useState(false);
  const user = useSelector((state) => state.user)


  const fetchCourse = async (id) => {
    try {
      const response = await getCourse(id);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  useEffect(() => {
    fetchCourse(id);
  }, [id]);

  console.log(course)


  return (
    <>
      <div className="p-4">
        <div>
          <h3 className="text-3xl">{course.title}</h3>
          <div className="flex gap-8 py-4">
            <p className="text-[#673ab7]">Steven Armos</p>
            <p>{course.rating} (23 ratings)</p>
          </div>
        </div>

        <div className="flex gap-4">
          <img src={course.thumbnail} className=" w-2/3" />
          {payment ? (
            <div className="w-1/3 bg-white rounded shadow">
              <div className="flex flex-col gap-5 justify-center items-center mt-20">
                <div className="text-4xl">US$ {course.price}</div>
                <div className="flex flex-col w-full gap-4">
                  <button onClick={() => {setPayment(!payment)}} className="w-[80%] bg-[#673ab7] text-white mx-auto p-2 rounded-lg">
                    Buy
                  </button>
                  <button className="w-[80%] outline outline-1 outline-[#673ab7] mx-auto p-2 rounded-lg text-[#673ab7]">
                    Wishlist
                  </button>
                </div>
              </div>
              <div className="ml-10 mt-10 flex flex-col gap-2">
                <p>{course.content ? course.content.length : "0 "} sections</p>
                <p>20 lectures</p>
                <p>English</p>
              </div>
            </div>
          ) : (
            <div className="w-1/3 bg-white rounded shadow flex justify-center items-center ">
              <Elements stripe={stripePromise}>
                <PayementGateway 
                course_id={course._id}
                user_id={user?.user?._id}
                price={course?.price}
                />
              </Elements>
            </div>
          )}
        </div>

        <div className="mt-10">
          <h3 className="font-bold text-lg">About Course</h3>
          <p className="mt-4 text-gray-500">{course.description}</p>
        </div>
      </div>
    </>
  );
};

export default CourseInfo;
