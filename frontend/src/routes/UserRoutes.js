import Landing from "views/landing";

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
