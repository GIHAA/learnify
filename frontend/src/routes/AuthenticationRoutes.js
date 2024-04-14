import MinimalLayout from 'layout/MinimalLayout';
import AuthLogins from 'views/pages/authentication/authentication3/Login3';
import AuthRegister3 from 'views/pages/authentication/authentication3/Register3';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/login/login3',
      element: <AuthLogins />
    },
    {
      path: '/pages/register/register3',
      element: <AuthRegister3 />
    }
  ]
};

export default AuthenticationRoutes;
