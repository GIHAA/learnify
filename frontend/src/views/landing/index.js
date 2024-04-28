import { Button } from "@mui/material";
import FAQ from "./FAQ";
import ResponsiveAppBar from "layout/Header/ResponsiveAppBar";
import TestimonySwiper from "./Testimonials";

const Landing = () => {
    return (
      <div className="text-[30px] margin-[10px]">
        
      <ResponsiveAppBar/>
        landing page
        <Button variant="contained" href="/pages/register/register3" color="primary">Sign in</Button> {/* Changed 'to' to 'href' */}
        <Button variant="contained" href="/pages/login/login3" color="primary">Sign up</Button>
        <Button variant="contained" href="/admin" color="primary">Admin</Button>
        <TestimonySwiper/>
        <FAQ/>
      </div>
    
    );
  };
  

export default Landing;
