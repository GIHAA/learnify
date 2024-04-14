import { lazy } from "react";

// // project imports
// //import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";


const Landing = Loadable(lazy(() => import("views/landing")));

// ==============================|| MAIN ROUTING ||============================== //

const UserRoutes = {
  path: "/",
  element: <Landing />,
  children: [
    // {
    //   path: "sign-in",
    //   element: <AuthLogin3 />,
    // },
    // {
    //   path: "*",
    //   element: <div>404</div>,
    // },
  ],
};

export default UserRoutes;
