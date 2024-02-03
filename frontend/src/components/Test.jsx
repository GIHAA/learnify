import { useState , useEffect  } from "react";
import loginbackground from "../assets/loginbackground.png";
import io from 'socket.io-client';


const Test = () => {
  const [email, setEmail] = useState("");

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    // Listen for incoming notifications
    socket.on('notification', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    return () => {
      // Disconnect socket when the component unmounts
      socket.disconnect();
    };
  }, []);

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
            
              <div>
      <h1>Notification App</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  
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

export default Test;
