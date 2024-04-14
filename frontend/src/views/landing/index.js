import { Button } from "@mui/material";

const Landing = () => {
    return (
      <div className="text-[30px] margin-[10px]">
        landing page
        <Button variant="contained" href="/pages/register/register3" color="primary">Sign in</Button> {/* Changed 'to' to 'href' */}
        <Button variant="contained" href="/pages/login/login3" color="primary">Sign up</Button>
        <Button variant="contained" href="/admin" color="primary">Admin</Button>
      </div>
    );
  };
  

export default Landing;
