import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="text-[30px] margin-[10px]">
      landing page
      <Link to="/pages/register/register3">
        <Button variant="contained" color="primary">Sign in</Button>
      </Link>
      <Link to="/pages/login/login3">
        <Button variant="contained" color="primary">Sign up</Button>
      </Link>
      <Link to="/admin">
        <Button variant="contained" color="primary">Admin</Button>
      </Link>
    </div>
  );
};

export default Landing;
