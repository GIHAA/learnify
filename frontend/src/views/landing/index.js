// import { Button } from "@mui/material";
// import { Link } from "react-router-dom";
import Benefit from "./Benefits";
import FAQ from "./FAQ";
import Hero from "./Hero";
import OurCourses from "./OurCourses";
import TestimonySwiper from "./Testimonials";


const Landing = () => {
  return (
    <div className="  rounded-[12px]">
      {/* landing page

        <Button component={Link} to="/pages/register/register3" variant="contained" color="primary">Sign in</Button>


        <Button component={Link} to="/pages/login/login3" variant="contained" color="primary">Sign up</Button>


        <Button component={Link} to="/admin" variant="contained" color="primary">Admin</Button> */}
        <Hero/>
        <Benefit/>
        <OurCourses/>
        <TestimonySwiper/>
        <FAQ/>
        

    </div>
  );
};

export default Landing;
