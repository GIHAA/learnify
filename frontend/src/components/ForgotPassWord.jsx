import { useState } from "react";
import loginbackground from "../assets/loginbackground.png";
import { Link } from "react-router-dom";
import authService from "../services/auth/authService";
import { toast } from "react-toastify";

const ForgotPassWord = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      const res = await authService.forgetPassword({ email });
      toast.success(res.message);
      setMessage(res.message);
    } catch (error) {
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
      
      console.error(message);
      toast.error(message);
    }
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${loginbackground})` }}
        className="min-h-screen bg-cover  flex flex-col justify-center sm:py-12"
      >
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-white drop-shadow-2xl shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <h1 className="font-bold text-center text-2xl mb-5 uppercase">
                Recover Account
              </h1>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                E-mail
              </label>
              <label className="font-semibold text-sm text-green-600 pb-1 block">
                {message}
              </label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <button
                onClick={onSubmit}
                type="button"
                className="h-[45px] bg-primary rounded-full transition duration-200  hover:bg-[#E38E00] focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5  text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Reset password</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>

              <p className="text-[14px] mt-[15px] text-gray-500">
                Already have an account?
                <Link to="/" className="ml-1">
                  <span className="text-secondary font-[20px]">
                    Login now
                  </span>
                </Link>
              </p>
            </div>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassWord;
