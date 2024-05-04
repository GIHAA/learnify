import Landing from "views/landing";
import CusLayout from "layout/CusLayout";
import ShopPage from "views/shop-page";

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
    // {
    //   path: "*",
    //   element: <div>404</div>,
    // },
  ],

};

export default UserRoutes;
