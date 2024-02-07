import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../services/auth/authSlice";
import registrationbackground from "../assets/registrationbackground.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const [image, setImage] = useState();
  const [disImage, setDisImage] = useState();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
    image: "",
  });

  const { name, email, password, password2, phone } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const isNumberAndTenDigit = (str) => /^\d{10}$/.test(str);

  const addImage = async (e) => {
    const imageTarget = e.target.files[0];
    if (imageTarget) {
      setImage(imageTarget);
      displayImage(imageTarget);
    }
  };

  const displayImage = (selectedImage) => {
    const url = URL.createObjectURL(selectedImage);
    setDisImage(url);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const uploadedImage = await uploadImageToFirebase();
    console.log(uploadedImage);

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
        phone,
        image,
        role: "USER",
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(email)) {
        if (isNumberAndTenDigit(phone)) {
          dispatch(register(userData));
        } else toast.error("Phone number should be 10 digit number");
      } else {
        toast.error("The email address is invalid.");
      }
    }
  };

  const uploadImageToFirebase = () => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("images", image);

      axios
        .post("http://localhost:8000/appimage/im/", formData)
        .then((res) => {
          console.log("Upload successful:", res.data);
          const downloadURL = res.data.DownloadURL;
          resolve(downloadURL);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          reject(error);
        });
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <div
        style={{ backgroundImage: `url(${registrationbackground})` }}
        className="min-h-screen bg-cover bg-gray-100 flex flex-col justify-center"
      >
        <div className="p-10 xs:p-0 mx-auto">
          <div className="bg-white drop-shadow-2xl shadow mx-auto rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <h1 className="font-bold text-center text-2xl mb-5">REGISTER</h1>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
            
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />


              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                value={phone}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Password
              </label>
              <input
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Confirm Password
              </label>
              <input
                id="password2"
                name="password2"
                value={password2}
                onChange={onChange}
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Add Image
              </label>
              <input
                className="w-full h-full py-5 pb-8 file:rounded-full file:h-[45px] file:w-[130px] file:bg-secondary file:text-white "
                type="file"
                name="images"
                onChange={addImage}
              />
              {disImage && <img src={disImage} alt="image" height="160px" width="165px" />}
              <button
                onClick={onSubmit}
                type="button"
                className="h-[45px] bg-primary rounded-full transition duration-200  hover:bg-[#E38E00] focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5  text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Register</span>
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
                  <span className="text-secondary font-[20px]">Login now</span>
                </Link>
              </p>
            </div>
            <div className="py-5">
              <div className="text-center sm:text-right  whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-bottom	"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;

