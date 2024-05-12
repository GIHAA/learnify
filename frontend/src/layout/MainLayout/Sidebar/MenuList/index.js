// material-ui
import { Typography } from "@mui/material";

// project imports
import NavGroup from "./NavGroup";
import menuItem from "menu-items";
import { CheckPermission } from "utils/checkPermisson";
import { useSelector } from "react-redux";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {

  const { user } = useSelector((state) => state.user);

  const navItems = menuItem.items.map((item) => {
   
    switch (item.type) {
      case "group":
        return (
          // <CheckPermission
          //   component={<NavGroup key={item.id} item={item} />}
          //   role="ADMIN"
          // />
          <NavGroup key={item.id} item={item} />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
