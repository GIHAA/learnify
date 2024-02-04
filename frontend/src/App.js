import { BrowserRouter  as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassWord from "./components/ForgotPassWord";
import Home from "./screen/Home";
import ResetPassword from "./components/ResetPassword";
import NotFound from "./components/common/NotFound"; // Import a NotFound component or create one
import Test from "./components/Test";
import Navigates from './components/Navigate'
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="af-project" element={<Login />} />
            <Route path="forgot" element={<ForgotPassWord />} />
            <Route path="register" element={<Register />} />
            <Route path="Home" element={<Home />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="test" element={<Test/>} />
            <Route path="*" element={<Navigates/>} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
