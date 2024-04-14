import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="text-[30px] margin-[10px]">
      landing page

        <Button component={Link} to="/pages/register/register3" variant="contained" color="primary">Sign in</Button>


        <Button component={Link} to="/pages/login/login3" variant="contained" color="primary">Sign up</Button>


        <Button component={Link} to="/admin" variant="contained" color="primary">Admin</Button>

    </div>
  );
};

export default Landing;
