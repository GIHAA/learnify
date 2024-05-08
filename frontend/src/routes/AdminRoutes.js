import MainLayout from "layout/MainLayout";
import DashboardDefault from "views/dashboard/Default";
import CouserManagement from "views/course-management";
import ApproveCoursePage from "views/approve-course";
import UserManagement from "views/user-management";
import AddCourse from "views/add-course";


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
      path: "approve-course",
      element: <ApproveCoursePage />,
    },
    {
      path: "user-management",
      element: <UserManagement />,
    },{
      path: "course-management/add",
      element: <AddCourse />,
    },
    {
      path: "*",
      element: <div>404</div>,
    },
  ],
};

export default AdminRoutes;
