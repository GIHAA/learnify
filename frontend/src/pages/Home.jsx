import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div>
      <h1>Home Page {user?.email}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;