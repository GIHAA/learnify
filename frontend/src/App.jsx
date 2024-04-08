import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import Admin from './pages/Admin';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './pages/SignIn';
//import SignIn from './pages/SignIn';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute component={Admin} />,
  },
  {
    path: '/home',
    element: <ProtectedRoute component={Home} />,
  },
  {
    path: '*',
    element: <div>404</div>,
  }
]);

const App = () => {
  return (
    <AuthProvider >
     <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;

