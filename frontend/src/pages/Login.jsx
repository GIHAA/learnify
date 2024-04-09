import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <Link to="/admin">Admin</Link>
      <Link to="/home">Home</Link>
    </div>
  );
};

export default Login;
