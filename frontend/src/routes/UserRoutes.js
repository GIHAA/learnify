import Landing from "views/landing";
import CusLayout from "layout/CusLayout";
import ShopPage from "views/shop-page";
import PaymentGateway from "views/payment-gateway-page";
import CourseInfo from "views/course-info"

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyCourse from "views/my-courses";
import PageNotFound from "views/pages/404";

const stripePromise = loadStripe('pk_test_51MCtGXBSWDySeSWsiNHJCw9I1wfXLbNvkP1lSH0Wrox0E3UPHSLazZQfjQUIYrKdSOFZz34tOMBLbvx4uXov6Giy00hzE0Iz1a');

// ==============================|| MAIN ROUTING ||============================== //

const UserRoutes = {
  path: "",
  element: <CusLayout />,
  children: [
    {
      path: "",
      element: <Landing />,
    },
    {
      path: "shop",
      element: <ShopPage />,
    },
    {
      path: "my-courses",
      element: <MyCourse />,
    },
    {
      path: "course-info",
      element: <CourseInfo />,
    },
    {
      path: "test",
      element: (
        <Elements stripe={stripePromise}>
          <PaymentGateway />
        </Elements>
      ),
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ],
};

export default UserRoutes;
