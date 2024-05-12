import PropTypes from "prop-types";

import { useTheme } from "@mui/material/styles";
import {  Box, ButtonBase } from "@mui/material";
import LogoSection from "../LogoSection";
import { Link } from "react-router-dom";
import ProfileSection from "layout/MainLayout/Header/ProfileSection";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
        className='lg:flex lg:justify-between flex-row w-[100%] '
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
        </ButtonBase>
        <div className="hidden lg:flex lg:justify-center lg:items-center mr-6">
          {/* <DropDown/> */}
          <Link to="/shop" className="mx-3 text-[20px]">Courses</Link>
          <Link to="/my-courses" className="mx-3 text-[20px]">My Learning</Link>
        </div>
      </Box>

      {/* header search */}
      {/* <SearchSection /> */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
