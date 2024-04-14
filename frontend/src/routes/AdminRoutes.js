import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
//import { element } from "prop-types";
//import { element } from "prop-types";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/dashboard/Default"))
);

// utilities routing
// const UtilsTypography = Loadable(
//   lazy(() => import("views/utilities/Typography"))
// );
// const UtilsColor = Loadable(lazy(() => import("views/utilities/Color")));
// const UtilsShadow = Loadable(lazy(() => import("views/utilities/Shadow")));
// const UtilsMaterialIcons = Loadable(
//   lazy(() => import("views/utilities/MaterialIcons"))
// );
// const UtilsTablerIcons = Loadable(
//   lazy(() => import("views/utilities/TablerIcons"))
// );

// sample page routing
//const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const CouserManagement = Loadable(
  lazy(() => import("views/course-management"))
);
const UserManagement = Loadable(lazy(() => import("views/user-management")));
const AuthLogin3 = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/Login3"))
);


// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
  path: "/admin",
  element: <MainLayout />,
  children: [
    {
      path: "dashboard",
      element: <DashboardDefault />
    },
    {
      path: "course-management",
      element: <CouserManagement />,
    },
    {
      path: "user-management",
      element: <UserManagement />,
    },
    {
      path: "sign-in",
      element: <AuthLogin3 />,
    },
    {
      path: "*",
      element: <div>404</div>,
    },
  ],
};

export default AdminRoutes;
