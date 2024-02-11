import React from "react";
import { useSelector } from "react-redux";
import bg from "../assets/Image.png";
import { Link } from "react-router-dom";
import Landing from "../components/Landing";
import { logout } from "../services/auth/authSlice";
import Header from "../components/common/Header";

const Home = () => {
  // const { loggedInUser } = useSelector((state) => state.auth);
  // const userdata = loggedInUser.user;

  const { user: userdata } = useSelector((state) => state.auth.loggedInUser);

  return (
    <>
      <Header />
      <div
        style={{ backgroundImage: `url(${bg})` }}
        name="home"
        className="snap-start bg-cover bg-center h-screen w-full"
      >
        <div className="max-w-[1200px] mx-auto px-8 flex flex-col justify-center h-full">
          <p className="text-2xl font-po pl-2 text-secondary">
            HI {userdata ? userdata.name : ""}, Welcome to
          </p>
          <h1 className="text-4xl sm:text-8xl font-bold text-secondary">
            AF project
          </h1>
          <h2 className="font- pt-4 pl-2 text-4xl sm:text-2xl w-[500px] font-bold text-text">
          AF project! AF project! AF project! AF project!
          </h2>
          <div className="pt-6">
            {userdata ? (
              <button onClick={() => {logout()}} className="rounded-full bg-primary text-white group border-2  px-6 py-3 my-2 flex items-center hover:bg-[#E38E00] hover:border-[#E38E00]">
                logged in  
              </button>
            ) : (
              <>
                <button className="rounded-full bg-primary text-white group border-2  px-6 py-3 my-2 flex items-center hover:bg-[#E38E00] hover:border-[#E38E00]">
                  <Link to="register" smooth={true} duration={500}>
                    REGISTER NOW
                  </Link>
                </button>
              </>
            )}

{ userdata.is_verified ? (
              <button onClick={() => {logout()}} className="rounded-full bg-primary text-white group border-2  px-6 py-3 my-2 flex items-center hover:bg-[#E38E00] hover:border-[#E38E00]">
                is_verified 
              </button>
            ) : (
              <>
                <button className="rounded-full bg-primary text-white group border-2  px-6 py-3 my-2 flex items-center hover:bg-[#E38E00] hover:border-[#E38E00]">
                  <Link to="register" smooth={true} duration={500}>
                    not is_verified please check mail
                  </Link>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <Landing />
    </>
  );
};

export default Home;
